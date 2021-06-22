import React, { CSSProperties, ReactElement } from 'react';
import { Row } from 'react-table';
import styled, { css } from 'styled-components';
import { Theme } from '../../themes';

interface StyledTableRowProps {
    clickable: boolean;
    error: boolean;
    selected: boolean;
    striped?: boolean;
    sticky?: boolean;
}

const StyledTableRow = styled.tr<StyledTableRowProps & { theme: Theme}>`    
    ${({ error, striped, theme }) => striped && !error && css`
        :nth-child(odd) {
            background-color: ${theme.greys['colored-white']};
        }
    `}

    ${({ clickable, theme }) => clickable && css`
        :focus {
            border-color: ${theme.tokens['focus-border']};
            box-shadow: ${theme.tokens['focus-border-box-shadow-inset']};
            outline: none;
        }

        :hover {
            td {
                background-color: ${theme.greys.grey};
            }
            cursor: pointer;
        }
    `}

    ${({ selected }) => selected && css`
        /* TODO fix with next thematization */
        background-color: #e0f0f9;
    `}

    ${({ error }) => error && css`
        /* TODO fix with next thematization theme.notifications.error4 */
        background-color: #fcf8f9;
    `}
    
    // Background color to allow sticky columns/rows
    ${({ clickable, theme, error }) => (clickable ? css`
        :not(:hover) td {
            background-color: ${(error ? 'inherit' : theme.greys.white)};
        }
    ` : css`
        td {
            background-color: ${(error ? 'inherit' : theme.greys.white)};
        }
    `)}
`;

const StyledCell = styled.td<{ sticky?: boolean }>`
    ${({ sticky }) => (sticky) && css`
        position: sticky;
    `}
`;

interface TableRowProps<T extends object> extends Omit<StyledTableRowProps, 'clickable' | 'selected'> {
    row: Row<T>;
    viewIndex: number;

    onClick?(row: Row<T>): void;
}

export function TableRow<T extends object>({
    error, row, striped, viewIndex, onClick, sticky,
}: TableRowProps<T>): ReactElement {
    return (
        <StyledTableRow
            clickable={!!onClick}
            data-testid={`table-row-${row.index}`}
            error={error}
            selected={row.isSelected}
            striped={striped}
            onClick={() => onClick && onClick(row)}
            data-clickable={!!onClick}
            data-error={error}
            {...row.getRowProps() /* eslint-disable-line react/jsx-props-no-spreading */}
            {...(onClick ? { tabIndex: 0, role: 'button' } : {}) /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {row.cells.map((cell) => {
                const style: CSSProperties = { textAlign: cell.column.textAlign };
                const isSticky = sticky || cell.column.sticky;
                return (
                    <StyledCell
                        style={style}
                        sticky={isSticky}
                        className={cell.column.className}
                        {...{ /* eslint-disable-line react/jsx-props-no-spreading */
                            ...cell.getCellProps(),
                            key: `${cell.column.id}-${cell.row.id}`,
                        }}
                    >
                        {cell.render('Cell', { viewIndex })}
                    </StyledCell>
                );
            })}
        </StyledTableRow>
    );
}
