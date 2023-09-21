type Predicate<T> = (item: T) => boolean;

export function getFirstElement<T>(array: T[], predicate?: Predicate<T>): T | undefined {
    return predicate ? array.find(predicate) : array[0];
}

export function getLastElement<T>(array: T[], predicate?: Predicate<T>): T | undefined {
    return predicate ? [...array].reverse().find(predicate) : array[array.length - 1];
}

export function getPreviousElement<T>(
    array: T[],
    currentIndex: number,
    wrapAround = false, // eslint-disable-line default-param-last
    predicate?: Predicate<T>,
): T | undefined {
    const previousElement = predicate
        ? array.slice(0, currentIndex).reverse().find(predicate)
        : array[currentIndex - 1];

    if (previousElement) {
        return previousElement;
    }

    if (wrapAround) {
        return getLastElement(array, predicate);
    }

    return undefined;
}

export function getNextElement<T>(
    array: T[],
    currentIndex: number,
    wrapAround = false, // eslint-disable-line default-param-last
    predicate?: Predicate<T>,
): T | undefined {
    const nextElement = predicate
        ? array.slice(currentIndex + 1).find(predicate)
        : array[currentIndex + 1];

    if (nextElement) {
        return nextElement;
    }

    if (wrapAround) {
        return getFirstElement(array, predicate);
    }

    return undefined;
}

export function unique<T>(list: T[]): T[] {
    return [...new Set(list)];
}
