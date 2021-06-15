import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import {
    CellProps,
    Column,
    Row,
    TableState,
    useRowSelect,
    UseRowSelectRowProps,
    useSortBy,
    UseSortByColumnOptions,
    useTable,
    Hooks,
} from 'react-table';
import styled from 'styled-components';
import { Theme } from '../../themes';
import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { SortableColumnHeading } from './sortable-column-heading';
import { TableRow } from './table-row';
import { Checkbox } from '../checkbox/checkbox';

type RowSize = 'small' | 'medium';

type ColumnSort = 'asc' | 'desc';

interface StyledTableProps {
    clickableRows: boolean;
    device: DeviceType;
    striped: boolean;
    theme: Theme;
    rowSize?: RowSize;
}

type CustomColumn<T extends object> = Column<T> & UseSortByColumnOptions<T> & {
    defaultSort?: ColumnSort;
    sortable?: boolean,
    textAlign?: string,
    className?: string,
};

export type TableColumn<T extends object> = CustomColumn<T>[];
export type TableRow<T> = T & { error?: boolean };

interface CustomRowProps {
    error?: boolean;
}

const utilColumnClassName = 'eq-table__util-column';

function getHeading(column: Column): ReactElement {
    if (column.sortable) {
        return <SortableColumnHeading key={column.id} column={column} />;
    }
    return (
        <th
            scope="col"
            style={{ textAlign: column.textAlign }}
            className={column.className}
            {...column.getHeaderProps() /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {column.render('Header')}
        </th>
    );
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

function getRenderedColumns<T extends object>(rowNumbers: boolean, columns: TableColumn<T>): TableColumn<T> {
    if (rowNumbers) {
        // Cast because we don't really need the accessor here
        const accessor = utilColumnClassName as unknown as keyof T;
        return [
            {
                Header: '',
                accessor,
                className: utilColumnClassName,
                Cell: ({ viewIndex }: CellProps<T, unknown>) => <>{viewIndex + 1}</>,
            },
            ...columns,
        ];
    }
    return columns;
}

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
        font-size: ${({ device }) => (device === 'desktop' ? 0.875 : 1)}rem;
        line-height: 24px;
        margin: 0;
        text-align: left;

        :last-child {
            border-right: 0;
        }
    }

    .${utilColumnClassName} {
        box-sizing: border-box;
        color: ${({ theme }) => theme.greys['dark-grey']};
        font-size: 0.75rem;
        min-width: 40px;
        text-align: center;
        width: 40px;
    }
`;

function useSelectableRows<T extends object>(selectableRows?: boolean): (hooks: Hooks<T>) => void {
    return (hooks) => {
        if (selectableRows) {
            hooks.visibleColumns.push((columnsArray) => [
                {
                    id: 'selection',
                    className: utilColumnClassName,
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        /* eslint-disable-next-line react/jsx-props-no-spreading */
                        <Checkbox data-testid="row-checkbox-all" {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }: { row: Row & UseRowSelectRowProps<T> }) => (
                        /* eslint-disable-next-line react/jsx-props-no-spreading */
                        <Checkbox data-testid={`row-checkbox-${row.index}`} {...row.getToggleRowSelectedProps()} />
                    ),
                },
                ...columnsArray,
            ]);
        }
    };
}

type PartialTableState<T extends object> = Omit<TableState<T>, 'selectedRowIds'>;

export interface TableProps<T extends object> {
    className?: string;
    /** Array of Objects that defines your table columns.
     * See stories code or refer to react-table docs for more information */
    columns: TableColumn<T>;
    /** Array of Objects that defines your table data.
     * See stories code or refer to react-table docs for more information */
    data: T[] & CustomRowProps[];
    /**
     * Adds row numbers
     * @default false
     */
    rowNumbers?: boolean;
    /**
     * Sets table rows type
     * @default medium
     */
    rowSize?: RowSize;
    selectableRows?: boolean;
    /**
     * Adds striped rows
     * @default false
     */
    striped?: boolean;

    onRowClick?(row: Row<T>): void;

    onSelectedRowsChange?(selectedRows: T[]): void;
}

export function Table<T extends object>({
    className,
    columns,
    data,
    rowNumbers = false,
    rowSize = 'medium',
    selectableRows,
    striped = false,
    onRowClick,
    onSelectedRowsChange,
}: TableProps<T>): ReactElement {
    const { device } = useDeviceContext();
    const [renderedColumns, setRenderedColumns] = useState<TableColumn<T>>(
        () => getRenderedColumns(rowNumbers, columns),
    );

    useEffect(() => {
        setRenderedColumns(getRenderedColumns(rowNumbers, columns));
    }, [columns, rowNumbers]);

    const getInitialState = useCallback((): PartialTableState<T> | undefined => {
        const defaultSortColumn = columns.find(({ defaultSort }) => !!defaultSort);

        if (defaultSortColumn) {
            const { id, accessor, defaultSort } = defaultSortColumn;

            return {
                sortBy: [{
                    id: id || accessor as string,
                    desc: defaultSort === 'desc',
                }],
            };
        }
        return undefined;
    }, [columns]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
    } = useTable<T>(
        {
            columns: renderedColumns,
            data,
            initialState: getInitialState(),
            disableMultiSort: true,
        },
        useSortBy,
        useRowSelect,
        useSelectableRows(selectableRows),
    );

    useEffect(() => {
        if (selectableRows) {
            onSelectedRowsChange?.(selectedFlatRows.map((row) => row.original));
        }
    }, [selectableRows, selectedFlatRows, onSelectedRowsChange]);

    return (
        <StyledTable
            className={className}
            rowSize={rowSize}
            striped={striped}
            device={device}
            clickableRows={onRowClick !== undefined}
            {...getTableProps() /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps() /* eslint-disable-line react/jsx-props-no-spreading */}>
                        {headerGroup.headers.map(getHeading)}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps() /* eslint-disable-line react/jsx-props-no-spreading */}>
                {rows.map((row: Row<T>, i: number) => {
                    prepareRow(row);
                    return (
                        <TableRow<T>
                            striped={striped}
                            error={!!(row.original as CustomRowProps).error}
                            key={row.id}
                            row={row}
                            onClick={onRowClick}
                            viewIndex={i}
                        />
                    );
                })}
            </tbody>
        </StyledTable>
    );
}
