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

export function isWithinPrecision(value: string, precision: number): boolean {
    if (precision === 0 && value.includes('.')) {
        return false;
    }
    if (precision > 0 && value.split('.')[1]?.length > precision) {
        return false;
    }
    return true;
}

export function cleanPastedContent(content: string): string {
    // Remove spaces and invisible characters (ex: \r, \n, ZWSP) around the copied text
    return content.trim();
}

export function truncateAtPrecision(value: string, precision: number): string {
    if (value === '' || !value.includes('.')) {
        return value;
    }

    const atDot = value.indexOf('.');
    return value.slice(0, precision === 0 ? atDot : atDot + precision + 1);
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
