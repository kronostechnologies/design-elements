import { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import {
    Header,
    HeaderGroup,
    ColumnDef as OriginalColumnDef,
    Column,
    flexRender,
} from '@tanstack/react-table';
import { SortButtonIcon, SortState } from './sort-button-icon';

type TextAlignOptions = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';

type CustomColumnDef<TData extends object, TValue> = OriginalColumnDef<TData, TValue> & {
    className?: string;
    textAlign?: TextAlignOptions; // Define this type if not already defined
    sticky?: boolean;
    stickyHeader?: boolean;
    position?: number;
    sortable?: boolean;
    iconAlign?: 'left' | 'right';
    defaultSort?: 'asc' | 'desc';
};

interface CustomHeader<TData extends object, TValue> extends Header<TData, TValue> {
  column: Column<TData, TValue> & {
      columnDef: CustomColumnDef<TData, TValue>;
  };
  sortable?: boolean;
  headerColSpan?: number;
  iconAlign?: 'left' | 'right';
}

const SortButton = styled.button<{ textAlign: string }>`
    align-items: center;
    cursor: pointer;
    display: flex;
    margin-left: var(--spacing-1x);
    ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}

    &:focus {
        outline: none;
    }
`;

const StyledHeader = styled.th<{ sticky: boolean, position: number }>`
    background-color: ${({ theme }) => theme.greys.white};
    box-sizing: border-box;
    ${({ sticky, position }) => sticky && css`
        left: ${position / 2}px;
        position: sticky;
        z-index: 5;
    `}
`;

const StyleHeaderRow = styled.tr<{ stickyHeader: boolean }>`
    ${({ stickyHeader }) => stickyHeader && css`
        position: sticky;
        top: 0;
        z-index: 6;
    `}
`;

function getHeading<TData extends object, TValue>(
    header: CustomHeader<TData, TValue>,
): ReactElement {
    const currentSort = header.column.getIsSorted();
    const defaultSort = header.column.columnDef.defaultSort;
    let sortState: SortState = 'none'; // Default to 'none'

    if (currentSort) {
        sortState = currentSort === 'asc' ? 'ascending' : 'descending';
    } else if (defaultSort) {
        sortState = defaultSort === 'asc' ? 'ascending' : 'descending';
    }

    if (!header.column.columnDef.sortable) {
        return (
            <StyledHeader
                key={header.id}
                className={header.column.columnDef.className || ''}
                scope="col"
                style={{ textAlign: header.column.columnDef.textAlign || 'left' }}
                position={header.getStart()}
                sticky={header.column.columnDef.sticky || false}
            >
                { header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                    )}
            </StyledHeader>
        );
    }
    return (
        <StyledHeader
            aria-sort={sortState}
            key={header.id}
            className={header.column.columnDef.className || ''}
            scope="col"
            style={{ textAlign: header.column.columnDef.textAlign || 'left' }}
            position={header.getStart()}
            sticky={header.column.columnDef.sticky || false}
        >
            {header.isPlaceholder ? null : (
                <SortButton
                    textAlign={header.column.columnDef.textAlign || 'left'}
                    {...{
                        className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                        onClick: header.column.getToggleSortingHandler(),
                    }}
                >
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                    )}
                    { header.column.columnDef.sortable && (
                        <SortButtonIcon sort={sortState} data-testid="sort-icon" />
                    )}
                </SortButton>
            )}
        </StyledHeader>
    );
}

export interface HeaderProps<T extends object> {
    headerGroup: HeaderGroup<T>;
    stickyHeader: boolean;
}
export const TableHeader = <T extends object>({
    headerGroup,
    stickyHeader,
}:HeaderProps<T>): ReactElement => { // eslint-disable-line arrow-body-style
    return (
        <StyleHeaderRow key={headerGroup.id} stickyHeader={stickyHeader}>
            {headerGroup.headers.map((header) => getHeading(header))}
        </StyleHeaderRow>
    );
};
