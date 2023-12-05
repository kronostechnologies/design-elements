export function getNextElementInArray<T>(array: T[], index: number): T | undefined {
    return array.length === index + 1 ? array[0] : array[index + 1];
}

export function getPreviousElementInArray<T>(array: T[], index: number): T | undefined {
    return index === 0 ? array[array.length - 1] : array[index - 1];
}

export function unique<T>(list: T[]): T[] {
    return [...new Set(list)];
}
