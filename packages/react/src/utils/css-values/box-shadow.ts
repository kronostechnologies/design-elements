import { parseSize } from './size';

export interface BoxShadow {
    inset: boolean;
    offsetX: string;
    offsetY: string;
    blurRadius?: string;
    spreadRadius?: string;
    color?: string;
}

function tokenize(input: string): string[] {
    const tokens: string[] = [];
    let current = '';
    let depth = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const char of input) {
        if (char === '(') {
            depth += 1;
        } else if (char === ')') {
            depth -= 1;
        } else if (char === ' ' && depth === 0) {
            if (current) {
                tokens.push(current);
            }
            current = '';
        } else {
            current += char;
        }
    }
    if (current) {
        tokens.push(current);
    }
    return tokens;
}

function isLength(token: string): boolean {
    return /^-?\d+(px|em|rem|%|vh|vw|vmin|vmax|cm|mm|in|pt|pc)?$/.test(token);
}

function isColor(token: string): boolean {
    return (
        token.startsWith('#')
        || token.startsWith('rgb')
        || token.startsWith('hsl')
        || /^[a-zA-Z]+$/.test(token)
    );
}

function parseSingleShadow(shadow: string): BoxShadow | null {
    const tokens = tokenize(shadow);
    const lengths: string[] = [];
    let inset = false;
    let color: string | undefined;

    // eslint-disable-next-line no-restricted-syntax
    for (const token of tokens) {
        if (token === 'inset') {
            inset = true;
        } else if (isColor(token)) {
            color = token;
        } else if (isLength(token)) {
            lengths.push(token);
        }
    }

    const [offsetX, offsetY, blurRadius, spreadRadius] = lengths;

    if (
        offsetX === undefined
        && offsetY === undefined
        && blurRadius === undefined
        && spreadRadius === undefined
    ) {
        return null;
    }

    return {
        inset,
        offsetX,
        offsetY,
        blurRadius,
        spreadRadius,
        color,
    };
}

export function parseBoxShadow(shadow: string): BoxShadow[] {
    // Split on commas that are not inside parentheses to support multiple shadows
    const parts = shadow
        .split(/,(?![^(]*\))/)
        .map((s) => s.trim())
        .filter(Boolean);

    return parts.map(parseSingleShadow).filter((x): x is BoxShadow => x !== null);
}

function getShadowVerticalSize(shadow: BoxShadow, direction: 'top' | 'bottom'): number {
    return ((direction === 'top' ? -1 : 1) * parseSize(shadow.offsetY))
        + parseSize(shadow.blurRadius)
        + parseSize(shadow.spreadRadius);
}

function findMaxVerticalShadow(shadows: BoxShadow[], direction: 'top' | 'bottom'): number {
    const max = shadows
        .filter((shadow) => !shadow.inset)
        .reduce((prev, current) => {
            const prevSize = prev ? getShadowVerticalSize(prev, direction) : 0;
            const currentSize = getShadowVerticalSize(current, direction);
            return (currentSize > prevSize) ? current : prev;
        }, shadows[0] as BoxShadow | undefined);

    return max ? getShadowVerticalSize(max, direction) : 0;
}

export function findMaxBottomBoxShadow(shadows: BoxShadow[]): number {
    return findMaxVerticalShadow(shadows, 'bottom');
}

export function findMaxTopBoxShadow(shadows: BoxShadow[]): number {
    return findMaxVerticalShadow(shadows, 'top');
}
