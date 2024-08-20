import { ReactElement, useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Option, OptionsSelector } from './options-selector';

type FilterVariant = 'single-select' | 'multi-select';

export interface Filter<T, O> {
    key: string;
    label: string;
    options: Option<O>[];
    defaultOption: O;
    filter: (row: T, options: O[]) => boolean;
}

interface FiltersProps<T, O> {
    filters: Filter<T, O>[];
    onFilterChange: (selectedFilters: FilterOptions) => void;
    variant: FilterVariant;
}

export type FilterOptions = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [id: string]: [any];
};

const FilterOptionsContainer = styled.div`
    margin: var(--spacing-1x) calc(var(--spacing-1x) * 0.5);
`;

const FiltersContainer = styled.div`
    display: flex;
    margin: var(--spacing-1x) 0;
    div[role=menu] {
        z-index: 999;
    }
`;

export const Filters = <T, >({
    filters,
    onFilterChange,
    variant,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: FiltersProps<T, any>): ReactElement => {
    const filterOptionsValue: FilterOptions = {};
    filters.forEach((f) => {
        filterOptionsValue[f.key] = f.defaultOption;
    });

    const [selectedFilters, setSelectedFilters] = useState<FilterOptions>(filterOptionsValue);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFilterChangeCallback = useCallback((filterKey: string, newFilterValue: any) => {
        let newSelectedFilters = selectedFilters;
        if (variant === 'single-select') {
            newSelectedFilters = {
                ...selectedFilters,
                [filterKey]: [newFilterValue],
            };
        } else {
            const newSelectedOptions = [...selectedFilters[filterKey]];
            newSelectedOptions.push(newFilterValue);
            newSelectedFilters = {
                ...selectedFilters,
                [filterKey]: newSelectedOptions,
            };
        }

        setSelectedFilters(newSelectedFilters);
        onFilterChange(newSelectedFilters);
    }, [selectedFilters, variant, onFilterChange]);

    const filterOptionSelectors = useMemo(() => filters.map((filter) => (
        filter.options.length > 0 && (
            <FilterOptionsContainer>
                <OptionsSelector<typeof filter.defaultOption>
                    key={filter.key}
                    buttonLabel={filter.label}
                    defaultOption={filter.defaultOption}
                    options={filter.options}
                    onChange={(option) => onFilterChangeCallback(filter.key, option.value)}
                />
            </FilterOptionsContainer>
        )
    )), [filters, onFilterChangeCallback]);

    return (
        <FiltersContainer>
            {filterOptionSelectors}
        </FiltersContainer>
    );
};
