export function formatFromPattern(pattern: string, placeHolderChar: string, value: string): string {
    return Array.from(value).reduce((acc, number) => acc.replace(placeHolderChar, number), pattern);
}

export function removeNonDigits(value: string): string {
    return value.replace(/\D/g, '');
}
