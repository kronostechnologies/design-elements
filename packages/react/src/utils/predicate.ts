export function truthy<T>(item: T): item is NonNullable<T> {
    return !!item;
}
