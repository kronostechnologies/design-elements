import { type ClipboardEvent } from 'react';
import { replaceRange } from '../../utils/string';

export const DEFAULT_DECIMAL_SEPARATOR: string = '.';
export const DECIMAL_SEPARATORS: string[] = ['.', ','];
const DECIMAL_SEPARATORS_PATTERN: string = `[${DECIMAL_SEPARATORS.join('')}]`;

export function getDecimalSeparator(locale: string): string {
    try {
        const formatter = new Intl.NumberFormat(locale);
        const parts: Intl.NumberFormatPart[] = formatter.formatToParts(1.1);
        const decimalPart: Intl.NumberFormatPart | undefined = parts.find((part) => part.type === 'decimal');
        return decimalPart?.value || '.';
    } catch (e) {
        console.warn(`Could not determine decimal separator for locale "${locale}", defaulting to '.'.`, e);
        return '.';
    }
}

export function convertDecimalSeparator(value: string, toSeparator: string): string {
    if (!value) {
        return value;
    }
    return value.replace(new RegExp(`${DECIMAL_SEPARATORS_PATTERN}(?!.*${DECIMAL_SEPARATORS_PATTERN})`), toSeparator);
}

export function toStandardFormat(value: string): string {
    return convertDecimalSeparator(value, DEFAULT_DECIMAL_SEPARATOR);
}

/**
 * We allow to input incomplete number that is obvious. It's similar to the behavior of Number(value).
 * The difference is we can keep all digits (zero ending decimals).
 */
export function cleanIncompleteNumber(inputValue: string, decimalSeparator: string): string {
    if (inputValue === decimalSeparator || inputValue === `-${decimalSeparator}`) {
        return '';
    }

    const standardValue = toStandardFormat(inputValue);

    if (standardValue === '' || Number.isNaN(Number(standardValue))) {
        return '';
    }

    let cleanedStandardValue = standardValue;
    if (cleanedStandardValue.endsWith('.')) {
        cleanedStandardValue = cleanedStandardValue.slice(0, -1);
    }

    if (cleanedStandardValue.startsWith('.')) {
        cleanedStandardValue = `0${cleanedStandardValue}`;
    } else if (cleanedStandardValue.startsWith('-.')) {
        cleanedStandardValue = `-0${cleanedStandardValue.substring(1)}`;
    }

    if (cleanedStandardValue === '') {
        return '';
    }
    return convertDecimalSeparator(cleanedStandardValue, decimalSeparator);
}

export function replacePastedValue(event: ClipboardEvent<HTMLInputElement>): string {
    const pastedValue = event.clipboardData.getData('text/plain').trim();

    const input = event.currentTarget;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;

    return replaceRange(input.value, start, end, pastedValue);
}

/**
 * Validate that value can be put in the input (including partially incomplete number)
 */
export function isValidValueForInput(value: string, decimalSeparator: string): boolean {
    if (value === '' || value === '-') {
        return true;
    }

    const escapedSeparator = decimalSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return new RegExp(`^-?\\d*(${escapedSeparator}?\\d*)?$`).test(value);
}
