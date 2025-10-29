import React, { type FC, useCallback, useMemo, useRef, useState } from 'react';
import styled, { createGlobalStyle, css, type FlattenInterpolation, type ThemeProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes';
import { DS_CLASS_PREFIX } from '../../utils/component-classes';
import { focus } from '../../utils/css-state';
import { v4 as uuid } from '../../utils/uuid';
import { Button } from '../buttons';
import {
    addUniqueOption,
    disableNonSelectedOptions,
    getDefaultOptions,
    isOptionSelected,
    removeOption,
} from '../dropdown-list/utils';
import { DropdownMenuButton, dropdownMenuButtonClasses, type DropdownMenuCloseFunction } from '../dropdown-menu-button';
import { Icon } from '../icon';
import { Listbox, type ListboxRef } from '../listbox/listbox';
import { SearchContextual } from '../search';
import type { FilterOption } from './filter-option';

interface Props extends ThemeProps<ResolvedTheme> {
    $label: string;
    $hasFilters: boolean;
}

function computeTokenStyles({ $hasFilters, theme }: Props): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    const tokenKeyword = $hasFilters ? 'active-' : '';
    return css`
        background-color: ${theme.component[`filter-button-${tokenKeyword}background-color`]};
        border: 1px solid ${theme.component[`filter-button-${tokenKeyword}border-color`]};
        color: ${theme.component[`filter-button-${tokenKeyword}value-color`]};
        font-weight: ${$hasFilters ? theme.ref['font-weight-semibold'] : theme.ref['font-weight-regular']};

        &::before {
            color: ${theme.component[`filter-button-${tokenKeyword}label-color`]};
        }
    `;
}

export const Footer = styled.div`
    display: flex;
    gap: var(--spacing-1x);
    justify-content: flex-end;
    padding: var(--spacing-1halfx) var(--spacing-2x);
`;

interface PortalDropdownMenuProps {
    $dropdownMenuId: string;
}

const PortalDropdownMenuStyle = createGlobalStyle<PortalDropdownMenuProps>`
    #${({ $dropdownMenuId }) => $dropdownMenuId} {
        min-width: 250px;
    }
`;

const StyledDropdownButton = styled(DropdownMenuButton)<Props>`
    .${dropdownMenuButtonClasses.button} {
        ${computeTokenStyles};
        border-radius: var(--border-radius);
        padding: 0 var(--spacing-1x);

        &::before {
            content: '${({ $label }) => `${$label} : `}';
            font-weight: ${({ theme }) => theme.ref['font-weight-regular']};
            margin-right: var(--spacing-half);
        }

        &:hover {
            background-color: ${({ theme }) => theme.component['filter-button-hover-background-color']};
            border-color: ${({ theme }) => theme.component['filter-button-hover-border-color']};
            color: ${({ theme }) => theme.component['filter-button-hover-value-color']};

            &::before {
                color: ${({ theme }) => theme.component['filter-button-hover-label-color']};
            }
        }

        .${dropdownMenuButtonClasses.expandIcon} {
            color: ${({ theme }) => theme.component['filter-expand-icon-color']};
        }
    }
`;

const ListContainer = styled.div`
    max-height: 248px;
    overflow-y: auto;
    padding: var(--spacing-half) 0;

    ${focus};
`;

const SearchBox = styled(SearchContextual)`
    margin: var(--spacing-1x);
`;

const ClearFiltersContainer = styled.div<{ $hasFilters: boolean }>`
    align-items: center;
    border-radius: var(--border-radius);
    color: ${({ $hasFilters, theme }) => ($hasFilters ? theme.component['filter-clear-color'] : theme.component['filter-clear-disabled-color'])};
    column-gap: var(--spacing-1x);
    display: flex;
    line-height: 1rem;
    margin: 0 var(--spacing-1x);
    padding: var(--spacing-1x) var(--spacing-1x);

    ${focus};
`;

const Divider = styled.span`
    background-color: ${({ theme }) => theme.component['filter-divider-color']};
    display: flex;
    height: 1px;
    margin: var(--spacing-half) var(--spacing-2x);
`;

const StyledListbox = styled(Listbox)`
    background-color: transparent;
    border: none;
    box-shadow: none;
    max-height: 100%;
    outline: none;
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
    const search = providedOptions.length > 10;
    const floatingRef = useRef<HTMLDivElement>(null);
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
    const [inputValue, setInputValue] = useState('');
    const selectedFiltersCount = selectedOptions?.length ?? 0;
    const hasSelectedFilters = selectedFiltersCount > 0;
    const searchRef = useRef<HTMLInputElement>(null);

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

    const getOptionByValue = useCallback(
        (val: string | undefined): FilterOption | undefined => options.find((option) => option.value === val),
        [options],
    );

    const filteredOptions = useMemo(() => {
        if (options.length === 0 && inputValue === '') {
            return [{
                disabled: true,
                label: t('searchNoResults'),
                value: '',
            }];
        }

        if (inputValue === '') {
            return options;
        }

        const filtered = options.filter(
            (option) => option.label.toLowerCase().includes(inputValue.toLowerCase()),
        );

        if (filtered.length === 0) {
            filtered.push({
                disabled: true,
                label: t('searchNoResults'),
                value: '',
            });
        }

        return filtered;
    }, [
        inputValue,
        options,
        t,
    ]);

    function handleTextboxChange(newInputValue: string): void {
        setInputValue(newInputValue);
    }

    const clearFilters = useCallback((): void => {
        const emptyValue: Value & FilterOption[] = [];
        setSelectedOptions(emptyValue);
        if (!async) {
            onChange?.(emptyValue);
            setPreviousValue(emptyValue);
        }
    }, [async, onChange]);

    const handleClearFilterOnKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            clearFilters();
        }
    }, [clearFilters]);

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
            if (search) {
                searchRef.current?.focus();
            } else {
                listboxRef.current?.focusFirstOption();
            }
        } else {
            setInputValue('');
        }
    }, [options, search, value]);

    const appliedFiltersCount = value?.length ?? 0;
    const hasFiltersApplied = appliedFiltersCount > 0;
    const displayValue = t(
        'displayValue',
        { count: appliedFiltersCount, value: getOptionByValue(value?.[0])?.label },
    );

    return (
        <>
            <PortalDropdownMenuStyle $dropdownMenuId={dropdownMenuId} />
            <StyledDropdownButton
                align="left"
                firstItemRef={searchRef}
                label={displayValue}
                onMenuVisibilityChanged={handleMenuVisibilityChanged}
                render={(close: DropdownMenuCloseFunction) => (
                    <div>
                        <ListContainer ref={floatingRef}>
                            {search && (
                                <SearchBox ref={searchRef} onChange={handleTextboxChange} />
                            )}

                            <ClearFiltersContainer
                                tabIndex={hasSelectedFilters ? 0 : -1}
                                onKeyDown={handleClearFilterOnKeyDown}
                                onClick={hasSelectedFilters ? clearFilters : undefined}
                                $hasFilters={hasSelectedFilters}
                            >
                                <Icon name="x" size="16" />
                                <span>{t('clearFilter', { count: selectedFiltersCount })}</span>
                            </ClearFiltersContainer>

                            <Divider />

                            <StyledListbox
                                ref={listboxRef}
                                containerRef={floatingRef}
                                focusable={false}
                                keyboardNav
                                multiselect
                                onOptionClick={handleItemSelected}
                                onChange={handleItemsSelectionChange}
                                options={filteredOptions}
                                value={selectedOptions?.map((option) => option.value) ?? undefined}
                            />
                        </ListContainer>

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
