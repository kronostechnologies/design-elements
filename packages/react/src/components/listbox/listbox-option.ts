type Value = string | string[];

export function findOptionsByValue<T extends { value: string }>(
    options: T[],
    searchValue?: Value | undefined,
): T[] {
    return options.filter(
        (option) => (Array.isArray(searchValue)
            ? searchValue.includes(option.value)
            : option.value === searchValue),
    );
}
