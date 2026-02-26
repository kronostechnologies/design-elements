import { type FC, type Ref, type RefObject, useRef } from 'react';
import styled from 'styled-components';
import { focus } from '../../../utils/css-state';
import { Listbox } from '../../listbox';
import type { ListboxRef } from '../../listbox/listbox';
import { SearchContextual } from '../../search';
import type { FilterOption } from '../filter-option';

const Container = styled.div`
    max-height: 256px;
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

    input {
        flex-grow: 1;
        width: 0;
    }
`;

const StyledListbox = styled(Listbox)`
    background-color: transparent;
    border: none;
    box-shadow: none;
    max-height: 100%;
    outline: none;
`;

export interface ListContainerProps {
    featuredOptions?: FilterOption[] | null | undefined;
    listboxRef: Ref<ListboxRef>;
    multiselect?: boolean;
    options: FilterOption[];
    searchRef: Ref<HTMLInputElement>;
    value: string | string[] | null | undefined;

    onChange?(options: FilterOption[]): void;

    onOptionClick?(option: FilterOption): void;

    onSearchChange?(search: string): void;
}

export const ListContainer: FC<ListContainerProps> = ({
    featuredOptions,
    listboxRef,
    multiselect = false,
    onChange,
    onOptionClick,
    onSearchChange,
    options,
    searchRef,
    value,
}: ListContainerProps) => {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <Container ref={ref}>
            {onSearchChange && (
                <SearchBox ref={searchRef} onChange={onSearchChange} />
            )}

            {(onSearchChange) && <Divider />}

            <StyledListbox
                ref={listboxRef}
                containerRef={ref as RefObject<HTMLElement>}
                focusable={false}
                multiselect={multiselect}
                keyboardNav
                onChange={onChange}
                onOptionClick={onOptionClick}
                options={options}
                featuredOptions={featuredOptions ?? undefined}
                value={value ?? undefined}
            />
        </Container>
    );
};

ListContainer.displayName = 'ListContainer';
