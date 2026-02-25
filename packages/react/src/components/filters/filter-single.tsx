import { type FC, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../../i18n/use-translation';
import { DS_CLASS_PREFIX } from '../../utils/component-classes';
import { v4 as uuid } from '../../utils/uuid';
import { type DropdownMenuCloseFunction } from '../dropdown-menu-button';
import type { BaseDropdownProps } from '../dropdown-menu-button/dropdown-menu-button';
import type { ListboxRef } from '../listbox/listbox';
import type { FilterOption } from './filter-option';
import { FilterDropdownButton, getFallbackContentWidth } from './internal/filter-dropdown-button';
import { ListContainer } from './internal/list-container';
import { useListFilter } from './internal/use-list-filter';
import { useSearch } from './internal/use.search';

type Value = string | null;

export interface FilterSingleProps extends BaseDropdownProps {
    /**
     * Override for the "All" label option shown in the list.
     */
    allOptionLabel?: string;
    label: string;
    options: FilterOption[];
    value?: Value;

    onChange?(value: Value): void;
}

const ALL_OPTIONS_VALUE: string = '';

/**
 * @alpha This component is experimental and may change without a major version bump.
 */
export const FilterSingle: FC<FilterSingleProps> = ({
    allOptionLabel,
    contentWidth,
    label,
    onChange,
    options: providedOptions,
    value,
}) => {
    const listboxRef = useRef<ListboxRef>(null);
    const dropdownMenuId = useMemo(() => `${DS_CLASS_PREFIX}${uuid()}`, []);
    const [previousValue, setPreviousValue] = useState<Value | undefined>(value);
    const previousValuePropRef = useRef<Value | undefined>(value);
    const searchRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation('filter');
    const options: FilterOption[] = useMemo(() => ([
        { label: allOptionLabel || t('all'), value: ALL_OPTIONS_VALUE },
        ...providedOptions,
    ]), [allOptionLabel, providedOptions, t]);
    const {
        searchEnabled,
        searchValue,
        handleSearchChange,
        setSearchValue,
    } = useSearch({ optionsCount: options.length });

    if (previousValuePropRef.current !== value) {
        previousValuePropRef.current = value;
        setPreviousValue(value);
    }

    const handleMenuVisibilityChanged = useCallback((isOpen: boolean): void => {
        if (isOpen) {
            setPreviousValue(value);
            if (searchEnabled) {
                searchRef.current?.focus({ preventScroll: true });
            } else {
                listboxRef.current?.focus({ preventScroll: true });
            }
        } else {
            setSearchValue('');
        }
    }, [searchEnabled, setSearchValue, value]);

    const handleItemSelected = useCallback((close: DropdownMenuCloseFunction, option: FilterOption): void => {
        const outsideValue = option.value === ALL_OPTIONS_VALUE ? null : option.value;
        setPreviousValue(outsideValue);
        onChange?.(outsideValue);
        close();
    }, [onChange]);

    const { filteredOptions, hasFiltersApplied } = useListFilter<string>({
        options,
        searchValue,
        value: previousValue,
    });

    const getOptionByValue = useCallback(
        (optionValueToFind: string | null | undefined): FilterOption | undefined => (
            options.find((option) => option.value === optionValueToFind)
        ),
        [options],
    );

    return (
        <FilterDropdownButton
            contentWidth={contentWidth || getFallbackContentWidth({ search: searchEnabled })}
            firstItemRef={searchRef}
            label={value ? getOptionByValue(value)?.label : label}
            onMenuVisibilityChanged={handleMenuVisibilityChanged}
            render={(close: DropdownMenuCloseFunction) => (
                <ListContainer
                    listboxRef={listboxRef}
                    onOptionClick={handleItemSelected.bind(null, close)}
                    onSearchChange={handleSearchChange}
                    options={filteredOptions}
                    searchRef={searchRef}
                    value={previousValue || ALL_OPTIONS_VALUE}
                />
            )}
            dropdownMenuId={dropdownMenuId}
            $labelPrefix={label}
            $hasFilters={hasFiltersApplied}
        />
    );
};

FilterSingle.displayName = 'FilterSingle';
