import { useCallback, useMemo, useState } from 'react';
import { filterData } from './filterData';
import { FilterType, SelectedFilters } from './types';

interface UseFilteredDataResponse<T> {
    filteredData: T[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilterChange: (filterKey: string, newFilterValue: any) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFilters<T>(
    data: T[],
    filters: FilterType<T, unknown>[],
): UseFilteredDataResponse<T> {
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

    const filteredData = useMemo(() => {
        if (selectedFilters) {
            return filterData<T>({
                data,
                filters,
                filterOptions: selectedFilters,
            });
        }
        return data;
    }, [selectedFilters, data, filters]);

    return {
        filteredData,
        onFilterChange,
    };
}
