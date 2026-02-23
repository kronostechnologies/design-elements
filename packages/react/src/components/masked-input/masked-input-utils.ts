import { maskitoTransform } from '@maskito/core';
import type { MaskitoOptions } from '@maskito/core';

export const DEFAULT_SEPARATORS = '()- /';

function stripSeparatorsFromPattern(pattern: string, separators: string): string {
    const sepSet = new Set(separators);
    let result = '';
    let inCharClass = false;
    let i = 0;
    while (i < pattern.length) {
        const char = pattern[i];
        if (char === '\\' && i + 1 < pattern.length) {
            const next = pattern[i + 1];
            if (!inCharClass && sepSet.has(next)) {
                i += 2;
            } else {
                result += char + next;
                i += 2;
            }
        } else if (char === '[' && !inCharClass) {
            inCharClass = true;
            result += char;
            i += 1;
        } else if (char === ']' && inCharClass) {
            inCharClass = false;
            result += char;
            i += 1;
        } else if (!inCharClass && sepSet.has(char)) {
            i += 1;
        } else {
            result += char;
            i += 1;
        }
    }
    return result;
}

function tokenizeAtoms(raw: string): string[] {
    const ATOM_RE = /^(\\.|\.|\[(?:[^\]\\]|\\.)*]|[^\\[.*+?{}()|^$])([+*?]|\{\d+(?:,\d*)?})?/;
    const atoms: string[] = [];
    let remaining = raw;
    while (remaining.length > 0) {
        const match = remaining.match(ATOM_RE);
        if (!match) {
            remaining = remaining.slice(1);
        } else {
            const atom = match[1];
            const quantifier = match[2] ?? '';
            remaining = remaining.slice(match[0].length);
            if (!quantifier || quantifier === '?' || quantifier === '*' || quantifier === '+') {
                atoms.push(atom);
            } else {
                const braceMatch = quantifier.match(/^\{(\d+)(?:,(\d*))?}$/);
                if (braceMatch) {
                    const min = parseInt(braceMatch[1], 10);
                    const hasMax = braceMatch[2] !== undefined && braceMatch[2] !== '';
                    const count = hasMax ? parseInt(braceMatch[2], 10) : min;
                    for (let k = 0; k < count; k += 1) {
                        atoms.push(atom);
                    }
                } else {
                    atoms.push(atom);
                }
            }
        }
    }
    return atoms;
}

function buildSlotAtoms(pattern: string, separators: string): string[] {
    try {
        return tokenizeAtoms(stripSeparatorsFromPattern(pattern, separators));
    } catch {
        return [];
    }
}

export function buildMaskitoOptions(mask: string, pattern: RegExp, separators: string): MaskitoOptions {
    const separatorSet = new Set(separators);
    const slotAtoms = buildSlotAtoms(pattern.source, separators);
    let atomIndex = 0;
    const maskExpression = Array.from(mask).map((char) => {
        if (separatorSet.has(char)) {
            return char;
        }
        const atom = slotAtoms[atomIndex] ?? '.';
        atomIndex += 1;
        return new RegExp(`^${atom}$`);
    });
    return { mask: maskExpression };
}

export function formatDefaultValue(defaultValue: string, maskitoOptions: MaskitoOptions): string {
    return maskitoTransform(defaultValue, maskitoOptions);
}

export function extractRawInput(value: string, separatorSet: Set<string>): string {
    return Array.from(value).filter((char) => !separatorSet.has(char)).join('');
}
