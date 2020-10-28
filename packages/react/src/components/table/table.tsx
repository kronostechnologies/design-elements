import { focus } from '@design-elements/utils/css-state';
import React, { ReactElement } from 'react';
import { Column, Row, useSortBy, useTable } from 'react-table';
import styled, { css } from 'styled-components';
import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Theme as ThemeProps } from '../theme-wrapper/theme-wrapper';
import { SortableColumnHeading } from './sortable-column-heading';
import { TableRow } from './table-row';

const StyledTable = styled.table<StyledTableProps>`
    border-spacing: 0;
    width: 100%;

    th {
        font-weight: var(--font-semi-bold);
        padding: ${({ device, rowType }) => getThPadding(device, rowType)};
    }

    td {
        padding: ${({ device, rowType }) => getTdPadding(device, rowType)};
    }

    th,
    td {
        border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
        font-size: ${({ device }) => device === 'desktop' ? 0.875 : 1}rem;
        line-height: 24px;
        margin: 0;
        text-align: left;

        :last-child {
            border-right: 0;
        }
    }

    tbody tr {
        ${({ clickableRows, theme }) => clickableRows && css`
          ${focus({ theme })}
          :hover {
              background-color: ${theme.greys.grey};
              cursor: pointer;
          }
        `}

        ${({ striped, theme }) => striped && css`
          :nth-child(odd) {
              background-color: ${theme.greys['colored-white']};
          }
        `}
    }

    tr:last-child td {
        border-bottom: 0;
    }

    .number-column {
        box-sizing: border-box;
        color: ${({ theme }) => theme.greys['dark-grey']};
        font-size: 0.75rem;
        text-align: center;
        width: 40px;
    }
`;

type RowType = 'small' | 'normal' | undefined;

type CustomColumn = Column & {
    sortable?: boolean,
    textAlign?: string,
};

export type ColumnsProps = CustomColumn[];

interface StyledTableProps {
    clickableRows: boolean;
    device: DeviceType;
    striped: boolean;
    theme: ThemeProps;
    rowType: RowType;
}

export interface RowProps extends Row {
    original: any;
}

interface TableProps<T> {
    /** Array of Objects that defines your table columns.
     * See stories code or refer to react-table docs for more information */
    columns: ColumnsProps;
    /** Array of Objects that defines your table data.
     * See stories code or refer to react-table docs for more information */
    data: T[];
    /**
     * Adds row numbers
     * @default false
     **/
    rowNumbers?: boolean;
    /**
     * Adds striped rows
     * @default false
     **/
    striped?: boolean;
    /**
     * Sets table type
     * @default false
     **/
    rowType?: RowType;

    onRowClick?(row: RowProps): void;
}

export function Table<T>({
    columns,
    data,
    rowNumbers = false,
    striped = false,
    rowType,
    onRowClick,
}: TableProps<T>): ReactElement {
    const { device } = useDeviceContext();

    if (rowNumbers) {
        columns.unshift({
            Header: '',
            id: 'number-column',
            className: 'number-column',
            Cell: (row) => <>{row.row.index + 1}</>,
        });
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return (
        <StyledTable
            rowType={rowType}
            striped={striped}
            device={device}
            clickableRows={onRowClick !== undefined}
            {...getTableProps()}
        >
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(getHeading)}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row);
                return <TableRow key={row.id} row={row} onClick={onRowClick} />;
            })}
            </tbody>
        </StyledTable>
    );
}

function getHeading(column: Column): ReactElement {
    if (column.sortable) {
        return <SortableColumnHeading key={column.id} column={column} />;
    } else {
        return (
            <th
                scope="col"
                style={{ textAlign: column.textAlign }}
                className={column.className}
                {...column.getHeaderProps()}
            >
                {column.render('Header')}
            </th>
        );
    }
}

function getThPadding(device: DeviceType, rowType: RowType): string {
    if (rowType === 'small') {
        switch (device) {
            case 'desktop':
                return 'var(--spacing-half) var(--spacing-1x)';
            case 'tablet':
                return 'var(--spacing-half) var(--spacing-1x)';
            case 'mobile':
                return 'var(--spacing-1x)';
        }
    }
    switch (device) {
        case 'desktop':
            return 'var(--spacing-1x) var(--spacing-2x)';
        case 'tablet':
            return 'var(--spacing-2x) var(--spacing-1x)';
        case 'mobile':
            return 'var(--spacing-2x) 0';
    }
}

function getTdPadding(device: DeviceType, rowType: RowType): string {
    if (rowType === 'small') {
        switch (device) {
            case 'desktop':
                return 'var(--spacing-1x)';
            case 'tablet':
                return 'var(--spacing-1x)';
            case 'mobile':
                return 'var(--spacing-2x) var(--spacing-1x)';
        }
    }
    switch (device) {
        case 'desktop':
            return 'var(--spacing-2x)';
        case 'tablet':
            return 'var(--spacing-3x) var(--spacing-1x)';
        case 'mobile':
            return 'var(--spacing-3x) 0';
    }
}
