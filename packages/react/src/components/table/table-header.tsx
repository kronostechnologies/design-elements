import { CSSProperties, ReactElement } from 'react';
import styled, { css } from 'styled-components';
import {
    Header,
    HeaderGroup,
    Column,
    flexRender,
    RowData,
    SortDirection,
} from '@tanstack/react-table';
import { devConsole } from '../../utils/dev-console';
import { SortButtonIcon, SortState } from './sort-button-icon';
import { TableColumn } from './types';
import { isAGroupColumn, isLastColumnInAGroup } from './utils/table-utils';
import { focus } from '../../utils/css-state';

interface CustomHeader<TData extends RowData, TValue = unknown> extends Header<TData, TValue> {
    column: Column<TData, TValue> & {
        columnDef: TableColumn<TData, TValue>;
    };
}

const SortButton = styled.button<{ $textAlign: string }>`
    align-items: center;
    border-radius: var(--border-radius);
    cursor: pointer;
    display: flex;
    font: inherit;
    text-align: ${({ $textAlign }) => $textAlign};

    ${({ theme }) => focus({ theme }, { focusType: 'focus-visible', insideOnly: true })};
`;

interface StyledHeaderProps {
    hasRightBorder: boolean;
    $sticky: boolean;
    $startOffset: number;
    $textAlign: CSSProperties['textAlign'];
}

const StyledHeader = styled.th<StyledHeaderProps>`
    background-color: inherit;
    box-sizing: border-box;
    position: relative;
    text-align: ${({ $textAlign }) => $textAlign};

    ${({ $sticky, $startOffset }) => $sticky && css`
        left: ${$startOffset / 2}px;
        position: sticky;
        z-index: 5;
    `}

    ${({ hasRightBorder }) => hasRightBorder && css`
        border-right: 1px solid ${({ theme }) => theme.component['table-group-border-color']};
    `}

    &:before {
        border-bottom: 1px solid ${({ theme }) => theme.component['table-header-border-color']};
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

function getSortState(currentSort: false | SortDirection): SortState {
    switch (currentSort) {
        case 'asc':
            return 'ascending';
        case 'desc':
            return 'descending';
        default:
            return 'none';
    }
}

function getHeading<TData extends object, TValue>(header: CustomHeader<TData, TValue>): ReactElement {
    const colSpan = header.colSpan > 1 ? header.colSpan : undefined;
    const hasRightBorder = isAGroupColumn(header.column) || isLastColumnInAGroup(header.column);
    const sortState: SortState = getSortState(header.column.getIsSorted());

    if (!header.column.columnDef.header && !header.column.columnDef.headerAriaLabel) {
        devConsole.warn(
            `aria-label missing for column ${header.id} without text. please add headerAriaLabel to column.`,
        );
    }

    if (header.column.columnDef.sortable) {
        return (
            <StyledHeader
                aria-label={header.column.columnDef.headerAriaLabel}
                aria-sort={sortState}
                className={header.column.columnDef.className ?? ''}
                colSpan={colSpan}
                hasRightBorder={hasRightBorder}
                key={header.id}
                scope="col"
                $startOffset={header.getStart()}
                $sticky={header.column.columnDef.sticky ?? false}
                $textAlign={header.column.columnDef.textAlign}
            >
                {header.isPlaceholder ? null : (
                    <SortButton
                        $textAlign={header.column.columnDef.textAlign ?? 'left'}
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
            aria-label={header.column.columnDef.headerAriaLabel}
            className={header.column.columnDef.className ?? undefined}
            colSpan={colSpan}
            hasRightBorder={hasRightBorder}
            key={header.id}
            scope="col"
            $startOffset={header.getStart()}
            $sticky={header.column.columnDef.sticky ?? false}
            $textAlign={header.column.columnDef.textAlign}
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
    <StyleHeaderRow $sticky={sticky}>
        {headerGroup.headers.map((header) => getHeading(header as CustomHeader<T>))}
    </StyleHeaderRow>
);
