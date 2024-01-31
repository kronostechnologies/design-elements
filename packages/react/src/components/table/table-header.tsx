import { CSSProperties, ReactElement } from 'react';
import styled, { css } from 'styled-components';
import {
    Header,
    HeaderGroup,
    Column,
    flexRender,
    RowData,
} from '@tanstack/react-table';
import { SortButtonIcon, SortState } from './sort-button-icon';
import { CustomColumnDef } from './types';

interface CustomHeader<TData extends RowData, TValue = unknown> extends Header<TData, TValue> {
    column: Column<TData, TValue> & {
        columnDef: CustomColumnDef<TData, TValue>;
    };
}

const SortButton = styled.button<{ $textAlign: string }>`
    align-items: center;
    cursor: pointer;
    display: flex;
    font: inherit;
    text-align: ${({ $textAlign }) => $textAlign};

    &:focus {
        outline: none;
    }
`;

const StyledHeader = styled.th<{ $sticky: boolean, $startOffset: number; $textAlign: CSSProperties['textAlign'] }>`
    background-color: inherit;
    box-sizing: border-box;
    position: relative;
    text-align: ${({ $textAlign }) => $textAlign};

    ${({ $sticky, $startOffset }) => $sticky && css`
        left: ${$startOffset / 2}px;
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

const StyleHeaderRow = styled.tr<{ $sticky: boolean }>`
    background-color: inherit;
    ${({ $sticky }) => $sticky && css`
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
    let sortState: SortState = 'none';

    if (currentSort === 'asc') {
        sortState = 'ascending';
    }
    if (currentSort === 'desc') {
        sortState = 'descending';
    }

    if (header.column.columnDef.sortable) {
        return (
            <StyledHeader
                aria-sort={sortState}
                key={header.id}
                className={header.column.columnDef.className ?? ''}
                scope="col"
                $textAlign={header.column.columnDef.textAlign}
                $startOffset={header.getStart()}
                $sticky={header.column.columnDef.sticky ?? false}
            >
                {header.isPlaceholder ? null : (
                    <SortButton
                        $textAlign={header.column.columnDef.textAlign ?? 'left'}
                        className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                        onClick={header.column.getToggleSortingHandler()}
                    >
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                        )}
                        <StyledSortButtonIcon sort={sortState} data-testid="sort-icon" />
                    </SortButton>
                )}
            </StyledHeader>
        );
    }

    return (
        <StyledHeader
            key={header.id}
            className={header.column.columnDef.className ?? undefined}
            scope="col"
            $textAlign={header.column.columnDef.textAlign}
            $startOffset={header.getStart()}
            $sticky={header.column.columnDef.sticky ?? false}
        >
            {!header.isPlaceholder && flexRender(
                header.column.columnDef.header,
                header.getContext(),
            )}
        </StyledHeader>
    );
}

interface TableHeaderProps<T extends object> {
    headerGroup: HeaderGroup<T>;
    sticky: boolean;
}

export const TableHeader = <T extends object>({
    headerGroup,
    sticky,
}: TableHeaderProps<T>): ReactElement => (
    <StyleHeaderRow key={headerGroup.id} $sticky={sticky}>
        {headerGroup.headers.map((header) => getHeading(header as CustomHeader<T>))}
    </StyleHeaderRow>
);
