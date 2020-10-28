import React, { CSSProperties, ReactElement } from 'react';
import { UseTableRowProps } from 'react-table';
import styled, { css } from 'styled-components';

import { Theme } from '../theme-wrapper/theme-wrapper';
import { RowProps } from './table';

const StyledTableRow = styled.tr<StyledTableRowProps & {theme: Theme}>`
    border-top: 1px solid ${({ theme }) => theme.greys.grey};
    ${({ clickable, theme }) => clickable && css`
        :focus {
            border-color: ${theme.tokens['focus-border']};
            box-shadow: ${theme.tokens['focus-border-box-shadow-inset']};
            outline: none;
        }

        :hover {
            background-color: ${theme.greys.grey};
            cursor: pointer;
        }
    `}

    ${({ error, striped, theme }) => striped && !error && css`
        :nth-child(odd) {
            background-color: ${theme.greys['colored-white']};
        }
    `}

    ${({ error, theme }) => error && css`
        border: 1px solid ${theme.notifications['error-2.1']};
        /* TODO fix with next thematization theme.notifications.error4 */
        background-color: #fcf8f9;
    `}
`;

interface StyledTableRowProps {
    clickable: boolean;
    error: boolean;
    striped?: boolean;
}

interface TableRowProps extends Omit<StyledTableRowProps, 'clickable'> {
    row: UseTableRowProps<{}>;
    viewIndex: number;

    onClick?(row: RowProps): void;
}

export function TableRow({ error, row, striped, viewIndex, onClick }: TableRowProps): ReactElement {
    return (
        <StyledTableRow
            clickable={!!onClick}
            error={error}
            striped={striped}
            onClick={() => onClick && onClick(row)}
            {...row.getRowProps()}
            {...(onClick ? { tabIndex: 0, role: 'button' } : {})}
        >
            {row.cells.map(cell => {
                const style: CSSProperties = { textAlign: cell.column.textAlign };
                return (
                    <td
                        style={style}
                        className={cell.column.className}
                        {...{ ...cell.getCellProps(), key: `${cell.column.id}-${cell.row.id}` }}
                    >
                        {cell.render('Cell', { viewIndex })}
                    </td>
                );
            })}
        </StyledTableRow>
    );
}
