export const MATCH_ALL_DECIMAL_CHAR_OCCURRENCE_REGEX = /\d/g;

export function getDecimalCharCount(value: string): number {
    return (value.match(MATCH_ALL_DECIMAL_CHAR_OCCURRENCE_REGEX) || []).length;
}

export function hasAnyDecimalChar(value: string): boolean {
    return getDecimalCharCount(value) > 0;
}

export function getNextPlaceholderIndex(pattern: string, position: number, placeholderChar: string): number {
    if (position < 0) {
        return -1;
    }

    const indexOfPlaceholderCharFromSlice = pattern.slice(position).indexOf(placeholderChar);
    return (indexOfPlaceholderCharFromSlice >= 0)
        ? position + indexOfPlaceholderCharFromSlice
        : indexOfPlaceholderCharFromSlice;
}

export function getPreviousPlaceholderIndex(pattern: string, position: number, placeholderChar: string): number {
    if (position < 0) {
        return -1;
    }

    return pattern.slice(0, position).lastIndexOf(placeholderChar);
}

export function findNextInsertPositionFromPatternInputDiff(
    inputValue: string,
    pattern: string,
    placeholderChar: string,
): number {
    for (let i = 0; i < inputValue.length; i++) {
        if (hasAnyDecimalChar(inputValue[i]) && pattern[i] !== placeholderChar) {
            const nextPlaceholderIndex = getNextPlaceholderIndex(pattern, i, placeholderChar);
            return (nextPlaceholderIndex >= 0) ? nextPlaceholderIndex + 1 : nextPlaceholderIndex;
        }
    }

    return -1;
}
