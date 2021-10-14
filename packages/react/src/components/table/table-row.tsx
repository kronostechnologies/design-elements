import React, { CSSProperties, ReactElement } from 'react';
import { Row } from 'react-table';
import styled, { css } from 'styled-components';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';

interface StyledTableRowProps {
    clickable: boolean;
    error: boolean;
    selected: boolean;
    striped?: boolean;
}

const StyledTableRow = styled.tr<StyledTableRowProps & { theme: Theme }>`
    border-top: 1px solid ${({ theme }) => theme.greys.grey};
    ${({ error, striped, theme }) => striped && !error && css`
        :nth-child(odd) {
            background-color: ${theme.greys['colored-white']};
        }
    `}

    ${(props) => focus(props, undefined, undefined, true)}

    ${({ clickable, theme }) => clickable && css`
        :hover {
            background-color: ${theme.greys.grey};
            cursor: pointer;
        }
    `}

    ${({ selected }) => selected && css`
        /* TODO fix with next thematization */
        background-color: #e0f0f9;
    `}

    ${({ error, theme }) => error && css`
        /* TODO fix with next thematization theme.notifications.error4 */
        background-color: #fcf8f9;
        border: 1px solid ${theme.notifications['alert-2.1']};
    `}
`;

interface TableRowProps<T extends object> extends Omit<StyledTableRowProps, 'clickable' | 'selected'> {
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
            data-testid={`table-row-${row.index}`}
            error={error}
            selected={row.isSelected}
            striped={striped}
            onClick={() => onClick && onClick(row)}
            {...row.getRowProps() /* eslint-disable-line react/jsx-props-no-spreading */}
            {...(onClick ? { tabIndex: 0, role: 'button' } : {}) /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {row.cells.map((cell) => {
                const style: CSSProperties = { textAlign: cell.column.textAlign };
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
