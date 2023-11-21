import { CSSProperties, ReactElement } from 'react';
import { Row } from 'react-table';
import styled, { css, FlattenInterpolation, ThemedStyledProps, ThemeProps } from 'styled-components';
import { Theme } from '../../themes';

interface StyledTableRowProps {
    clickable: boolean;
    error: boolean;
    selected: boolean;
    striped?: boolean;
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
            /* TODO fix with next thematization theme.colors.error4 */
            background-color: #fcf8f9;
        `;
    }
    return css`
        background-color: ${theme.ref['color-white']};
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
            background-color: ${theme.ref['color-neutral-15']};
        }

        :not(:hover) td {
            background-color: inherit;
        }
    `;
}

const StyledTableRow = styled.tr<StyledTableRowProps & { theme: Theme }>`
    border-top: 1px solid ${({ theme }) => theme.ref['color-neutral-15']};
    ${({ error, striped, theme }) => striped && !error && css`
        :nth-child(odd) {
            background-color: ${theme.ref['color-neutral-02']};
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
            box-shadow: inset 0 0 0 1px ${theme.ref['color-alert-50']};
            content: '';
            height: calc(100% + 1px);
            left: 0;
            outline: none;
            position: absolute;
            width: 100%;
            z-index: 3;
        }

        td:first-child::after {
            border-left: 1px solid ${theme.ref['color-alert-50']};
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

export const TableRow = <T extends object>({
    error,
    onClick,
    row,
    striped,
    viewIndex,
}: TableRowProps<T>): ReactElement => { // eslint-disable-line arrow-body-style
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
                    <StyledCell
                        style={style}
                        sticky={cell.column.sticky}
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
};
