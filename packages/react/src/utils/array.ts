type Predicate<T> = (item: T) => boolean;
type FindOptions = { wrapAround?: boolean };

export function getFirstElement<T>(array: T[]): T | undefined {
    return array[0];
}

export function findFirstElement<T>(array: T[], predicate: Predicate<T>): T | undefined {
    return array.find(predicate);
}

export function getLastElement<T>(array: T[]): T | undefined {
    return array[array.length - 1];
}

export function findLastElement<T>(array: T[], predicate: Predicate<T>): T | undefined {
    return [...array].reverse().find(predicate);
}

function retrieveElement<T>(
    retriever: () => T | undefined,
    fallbackRetriever?: () => T | undefined,
): T | undefined {
    const value = retriever();

    if (value !== undefined) {
        return value;
    }

    return fallbackRetriever?.();
}

export function getPreviousElement<T>(
    array: T[],
    currentIndex: number,
    { wrapAround = false }: FindOptions = {},
): T | undefined {
    return retrieveElement(
        () => array[currentIndex - 1],
        wrapAround ? () => getLastElement(array) : undefined,
    );
}

export function findPreviousElement<T>(
    array: T[],
    currentIndex: number,
    predicate: Predicate<T>,
    { wrapAround = false }: FindOptions = {},
): T | undefined {
    return retrieveElement(
        () => array.slice(0, currentIndex).reverse().find(predicate),
        wrapAround ? () => findLastElement(array, predicate) : undefined,
    );
}

export function getNextElement<T>(
    array: T[],
    currentIndex: number,
    { wrapAround = false }: FindOptions = {},
): T | undefined {
    return retrieveElement(
        () => array[currentIndex + 1],
        wrapAround ? () => getFirstElement(array) : undefined,
    );
}

export function findNextElement<T>(
    array: T[],
    currentIndex: number,
    predicate: Predicate<T>,
    { wrapAround = false }: FindOptions = {},
): T | undefined {
    return retrieveElement(
        () => array.slice(currentIndex + 1).find(predicate),
        wrapAround ? () => findFirstElement(array, predicate) : undefined,
    );
}

export function unique<T>(list: T[]): T[] {
    return [...new Set(list)];
}
