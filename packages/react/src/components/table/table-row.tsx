import { CSSProperties, ReactElement, useMemo } from 'react';
import { flexRender, Row } from '@tanstack/react-table';
import styled, { css, FlattenInterpolation, ThemedStyledProps, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
import { findNearestTextAlign, isLastColumnInAGroup } from './utils/table-utils';
import { CustomCell } from './types';

interface StyledTableRowProps {
    $clickable?: boolean;
    $error?: boolean;
    $selected?: boolean;
    $striped?: boolean;
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
        border-right: 1px solid ${({ theme }) => theme.component['table-group-border-color']};
    `}
`;

function getCell<TData extends object, TValue>(cell: CustomCell<TData, TValue>): ReactElement | null {
    const columnDef = cell.column.columnDef;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const textAlign = useMemo(() => findNearestTextAlign(cell.column), [cell.column]);
    return (
        <StyledCell
            $sticky={columnDef.sticky || false}
            $textAlign={textAlign}
            $startOffset={cell.column.getStart()}
            key={cell.id}
            id={cell.id}
            hasRightBorder={isLastColumnInAGroup(cell.column)}
        >
            {flexRender(columnDef.cell, cell.getContext())}
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
        {row.getVisibleCells().map((cell) => getCell(cell))}
    </StyledTableRow>
);

TableRow.displayName = 'TableRow';
