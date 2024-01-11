import { CSSProperties, ReactElement } from 'react';
import styled, { css } from 'styled-components';
import {
    Header,
    HeaderGroup,
    ColumnDef,
    Column,
    flexRender,
} from '@tanstack/react-table';
import { SortButtonIcon, SortState } from './sort-button-icon';

type CustomColumnDef<TData extends object, TValue> = ColumnDef<TData, TValue> & {
    className?: string;
    textAlign?: CSSProperties['textAlign'];
    sticky?: boolean;
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
    font: inherit;
    text-align: ${({ textAlign }) => textAlign};

    &:focus {
        outline: none;
    }
`;

const StyledHeader = styled.th<{ sticky: boolean, startOffset: number }>`
    background-color: ${({ theme }) => theme.greys.white};
    box-sizing: border-box;
    position: relative;
    ${({ sticky, startOffset }) => sticky && css`
        left: ${startOffset / 2}px;
        position: sticky;
        z-index: 5;
    `}
    &:before {
        border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
        bottom: 0;
        content: '';
        position: absolute;
        right: 0;
        width: 100%;
    }
`;

const StyleHeaderRow = styled.tr<{ stickyHeader: boolean }>`
    ${({ stickyHeader }) => stickyHeader && css`
        position: sticky;
        top: 0;
        z-index: 6;
    `}
`;

const StyledSortButtonIcon = styled(SortButtonIcon)`
    margin-left: var(--spacing-1x);
`;

function getHeading<TData extends object, TValue>(
    header: CustomHeader<TData, TValue>,
): ReactElement {
    const currentSort = header.column.getIsSorted();
    const defaultSort = header.column.columnDef.defaultSort;
    let sortState: SortState = 'none';

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
                startOffset={header.getStart()}
                sticky={header.column.columnDef.sticky || false}
            >
                {!header.isPlaceholder && flexRender(
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
            startOffset={header.getStart()}
            sticky={header.column.columnDef.sticky || false}
        >
            {header.isPlaceholder ? null : (
                <SortButton
                    textAlign={header.column.columnDef.textAlign || 'left'}
                    className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                    onClick={header.column.getToggleSortingHandler()}
                >
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                    )}
                    {header.column.columnDef.sortable && (
                        <StyledSortButtonIcon sort={sortState} data-testid="sort-icon" />
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
}: HeaderProps<T>): ReactElement => (
    <StyleHeaderRow key={headerGroup.id} stickyHeader={stickyHeader}>
        {headerGroup.headers.map((header) => getHeading(header))}
    </StyleHeaderRow>
);
