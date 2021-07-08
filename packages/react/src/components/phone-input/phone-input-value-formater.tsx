import {
    getDecimalCharCount,
    getNextPlaceholderIndex,
    getPreviousPlaceholderIndex,
    MATCH_ALL_DECIMAL_CHAR_OCCURRENCE_REGEX,
} from './phone-input-char-finder';

export function formatFromPattern(pattern: string, placeholderChar: string, value: string): string {
    return Array.from(value).reduce((acc, number) => acc.replace(placeholderChar, number), pattern);
}

export function removeNonDigits(value: string): string {
    return value.replace(/\D/g, '');
}

export function removeDigitOnMaskCharRemoval(
    newInputValueWithoutMask: string,
    inputValue: string,
    actualSelection: number,
    hasBackspaceJustBeenEntered: boolean,
): string {
    const aPlaceholderChar = '_';
    const inputValueWithPlaceholderChar = inputValue.replace(
        MATCH_ALL_DECIMAL_CHAR_OCCURRENCE_REGEX,
        aPlaceholderChar,
    );

    const indexOfCharToRemove = hasBackspaceJustBeenEntered
        ? getPreviousPlaceholderIndex(inputValueWithPlaceholderChar, actualSelection, aPlaceholderChar)
        : getNextPlaceholderIndex(inputValueWithPlaceholderChar, actualSelection, aPlaceholderChar);

    if (indexOfCharToRemove === -1) {
        return newInputValueWithoutMask;
    }

    const firstPartOfInputValueWithoutChar = inputValue.slice(0, indexOfCharToRemove);
    const decimalCharCountInInputFirstPart = getDecimalCharCount(firstPartOfInputValueWithoutChar);
    const firstPart = newInputValueWithoutMask.slice(0, decimalCharCountInInputFirstPart);
    const secondPart = newInputValueWithoutMask.slice(decimalCharCountInInputFirstPart + 1);
    return firstPart + secondPart;
}
