export function formatFromPattern(pattern: string, value: string): string {
    return Array.from(value).reduce((acc, number) => acc.replace('X', number), pattern);
}