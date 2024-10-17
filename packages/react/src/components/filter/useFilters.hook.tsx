import { useCallback, useMemo, useState } from 'react';
import { filterData } from './filterData';
import { FilterType, SelectedFilters } from './types';

interface UseFilteredDataResponse<T> {
    filteredData: T[];
    changeFilters: (filterOptions: SelectedFilters) => void;
    onFilterChange: (filterKey: string, newFilterValue: any) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFilters<T>(
    data: T[],
    filters: FilterType<T, unknown>[],
): UseFilteredDataResponse<T> {
    const [currentFilterOptions, setCurrentFilterOptions] = (
        useState<SelectedFilters | undefined>(undefined)
    );

    const filterOptionsValue: SelectedFilters = {};
    filters.forEach((f) => {
        filterOptionsValue[f.key] = f.defaultOption;
    });

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
        filterOptionsValue,
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFilterChange = useCallback((filterKey: string, newFilterValue: any) => {
        const newSelectedFilters = {
            ...selectedFilters,
            [filterKey]: newFilterValue,
        };
        setSelectedFilters(newSelectedFilters);
    }, [setSelectedFilters, selectedFilters]);

    const changeFilters = useCallback((filterOptions: SelectedFilters) => {
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
        onFilterChange,
    };
}
