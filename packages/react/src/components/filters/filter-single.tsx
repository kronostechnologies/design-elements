import { type FC, useCallback, useMemo, useRef, useState } from 'react';
import { DS_CLASS_PREFIX } from '../../utils/component-classes';
import { v4 as uuid } from '../../utils/uuid';
import { type DropdownMenuCloseFunction } from '../dropdown-menu-button';
import type { ListboxRef } from '../listbox/listbox';
import type { FilterOption } from './filter-option';
import { FilterDropdownButton, PortalFilterDropdownMenuStyle } from './internal/filter-dropdown-button';
import { ListContainer } from './internal/list-container';
import { useListFilter } from './internal/use-list-filter';
import { useSearch } from './internal/use.search';

type Value = string | null;

export interface FilterSingleProps {
    label: string;
    options: FilterOption[];
    value?: Value;

    onChange?(value: Value): void;
}

/**
 * @alpha This component is experimental and may change without a major version bump.
 */
export const FilterSingle: FC<FilterSingleProps> = ({
    label,
    onChange,
    options,
    value,
}) => {
    const listboxRef = useRef<ListboxRef>(null);
    const dropdownMenuId = useMemo(() => `${DS_CLASS_PREFIX}${uuid()}`, []);
    const [previousValue, setPreviousValue] = useState<Value | undefined>(value);
    const previousValuePropRef = useRef<Value | undefined>(value);
    const searchRef = useRef<HTMLInputElement>(null);
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

    const clearFilters = useCallback((close: DropdownMenuCloseFunction): void => {
        setPreviousValue(null);
        onChange?.(null);
        close();
    }, [onChange]);

    const handleMenuVisibilityChanged = useCallback((isOpen: boolean): void => {
        if (isOpen) {
            setPreviousValue(value);
            if (searchEnabled) {
                searchRef.current?.focus();
            } else {
                listboxRef.current?.focusFirstOption();
            }
        } else {
            setSearchValue('');
        }
    }, [searchEnabled, setSearchValue, value]);

    const handleItemSelected = useCallback((close: DropdownMenuCloseFunction, option: FilterOption): void => {
        setPreviousValue(option.value);
        onChange?.(option.value);
        close();
    }, [onChange]);

    const { displayValue, filteredOptions, hasFiltersApplied } = useListFilter<string>({
        options,
        searchValue,
        value: previousValue,
    });

    return (
        <>
            <PortalFilterDropdownMenuStyle $dropdownMenuId={dropdownMenuId} />
            <FilterDropdownButton
                firstItemRef={searchRef}
                label={displayValue}
                onMenuVisibilityChanged={handleMenuVisibilityChanged}
                render={(close: DropdownMenuCloseFunction) => (
                    <ListContainer
                        onClearFilters={clearFilters.bind(null, close)}
                        listboxRef={listboxRef}
                        onOptionClick={handleItemSelected.bind(null, close)}
                        onSearchChange={handleSearchChange}
                        options={filteredOptions}
                        searchRef={searchRef}
                        selectedFiltersCount={hasFiltersApplied ? 1 : 0}
                        value={previousValue}
                    />
                )}
                dropdownMenuId={dropdownMenuId}
                $label={label}
                $hasFilters={hasFiltersApplied}
            />
        </>
    );
};
