import { useCallback, useMemo, useState } from 'react';
import { filterData } from './filter-data';
import { Filter, FilterOptions } from './filters';

interface UseFilteredDataResponse<T> {
    filteredData: T[];
    changeFilters: (filterOptions: FilterOptions) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFilters<T>(data: T[], filters: Filter<T, any>[]): UseFilteredDataResponse<T> {
    const [currentFilterOptions, setCurrentFilterOptions] = (
        useState<FilterOptions | undefined>(undefined)
    );

    const changeFilters = useCallback((filterOptions: FilterOptions) => {
        setCurrentFilterOptions(filterOptions);
    }, []);

    const filteredData = useMemo(() => {
        if (currentFilterOptions) {
            return filterData<T>({
                data,
                filters,
                filterOptions: currentFilterOptions,
            });
        }
        return data;
    }, [currentFilterOptions, data, filters]);

    return {
        filteredData,
        changeFilters,
    };
}
