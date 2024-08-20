import { Filter, FilterOptions } from './filters';

interface FilterDataRequest<T> {
    data: T[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: Filter<T, any>[];
    filterOptions: FilterOptions;
}

export function filterData<T>({
    data,
    filters,
    filterOptions,
}: FilterDataRequest<T>): T[] {
    return data.filter((row) => {
        const filterResults = filters.map(
            (filter) => filter.filter(row, filterOptions[filter.key]),
        );
        return filterResults.every((result) => result === true);
    });
}
