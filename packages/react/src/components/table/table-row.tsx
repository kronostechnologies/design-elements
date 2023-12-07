import { ReactElement } from 'react';
import {
    flexRender,
    Row,
    Cell,
    Column,
    ColumnDef as OriginalColumnDef,
} from '@tanstack/react-table';
import styled, { css, FlattenInterpolation, ThemedStyledProps, ThemeProps } from 'styled-components';
import { Theme } from '../../themes';

interface StyledTableRowProps {
    clickable: boolean;
    error: boolean;
    selected: boolean;
    striped?: boolean;
}

type TextAlignOptions = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';

type CustomColumnDef<TData extends object, TValue> = OriginalColumnDef<TData, TValue> & {
    className?: string;
    textAlign?: TextAlignOptions; // Define this type if not already defined
    sticky?: boolean;
    position?: number;
};

interface CustomCell<TData extends object, TValue> extends Cell<TData, TValue> {
  column: Column<TData, TValue> & {
      columnDef: CustomColumnDef<TData, TValue>;
  };
}

function getRowBackgroundColor({
    theme, selected, error,
}: ThemedStyledProps<StyledTableRowProps, Theme>): FlattenInterpolation<ThemeProps<Theme>> {
    if (selected) {
        return css`
            /* TODO fix with next thematization */
            background-color: #e0f0f9;
        `;
    }
    if (error) {
        return css`
            /* TODO fix with next thematization theme.notifications.error4 */
            background-color: #fcf8f9;
        `;
    }
    return css`
        background-color: ${theme.greys.white};
    `;
}

function getCellBackgroundCss({
    theme, clickable,
}: ThemedStyledProps<StyledTableRowProps, Theme>): FlattenInterpolation<ThemeProps<Theme>> {
    if (!clickable) {
        return css`
            td {
                background-color: inherit;
            }
        `;
    }

    return css`
        :hover td {
            background-color: ${theme.greys.grey};
        }

        :not(:hover) td {
            background-color: inherit;
        }
    `;
}

const StyledTableRow = styled.tr<StyledTableRowProps & { theme: Theme }>`
    border-top: 1px solid ${({ theme }) => theme.greys.grey};
    ${({ error, striped, theme }) => striped && !error && css`
        :nth-child(odd) {
            background-color: ${theme.greys['colored-white']};
        }
    `}

    ${({ clickable, theme }) => clickable && css`
        :focus {
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

        :hover {
            cursor: pointer;
        }
    `}

    ${({ error, theme }) => error && css`
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

const StyledCell = styled.td<{ sticky?: boolean, position:number }>`
    ${({ sticky, position }) => (sticky) && css`
        left: ${position / 2}px;
        position: sticky;
        z-index: 2;
    `}
`;

function getCell<TData extends object, TValue>(cell: CustomCell<TData, TValue>): ReactElement | null {
    return (
        <StyledCell
            sticky={cell.column.columnDef.sticky || false}
            style={{ textAlign: cell.column.columnDef.textAlign || 'left' }}
            position={cell.column.getStart()}
            key={cell.id}
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </StyledCell>
    );
}

interface TableRowProps<T extends object> extends Omit<StyledTableRowProps, 'clickable' | 'selected'> {
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
}: TableRowProps<T>): ReactElement => { // eslint-disable-line arrow-body-style
    return (
        <StyledTableRow
            clickable={!!onClick}
            data-testid={`table-row-${row.index}`}
            error={error}
            key={row.id}
            striped={striped}
            selected={row.getIsSelected()}
            onClick={() => onClick && onClick(row)}
            {...(onClick ? { tabIndex: 0, role: 'button' } : {})/* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {row.getVisibleCells().map((cell) => getCell(cell))}
        </StyledTableRow>
    );
};
