import { forwardRef, type Ref, type RefObject } from 'react';
import styled from 'styled-components';
import { focus } from '../../../utils/css-state';
import { Listbox } from '../../listbox';
import type { ListboxRef } from '../../listbox/listbox';
import { SearchContextual } from '../../search';
import type { FilterOption } from '../filter-option';
import { ClearFilters } from './clear-filters';

const Container = styled.div`
    max-height: 248px;
    overflow-y: auto;
    padding: var(--spacing-half) 0;

    ${focus};
`;

export const Divider = styled.span`
    background-color: ${({ theme }) => theme.component['filter-divider-color']};
    display: flex;
    height: 1px;
    margin: var(--spacing-half) var(--spacing-2x);
`;

const SearchBox = styled(SearchContextual)`
    margin: var(--spacing-1x);
`;

const StyledListbox = styled(Listbox)`
    background-color: transparent;
    border: none;
    box-shadow: none;
    max-height: 100%;
    outline: none;
`;

export interface ListContainerProps {
    listboxRef: Ref<ListboxRef>;
    multiselect?: boolean;
    options: FilterOption[];
    searchRef: Ref<HTMLInputElement>;
    selectedFiltersCount: number;
    value: string | string[] | null | undefined;

    onChange?(options: FilterOption[]): void;

    onClearFilters(): void;

    onOptionClick?(option: FilterOption): void;

    onSearchChange?(search: string): void;
}

export const ListContainer = forwardRef(({
    onClearFilters,
    listboxRef,
    multiselect = false,
    onChange,
    onOptionClick,
    onSearchChange,
    options,
    searchRef,
    selectedFiltersCount,
    value,
}: ListContainerProps, ref: Ref<HTMLDivElement>) => (
    <Container ref={ref}>
        {onSearchChange && (
            <SearchBox ref={searchRef} onChange={onSearchChange} />
        )}

        <ClearFilters
            selectedFiltersCount={selectedFiltersCount}
            onClearFilters={onClearFilters}
        />

        <Divider />

        <StyledListbox
            ref={listboxRef}
            containerRef={ref as RefObject<HTMLElement>}
            focusable={false}
            multiselect={multiselect}
            keyboardNav
            onChange={onChange}
            onOptionClick={onOptionClick}
            options={options}
            value={value ?? undefined}
        />
    </Container>
));

ListContainer.displayName = 'ListContainer';
