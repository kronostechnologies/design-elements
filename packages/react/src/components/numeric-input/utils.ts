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

export function cleanPastedContent(content: string): string {
    // Remove spaces and invisible characters (ex: \r, \n, ZWSP) around the copied text
    return content.trim();
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
