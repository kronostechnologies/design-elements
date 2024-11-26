import { FilterType, SelectedFilters } from './types';

interface FilterDataRequest<T> {
    data: T[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: FilterType<T, any>[];
    filterOptions: SelectedFilters;
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
