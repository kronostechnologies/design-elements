import { type FC, useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { hasExactSameValues } from '../../utils/array';
import { DS_CLASS_PREFIX } from '../../utils/component-classes';
import { v4 as uuid } from '../../utils/uuid';
import { Badge } from '../badge';
import { Button } from '../buttons';
import { type DropdownMenuCloseFunction } from '../dropdown-menu-button';
import type { BaseDropdownProps } from '../dropdown-menu-button/dropdown-menu-button';
import { type ListboxRef } from '../listbox/listbox';
import { disableNonSelectedOptions, findOptionByValue, getDefaultOptions } from '../listbox/utils';
import type { FilterOption } from './filter-option';
import { FilterDropdownButton, getFallbackContentWidth } from './internal/filter-dropdown-button';
import { ListContainer } from './internal/list-container';
import { useListFilter } from './internal/use-list-filter';
import { useSearch } from './internal/use.search';

const AppliedFiltersCount = styled(Badge)`
    background-color: ${({ theme }) => theme.alias['color-background-indicator-selected']};
`;

const Footer = styled.div`
    display: flex;
    gap: var(--spacing-1x);
    justify-content: flex-end;
    padding: var(--spacing-1halfx) var(--spacing-2x);
`;

type Value = string[];

export interface FilterMultiProps extends BaseDropdownProps {
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
    contentWidth,
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
    const [selectedOptionsOnOpen, setSelectedOptionsOnOpen] = useState<FilterOption[] | undefined>(selectedOptions);
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

    const handleCancel = useCallback((close: DropdownMenuCloseFunction): void => {
        setSelectedOptions(options.filter((option) => previousValue?.includes(option.value)));
        close();
    }, [options, previousValue]);

    const handleApply = useCallback((close: DropdownMenuCloseFunction): void => {
        const selectedValue = selectedOptions?.map((option) => option.value);
        if (
            selectedValue !== previousValue
            && selectedValue !== undefined
            && (previousValue === undefined || !hasExactSameValues(selectedValue, previousValue))
        ) {
            onChange?.(selectedValue);
        }
        setPreviousValue(selectedValue);
        close();
    }, [onChange, previousValue, selectedOptions]);

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
            const newSelectedOptions: FilterOption[] = options.filter((option) => value?.includes(option.value));
            setPreviousValue(value);
            setSelectedOptionsOnOpen(newSelectedOptions);
            setSelectedOptions(newSelectedOptions);
            if (searchEnabled) {
                searchRef.current?.focus({ preventScroll: true });
            } else {
                listboxRef.current?.focus({ preventScroll: true });
            }
        } else {
            setSearchValue('');
        }
    }, [options, searchEnabled, setSearchValue, value]);

    const { filteredOptions, hasFiltersApplied, selectedValuesCount } = useListFilter<string[]>({
        searchValue,
        options,
        value: previousValue,
    });

    const selectedOptionsValues: string[] | undefined = useMemo(
        () => selectedOptions?.map((option) => option.value) ?? undefined,
        [selectedOptions],
    );

    const [filteredUnselectedOptionsOnOpen, filteredSelectedOptionsOnOpen] = useMemo(() => {
        if (!selectedOptionsOnOpen) {
            return [filteredOptions, []];
        }

        const unselected: FilterOption[] = [];
        const selected: FilterOption[] = [];
        filteredOptions.forEach((option) => {
            if (findOptionByValue(selectedOptionsOnOpen, option.value)) {
                selected.push(option);
            } else {
                unselected.push(option);
            }
        });

        return [unselected, selected];
    }, [filteredOptions, selectedOptionsOnOpen]);

    const filterLabel = (
        <>
            <span>{label}</span>
            {hasFiltersApplied && (<AppliedFiltersCount value={selectedValuesCount} />)}
        </>
    );

    return (
        <FilterDropdownButton
            contentWidth={contentWidth || getFallbackContentWidth({ async, search: searchEnabled })}
            firstItemRef={searchRef}
            label={filterLabel}
            onMenuVisibilityChanged={handleMenuVisibilityChanged}
            render={(close: DropdownMenuCloseFunction) => (
                <div>
                    <ListContainer
                        listboxRef={listboxRef}
                        multiselect
                        onChange={handleItemsSelectionChange}
                        onSearchChange={handleSearchChange}
                        options={filteredUnselectedOptionsOnOpen}
                        featuredOptions={filteredSelectedOptionsOnOpen}
                        searchRef={searchRef}
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
            data-selected-count={selectedValuesCount}
            $hasFilters={hasFiltersApplied}
            $multiselect
        />
    );
};

FilterMulti.displayName = 'FilterMulti';
