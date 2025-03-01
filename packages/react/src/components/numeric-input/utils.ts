import { type ClipboardEvent } from 'react';
import { replaceRange } from '../../utils/string';

/**
 * We allow to input incomplete number that is obvious. It's similar to the behavior of Number(value).
 * The difference is we can keep all digits (zero ending decimals).
 */
export function cleanIncompleteNumber(inputValue: string): string {
    let value = inputValue;

    if (value === '' || Number.isNaN(Number(value))) {
        return '';
    }

    if (value.endsWith('.')) {
        value = value.slice(0, -1);
    }

    // Add missing integral zero (.25 => 0.25)
    value = value.replace(/^(-?)\./, '$10.');

    return value;
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
export function isValidValueForInput(value: string): boolean {
    if (value.includes('.')) {
        return /^-?\d*\.\d*$/.test(value);
    }
    return /^-?\d*$/.test(value);
}
