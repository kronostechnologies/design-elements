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
import { CustomColumnDef } from './types';

interface StyledTableRowProps {
    $clickable: boolean;
    $error: boolean;
    $selected: boolean;
    $striped?: boolean;
}

interface CustomCell<TData extends RowData, TValue = unknown> extends Cell<TData, TValue> {
    column: Column<TData, TValue> & {
        columnDef: CustomColumnDef<TData, TValue>;
    };
}

function getRowBackgroundColor({
    $selected, $error,
}: ThemedStyledProps<StyledTableRowProps, ResolvedTheme>): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    if ($selected) {
        return css`
            /* TODO fix with next thematization */
            background-color: #e0f0f9;
        `;
    }
    if ($error) {
        return css`
            /* TODO fix with next thematization theme.notifications.error4 */
            background-color: #fcf8f9;
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
            background-color: ${theme.greys.grey};
        }

        &:not(:hover) td {
            background-color: inherit;
        }
    `;
}

const StyledTableRow = styled.tr<StyledTableRowProps>`
    &:not(:first-child) {
        border-top: 1px solid ${({ theme }) => theme.greys.grey};
    }

    ${({ $error, $striped, theme }) => $striped && !$error && css`
        &:nth-child(odd) {
            background-color: ${theme.greys['colored-white']};
        }
    `}

    ${({ $clickable, theme }) => $clickable && css`
        &:focus {
            position: relative;

            &::after {
                box-shadow: ${theme.tokens['focus-border-box-shadow-inset']};
                content: '';
                height: calc(100% + 3px);
                left: 0;
                outline: none;
                position: absolute;
                top: -2px;
                width: 100%;
                z-index: 3;
            }
        }

        &:hover {
            cursor: pointer;
        }
    `}

    ${({ $error, theme }) => $error && css`
        position: relative;

        &::after {
            box-shadow: inset 0 0 0 1px ${theme.notifications['alert-2.1']};
            content: '';
            height: calc(100% + 1px);
            left: 0;
            outline: none;
            position: absolute;
            width: 100%;
            z-index: 3;
        }

        td:first-child::after {
            border-left: 1px solid ${theme.notifications['alert-2.1']};
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

const StyledCell = styled.td<{ $sticky?: boolean, $startOffset: number; $textAlign: CSSProperties['textAlign'] }>`
    background-color: inherit;
    text-align: ${({ $textAlign }) => $textAlign};

    ${({ $sticky, $startOffset }) => ($sticky) && css`
        left: ${$startOffset / 2}px;
        position: sticky;
        z-index: 2;
    `}
`;

function getCell<TData extends object, TValue>(cell: CustomCell<TData, TValue>): ReactElement | null {
    return (
        <StyledCell
            $sticky={cell.column.columnDef.sticky || false}
            $textAlign={cell.column.columnDef.textAlign}
            $startOffset={cell.column.getStart()}
            key={cell.id}
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
        data-testid={`table-row-${row.index}`}
        $error={error}
        key={row.id}
        $striped={striped}
        $selected={row.getIsSelected()}
        onClick={() => onClick && onClick(row)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(onClick ? { tabIndex: 0, role: 'button' } : null)}
    >
        {row.getVisibleCells().map((cell) => getCell(cell as CustomCell<T>))}
    </StyledTableRow>
);
