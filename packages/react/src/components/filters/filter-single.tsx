import React, { type FC, useCallback, useMemo, useRef, useState } from 'react';
import styled, { createGlobalStyle, css, type FlattenInterpolation, type ThemeProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes';
import { DS_CLASS_PREFIX } from '../../utils/component-classes';
import { focus } from '../../utils/css-state';
import { v4 as uuid } from '../../utils/uuid';
import { DropdownMenuButton, dropdownMenuButtonClasses, type DropdownMenuCloseFunction } from '../dropdown-menu-button';
import { Icon } from '../icon';
import { Listbox } from '../listbox';
import type { ListboxRef } from '../listbox/listbox';
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
    const search = options.length > 10;
    const floatingRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<ListboxRef>(null);
    const dropdownMenuId = useMemo(() => `${DS_CLASS_PREFIX}${uuid()}`, []);
    const { t } = useTranslation('filter');
    const [previousValue, setPreviousValue] = useState<Value | undefined>(value);
    const [inputValue, setInputValue] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);

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

    const clearFilters = useCallback((close: DropdownMenuCloseFunction): void => {
        setPreviousValue(null);
        onChange?.(null);
        close();
    }, [onChange]);

    const handleClearFilterOnKeyDown = useCallback(
        (close: DropdownMenuCloseFunction, event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                clearFilters(close);
                event.preventDefault();
            }
        },
        [clearFilters],
    );

    const handleMenuVisibilityChanged = useCallback((isOpen: boolean): void => {
        if (isOpen) {
            setPreviousValue(value);
            if (search) {
                searchRef.current?.focus();
            } else {
                listboxRef.current?.focusFirstOption();
            }
        } else {
            setInputValue('');
        }
    }, [search, value]);

    const handleItemSelected = useCallback((close: DropdownMenuCloseFunction, option: FilterOption): void => {
        setPreviousValue(option.value);
        onChange?.(option.value);
        close();
    }, [onChange]);

    const hasSelectedFilters = value !== undefined && value !== null;
    const appliedFiltersCount = hasSelectedFilters ? 1 : 0;
    const displayValue = t(
        'displayValue',
        { count: appliedFiltersCount, value: getOptionByValue(value ?? undefined)?.label },
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
                    <ListContainer ref={floatingRef}>
                        {search && (
                            <SearchBox ref={searchRef} onChange={handleTextboxChange} />
                        )}

                        <ClearFiltersContainer
                            aria-disabled={!hasSelectedFilters}
                            tabIndex={hasSelectedFilters ? 0 : -1}
                            onKeyDown={handleClearFilterOnKeyDown.bind(null, close)}
                            onClick={hasSelectedFilters ? clearFilters.bind(null, close) : undefined}
                            $hasFilters={hasSelectedFilters}
                            role="button"
                        >
                            <Icon name="x" size="16" />
                            <span>{t('clearFilter', { count: hasSelectedFilters ? 1 : 0 })}</span>
                        </ClearFiltersContainer>

                        <Divider />

                        <StyledListbox
                            ref={listboxRef}
                            containerRef={floatingRef}
                            focusable={false}
                            keyboardNav
                            onOptionClick={handleItemSelected.bind(null, close)}
                            options={filteredOptions}
                            value={previousValue ?? undefined}
                        />
                    </ListContainer>
                )}
                dropdownMenuId={dropdownMenuId}
                $label={label}
                $hasFilters={hasSelectedFilters}
            />
        </>
    );
};
