import React, { ReactElement, useEffect, useState } from 'react';
import { Column, Row, useSortBy, useTable } from 'react-table';
import styled from 'styled-components';
import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Theme as ThemeProps } from '../theme-wrapper/theme-wrapper';
import { SortableColumnHeading } from './sortable-column-heading';
import { TableRow } from './table-row';

const StyledTable = styled.table<StyledTableProps>`
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;

    th {
        font-weight: var(--font-semi-bold);
        padding: ${({ device, rowSize }) => getThPadding(device, rowSize)};
    }

    td {
        padding: ${({ device, rowSize }) => getTdPadding(device, rowSize)};
    }

    th,
    td {
        font-size: ${({ device }) => device === 'desktop' ? 0.875 : 1}rem;
        line-height: 24px;
        margin: 0;
        text-align: left;

        :last-child {
            border-right: 0;
        }
    }

    .eq-table__number-column {
        box-sizing: border-box;
        color: ${({ theme }) => theme.greys['dark-grey']};
        font-size: 0.75rem;
        min-width: 40px;
        text-align: center;
        width: 40px;
    }
`;

type RowSize = 'small' | 'medium';

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
    rowSize?: RowSize;
}

interface CustomRowProps {
    error?: boolean;
}

export interface RowProps extends Row {
    original: any;
}

export interface TableProps<T> {
    /** Array of Objects that defines your table columns.
     * See stories code or refer to react-table docs for more information */
    columns: ColumnsProps;
    /** Array of Objects that defines your table data.
     * See stories code or refer to react-table docs for more information */
    data: T[] & CustomRowProps[];
    /**
     * Adds row numbers
     * @default false
     **/
    rowNumbers?: boolean;
    /**
     * Sets table rows type
     * @default medium
     **/
    rowSize?: RowSize;
    /**
     * Adds striped rows
     * @default false
     **/
    striped?: boolean;

    onRowClick?(row: RowProps): void;
}

export function Table<T>({
    columns,
    data,
    rowNumbers = false,
    rowSize = 'medium',
    striped = false,
    onRowClick,
}: TableProps<T>): ReactElement {
    const { device } = useDeviceContext();
    const [renderedColumns, setRenderedColumns] = useState<ColumnsProps>(() => getRenderedColumns(rowNumbers, columns));

    useEffect(() => {
        setRenderedColumns(getRenderedColumns(rowNumbers, columns));
    }, [columns, rowNumbers]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns: renderedColumns, data }, useSortBy);

    return (
        <StyledTable
            rowSize={rowSize}
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
            {rows.map((row, i) => {
                prepareRow(row);
                return <TableRow
                    striped={striped}
                    error={!!(row.original as CustomRowProps).error}
                    key={row.id}
                    row={row}
                    onClick={onRowClick}
                    viewIndex={i}
                />;
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

function getThPadding(device: DeviceType, rowSize?: RowSize): string {
    if (rowSize === 'small') {
        switch (device) {
            case 'desktop':
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

function getTdPadding(device: DeviceType, rowSize?: RowSize): string {
    if (rowSize === 'small') {
        switch (device) {
            case 'desktop':
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

function getRenderedColumns(rowNumbers: boolean, columns: ColumnsProps): ColumnsProps {
    if (rowNumbers) {
        return [
            {
                Header: '',
                accessor: 'eq-table__number-column',
                className: 'eq-table__number-column',
                Cell: ({ viewIndex }) => {
                    return <>{viewIndex + 1}</>;
                },
            },
            ...columns,
        ];
    } else {
        return columns;
    }
}
