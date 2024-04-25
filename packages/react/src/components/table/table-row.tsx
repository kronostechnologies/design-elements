import { CSSProperties, ReactElement } from 'react';
import {
    flexRender,
    Row,
    Cell,
    Column,
    RowData,
} from '@tanstack/react-table';
import styled, { css, FlattenInterpolation, ThemedStyledProps, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { TableColumn } from './types';
import { focus } from '../../utils/css-state';
import { isLastColumnInAGroup } from './utils/table-utils';

interface StyledTableRowProps {
    $clickable?: boolean;
    $error?: boolean;
    $selected?: boolean;
    $striped?: boolean;
}

interface CustomCell<TData extends RowData, TValue = unknown> extends Cell<TData, TValue> {
    column: Column<TData, TValue> & {
        columnDef: TableColumn<TData, TValue>;
    };
}

interface StyledCellProps {
    hasRightBorder: boolean;
    $sticky?: boolean,
    $startOffset: number;
    $textAlign: CSSProperties['textAlign']
}

function getRowBackgroundColor({
    theme,
    $selected,
    $error,
}: ThemedStyledProps<StyledTableRowProps, ResolvedTheme>): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    if ($selected) {
        return css`
            background-color: ${theme.component['table-row-selected-background-color']};
        `;
    }
    if ($error) {
        return css`
            background-color: ${theme.component['table-row-error-background-color']};
        `;
    }
    return css`
        background-color: inherit;
    `;
}

function getCellBackgroundCss({
    theme,
    $clickable,
}: ThemedStyledProps<StyledTableRowProps, ResolvedTheme>): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    if (!$clickable) {
        return css`
            td {
                background-color: inherit;
            }
        `;
    }

    return css`
        &:hover td {
            background-color: ${theme.component['table-cell-hover-background-color']};
        }

        &:not(:hover) td {
            background-color: inherit;
        }
    `;
}

export const StyledTableRow = styled.tr<StyledTableRowProps>`
    &:not(:first-child) {
        border-top: 1px solid ${({ theme }) => theme.component['table-row-border-color']};
    }

    ${({ $error, $striped, theme }) => $striped && !$error && css`
        &:nth-child(odd) {
            background-color: ${theme.component['table-row-odd-background-color']};
        }
    `}

    ${({ $clickable, theme }) => $clickable && css`
        ${focus({ theme }, { focusType: 'focus-visible' })};
        &:focus {
            position: relative;
            z-index: 3;

            &::after {
                content: '';
                height: calc(100% + 3px);
                left: 0;
                position: absolute;
                top: -2px;
                width: 100%;
            }
        }

        &:hover {
            cursor: pointer;
        }
    `}

    ${({ $error, theme }) => $error && css`
        position: relative;

        &::after {
            box-shadow: inset 0 0 0 1px ${theme.component['table-row-error-border-color']};
            content: '';
            height: calc(100% + 1px);
            left: 0;
            outline: none;
            position: absolute;
            width: 100%;
            z-index: 3;
        }

        td:first-child::after {
            border-left: 1px solid ${theme.component['table-row-error-border-color']};
            content: '';
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            z-index: 3;
        }
    `}

    ${getRowBackgroundColor}
    ${getCellBackgroundCss}
`;

const StyledCell = styled.td<StyledCellProps>`
    background-color: inherit;
    text-align: ${({ $textAlign }) => $textAlign};

    ${({ $sticky, $startOffset }) => ($sticky) && css`
        left: ${$startOffset / 2}px;
        position: sticky;
        z-index: 2;
    `}

    ${({ hasRightBorder }) => hasRightBorder && css`
        border-right: 1px solid ${({ theme }) => theme.greys.grey};
    `}
`;

function getCell<TData extends object, TValue>(cell: CustomCell<TData, TValue>): ReactElement | null {
    return (
        <StyledCell
            $sticky={cell.column.columnDef.sticky || false}
            $textAlign={cell.column.columnDef.textAlign}
            $startOffset={cell.column.getStart()}
            key={cell.id}
            hasRightBorder={isLastColumnInAGroup(cell.column)}
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </StyledCell>
    );
}

interface TableRowProps<T extends object> {
    row: Row<T>;
    striped: boolean;
    error: boolean;
    onClick?(row: Row<T>): void;
}

export const TableRow = <T extends object>({
    error,
    onClick,
    row,
    striped,
}: TableRowProps<T>): ReactElement => (
    <StyledTableRow
        $clickable={!!onClick}
        $error={error}
        $striped={striped}
        $selected={row.getIsSelected()}
        onClick={() => onClick && onClick(row)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(onClick ? { tabIndex: 0, role: 'button' } : null)}
        data-testid={`table-row-${row.id}`}
    >
        {row.getVisibleCells().map((cell) => getCell(cell as CustomCell<T>))}
    </StyledTableRow>
);
