import React, { CSSProperties, ReactElement } from 'react';
import { Row as ReactTableRow } from 'react-table';
import styled, { css } from 'styled-components';
import { Theme } from '../../themes';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Row<T extends object> extends ReactTableRow<T> {
}

interface StyledTableRowProps {
    clickable: boolean;
    error: boolean;
    striped?: boolean;
}

const StyledTableRow = styled.tr<StyledTableRowProps & { theme: Theme }>`
    border-top: 1px solid ${({ theme }) => theme.greys.grey};
    ${({ error, striped, theme }) => striped && !error && css`
        :nth-child(odd) {
            background-color: ${theme.greys['colored-white']};
        }
    `} ${({ clickable, theme }) => clickable && css`
        :focus {
            border-color: ${theme.tokens['focus-border']};
            box-shadow: ${theme.tokens['focus-border-box-shadow-inset']};
            outline: none;
        }

        :hover {
            background-color: ${theme.greys.grey};
            cursor: pointer;
        }
    `}  ${({ error, theme }) => error && css`
        /* TODO fix with next thematization theme.notifications.error4 */
        background-color: #fcf8f9;
        border: 1px solid ${theme.notifications['error-2.1']};
    `}
`;

interface TableRowProps<T extends object> extends Omit<StyledTableRowProps, 'clickable'> {
    row: Row<T>;
    viewIndex: number;

    onClick?(row: Row<T>): void;
}

export function TableRow<T extends object>({
    error, row, striped, viewIndex, onClick,
}: TableRowProps<T>): ReactElement {
    return (
        <StyledTableRow
            clickable={!!onClick}
            error={error}
            striped={striped}
            onClick={() => onClick && onClick(row)}
            {...row.getRowProps() /* eslint-disable-line react/jsx-props-no-spreading */}
            {...(onClick ? { tabIndex: 0, role: 'button' } : {}) /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {row.cells.map((cell) => {
                const style: CSSProperties = {
                    textAlign: cell.column.textAlign,
                    width: cell.column.width,
                    maxWidth: cell.column.width,
                    minWidth: cell.column.minWidth,
                };

                return (
                    <td
                        style={style}
                        className={cell.column.className}
                        {...{ /* eslint-disable-line react/jsx-props-no-spreading */
                            ...cell.getCellProps(),
                            key: `${cell.column.id}-${cell.row.id}`,
                        }}
                    >
                        {cell.render('Cell', { viewIndex })}
                    </td>
                );
            })}
        </StyledTableRow>
    );
}
