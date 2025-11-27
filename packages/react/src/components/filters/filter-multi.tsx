import { type FC, useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { DS_CLASS_PREFIX } from '../../utils/component-classes';
import { v4 as uuid } from '../../utils/uuid';
import { Button } from '../buttons';
import {
    addUniqueOption,
    disableNonSelectedOptions,
    getDefaultOptions,
    isOptionSelected,
    removeOption,
} from '../dropdown-list/utils';
import { type DropdownMenuCloseFunction } from '../dropdown-menu-button';
import { type ListboxRef } from '../listbox/listbox';
import type { FilterOption } from './filter-option';
import { FilterDropdownButton, PortalFilterDropdownMenuStyle } from './internal/filter-dropdown-button';
import { ListContainer } from './internal/list-container';
import { useListFilter } from './internal/use-list-filter';
import { useSearch } from './internal/use.search';

export const Footer = styled.div`
    display: flex;
    gap: var(--spacing-1x);
    justify-content: flex-end;
    padding: var(--spacing-1halfx) var(--spacing-2x);
`;

type Value = string[];

export interface FilterMultiProps {
    async?: boolean;
    label: string;
    maxSelectableOptions?: number;
    options: FilterOption[];
    value?: Value;

    onChange?(value: Value): void;
}

/**
 * @alpha This component is experimental and may change without a major version bump.
 */
export const FilterMulti: FC<FilterMultiProps> = ({
    async = false,
    label,
    maxSelectableOptions,
    onChange,
    options: providedOptions,
    value,
}) => {
    const listboxRef = useRef<ListboxRef>(null);
    const dropdownMenuId = useMemo(() => `${DS_CLASS_PREFIX}${uuid()}`, []);
    const { t } = useTranslation('filter');
    const [selectedOptions, setSelectedOptions] = useState<FilterOption[] | undefined>(
        () => getDefaultOptions(value, providedOptions, true),
    );
    const options = useMemo(() => {
        const isMaxSelectableOptionsReached = maxSelectableOptions
            && selectedOptions
            && selectedOptions.length >= maxSelectableOptions;

        if (isMaxSelectableOptionsReached) {
            return disableNonSelectedOptions(providedOptions, selectedOptions);
        }

        return providedOptions;
    }, [maxSelectableOptions, providedOptions, selectedOptions]);
    const [previousValue, setPreviousValue] = useState<Value | undefined>(value);
    const previousValuePropRef = useRef<Value | undefined>(value);
    const selectedFiltersCount = selectedOptions?.length ?? 0;
    const searchRef = useRef<HTMLInputElement>(null);
    const {
        searchEnabled,
        searchValue,
        handleSearchChange,
        setSearchValue,
    } = useSearch({ optionsCount: providedOptions.length });

    if (previousValuePropRef.current !== value) {
        previousValuePropRef.current = value;
        setPreviousValue(value);
    }

    const toggleOptionSelection = useCallback((option: FilterOption, forceSelected?: boolean) => {
        const newSelectedOptions = !isOptionSelected(option, selectedOptions) || forceSelected
            ? addUniqueOption(option, selectedOptions)
            : removeOption(option, selectedOptions);

        setSelectedOptions(newSelectedOptions);

        if (!async) {
            const selectedValue = newSelectedOptions?.map((o) => o.value);
            if (selectedValue) {
                onChange?.(selectedValue);
            }
            setPreviousValue(selectedValue);
        }
    }, [async, onChange, selectedOptions]);

    const clearFilters = useCallback((): void => {
        const emptyValue: Value & FilterOption[] = [];
        setSelectedOptions(emptyValue);
        if (!async) {
            onChange?.(emptyValue);
            setPreviousValue(emptyValue);
        }
    }, [async, onChange]);

    const handleCancel = useCallback((close: DropdownMenuCloseFunction): void => {
        setSelectedOptions(options.filter((option) => previousValue?.includes(option.value)));
        close();
    }, [options, previousValue]);

    const handleApply = useCallback((close: DropdownMenuCloseFunction): void => {
        const selectedValue = selectedOptions?.map((option) => option.value);
        if (selectedValue !== previousValue && selectedValue !== undefined) {
            onChange?.(selectedValue);
        }
        setPreviousValue(selectedValue);
        close();
    }, [onChange, previousValue, selectedOptions]);

    const handleItemSelected = useCallback((option: FilterOption): void => {
        toggleOptionSelection(option);
    }, [toggleOptionSelection]);

    const handleItemsSelectionChange = useCallback((newSelectedOptions: FilterOption[]) => {
        setSelectedOptions(newSelectedOptions);
        if (!async) {
            const selectedValue = newSelectedOptions?.map((option) => option.value);
            if (selectedValue) {
                onChange?.(selectedValue);
            }
            setPreviousValue(selectedValue);
        }
    }, [async, onChange]);

    const handleMenuVisibilityChanged = useCallback((isOpen: boolean): void => {
        if (isOpen) {
            setPreviousValue(value);
            setSelectedOptions(options.filter((option) => value?.includes(option.value)));
            if (searchEnabled) {
                searchRef.current?.focus();
            } else {
                listboxRef.current?.focus();
            }
        } else {
            setSearchValue('');
        }
    }, [options, searchEnabled, setSearchValue, value]);

    const { displayValue, filteredOptions, hasFiltersApplied } = useListFilter<string[]>({
        searchValue,
        options,
        value: previousValue,
    });

    const selectedOptionsValues: string[] | undefined = useMemo(
        () => selectedOptions?.map((option) => option.value) ?? undefined,
        [selectedOptions],
    );

    return (
        <>
            <PortalFilterDropdownMenuStyle $dropdownMenuId={dropdownMenuId} />
            <FilterDropdownButton
                firstItemRef={searchRef}
                label={displayValue}
                onMenuVisibilityChanged={handleMenuVisibilityChanged}
                render={(close: DropdownMenuCloseFunction) => (
                    <div>
                        <ListContainer
                            onClearFilters={clearFilters}
                            listboxRef={listboxRef}
                            multiselect
                            onChange={handleItemsSelectionChange}
                            onOptionClick={handleItemSelected}
                            onSearchChange={handleSearchChange}
                            options={filteredOptions}
                            searchRef={searchRef}
                            selectedFiltersCount={selectedFiltersCount}
                            value={selectedOptionsValues}
                        />

                        {async && (
                            <Footer>
                                <Button
                                    data-testid="cancel-button"
                                    label={t('cancel')}
                                    buttonType="tertiary"
                                    onClick={() => handleCancel(close)}
                                />
                                <Button
                                    data-testid="apply-button"
                                    label={t('apply', { count: selectedFiltersCount })}
                                    buttonType="primary"
                                    onClick={() => handleApply(close)}
                                />
                            </Footer>
                        )}
                    </div>
                )}
                dropdownMenuId={dropdownMenuId}
                $label={label}
                $hasFilters={hasFiltersApplied}
            />
        </>
    );
};
