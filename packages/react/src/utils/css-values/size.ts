/**
 * Parses a size value from a string to a number.
 * This function doesn't handle units, it simply extracts the numeric part.
 */
export function parseSize(value: string | null | undefined, defaultValue: number = 0): number {
    if (!value) {
        return defaultValue;
    }

    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? defaultValue : parsed;
}
