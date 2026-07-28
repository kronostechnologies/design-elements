import { TFunction } from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from '../../../i18n/use-translation';
import type { FilterOption } from '../filter-option';

type Nullable<T> = T | null | undefined;
type Value = string | string[];

export interface UseListFilterResponse {
    filteredOptions: FilterOption[];
    hasFiltersApplied: boolean;
    selectedValuesCount: number;
}

export interface UseListFilterOptions<T extends Value> {
    options: FilterOption[];
    searchValue: string;
    value: Nullable<T>;
}

function valuesCount<T extends Value>(value: Nullable<T>): number {
    if (Array.isArray(value)) {
        return value.length;
    }
    return value !== undefined && value !== null ? 1 : 0;
}

function noResultsItem(t: TFunction): { disabled: boolean; label: string; value: string } {
    return {
        disabled: true,
        label: t('searchNoResults'),
        value: '',
    };
}

export function useListFilter<T extends Value>({
    searchValue,
    options,
    value,
}: UseListFilterOptions<T>): UseListFilterResponse {
    const { t } = useTranslation('filter');

    const filteredOptions = useMemo(() => {
        if (options.length === 0 && searchValue === '') {
            return [noResultsItem(t)];
        }

        if (searchValue === '') {
            return options;
        }

        const filtered = options.filter(
            (option) => option.label.toLowerCase().includes(searchValue.toLowerCase()),
        );

        if (filtered.length === 0) {
            filtered.push(noResultsItem(t));
        }

        return filtered;
    }, [searchValue, options, t]);

    const selectedValuesCount: number = valuesCount(value);

    return {
        filteredOptions,
        hasFiltersApplied: selectedValuesCount > 0,
        selectedValuesCount,
    };
}
