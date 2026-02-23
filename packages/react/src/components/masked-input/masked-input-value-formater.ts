import {
    getUserInputCharCount,
    getNextSlotIndex,
    getPreviousSlotIndex,
    isSlotPosition,
    isValidInputChar,
} from './masked-input-char-finder';

export function formatFromMask(mask: string, slots: boolean[], value: string): string {
    let charIndex = 0;
    return Array.from(mask).map((maskChar, i) => {
        if (isSlotPosition(slots, i)) {
            // eslint-disable-next-line no-plusplus
            return charIndex < value.length ? value[charIndex++] : maskChar;
        }
        return maskChar;
    }).join('');
}

export function extractUserInput(value: string, separators: Set<string>): string {
    return Array.from(value).filter((char) => isValidInputChar(char, separators)).join('');
}

export function removeSlotCharsOnMaskCharRemoval(
    newInputValueWithoutMask: string,
    inputValue: string,
    slots: boolean[],
    mask: string,
    actualSelection: number,
    hasBackspaceJustBeenEntered: boolean,
): string {
    const indexOfCharToRemove = hasBackspaceJustBeenEntered
        ? getPreviousSlotIndex(slots, actualSelection)
        : getNextSlotIndex(slots, actualSelection);

    if (indexOfCharToRemove === -1) {
        return newInputValueWithoutMask;
    }

    const firstPartOfInputValue = inputValue.slice(0, indexOfCharToRemove);
    const userInputCharCountInFirstPart = getUserInputCharCount(firstPartOfInputValue, slots, mask);
    const firstPart = newInputValueWithoutMask.slice(0, userInputCharCountInFirstPart);
    const secondPart = newInputValueWithoutMask.slice(userInputCharCountInFirstPart + 1);
    return firstPart + secondPart;
}

type StripState = { result: string; inCharClass: boolean; skipNext: boolean };

function stripSeparatorsFromPattern(pattern: string, separators: string): string {
    const sepSet = new Set(separators);
    return Array.from(pattern).reduce<StripState>(
        (state, char, index, chars) => {
            if (state.skipNext) {
                return { ...state, skipNext: false };
            }
            if (char === '\\' && index + 1 < chars.length) {
                const next = chars[index + 1];
                if (!state.inCharClass && sepSet.has(next)) {
                    return { ...state, skipNext: true };
                }
                return { ...state, result: state.result + char + next, skipNext: true };
            }
            if (char === '[' && !state.inCharClass) {
                return { ...state, inCharClass: true, result: state.result + char };
            }
            if (char === ']' && state.inCharClass) {
                return { ...state, inCharClass: false, result: state.result + char };
            }
            if (!state.inCharClass && sepSet.has(char)) {
                return state;
            }
            return { ...state, result: state.result + char };
        },
        { result: '', inCharClass: false, skipNext: false },
    ).result;
}

function tokenizeAtoms(raw: string): string[] {
    const ATOM_WITH_QUANTIFIER = /^(\\.|\.|\[(?:[^\]\\]|\\.)*]|[^\\[.*+?{}()|^$])([+*?]|\{\d+(?:,\d*)?})?/;
    const atoms: string[] = [];
    let remaining = raw;
    while (remaining.length > 0) {
        const match = remaining.match(ATOM_WITH_QUANTIFIER);
        if (!match) {
            remaining = remaining.slice(1);
        } else {
            const atom = match[1];
            const quantifier = match[2] ?? '';
            remaining = remaining.slice(match[0].length);
            if (!quantifier || quantifier === '?' || quantifier === '*') {
                atoms.push(atom);
            } else if (quantifier === '+') {
                atoms.push(atom);
            } else {
                const braceMatch = quantifier.match(/^\{(\d+)(?:,(\d*))?}$/);
                if (braceMatch) {
                    const min = parseInt(braceMatch[1], 10);
                    let count = min;
                    if (braceMatch[2] !== undefined) {
                        count = braceMatch[2] === '' ? min : parseInt(braceMatch[2], 10);
                    }
                    if (count <= 0) {
                        count = min;
                    }
                    for (let i = 0; i < count; i++) {
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

export function buildSlotAtoms(pattern: string, separators: string): string[] {
    try {
        return tokenizeAtoms(stripSeparatorsFromPattern(pattern, separators));
    } catch {
        return [];
    }
}

export function filterByPattern(rawInput: string, slotAtoms: string[]): string {
    return Array.from(rawInput).reduce((accepted, char) => {
        const slotIndex = accepted.length;
        if (slotIndex >= slotAtoms.length) {
            return accepted;
        }
        try {
            return new RegExp(`^${slotAtoms[slotIndex]}$`).test(char) ? accepted + char : accepted;
        } catch {
            return accepted + char;
        }
    }, '');
}
