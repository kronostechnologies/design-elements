import React, { ReactElement, useCallback, useEffect, useState, useRef } from 'react';
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
import styled, { css } from 'styled-components';
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
    sticky?: boolean,
};

export type TableColumn<T extends object> = CustomColumn<T>[];
export type TableRow<T> = T & { error?: boolean };

interface CustomRowProps {
    error?: boolean;
    sticky?: boolean,
}

const utilColumnClassName = 'eq-table__util-column';

const StyledHeader = styled.th<{ sticky: boolean }>`
    ${({ sticky }) => sticky && css`   
        position: sticky;
        background-color: ${({ theme }) => theme.greys.white};
    `}
`;

function getHeading(column: Column, stickyHeader?: boolean): ReactElement {
    if (column.sortable) {
        return <SortableColumnHeading key={column.id} column={column} />;
    }
    return (
        <StyledHeader
            className={column.className}
            scope="col"
            style={{ textAlign: column.textAlign }}
            sticky={stickyHeader}
            {...column.getHeaderProps() /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {column.render('Header')}
        </StyledHeader>
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

const StyledTable = styled.table<StyledTableProps & { theme: Theme }>`
    background-color: ${({ theme }) => theme.greys.white};
    border-collapse: separate;
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
        border: none;
    }

    .${utilColumnClassName} {
        box-sizing: border-box;
        color: ${({ theme }) => theme.greys['dark-grey']};
        font-size: 0.75rem;
        min-width: 40px;
        text-align: center;
        width: 40px;
    }
    
    /** Rows borders **/
    
    tr:first-child[data-error=false] td, tr[data-error=false]:not(:focus) + tr td {
        border-top: 1px solid ${({ theme }) => theme.greys.grey};
    }
    
    // Error rows
    tr:first-child[data-error=true] td, tr[data-error=false] + tr[data-error=true] td {
        border-top: 1px solid ${({ theme }) => theme.notifications['error-2.1']};
    }
    
    tr[data-error=true] td {
        border-bottom: 1px solid ${({ theme }) => theme.notifications['error-2.1']};
        
        :first-child {
            border-left: 1px solid ${({ theme }) => theme.notifications['error-2.1']};
        }
        :last-child {
            border-right: 1px solid ${({ theme }) => theme.notifications['error-2.1']};
        }
    }
    
    // Focus rows
    tr:first-child[data-clickable=true]:focus td, tr:not(:focus) + tr[data-clickable=true]:focus td {
        border-top: 1px solid ${({ theme }) => theme.tokens['focus-border']};
    }
    
    tr[data-clickable=true]:focus td {
        border-bottom: 1px solid ${({ theme }) => theme.tokens['focus-border']};
        
        :first-child {
            border-left: 1px solid ${({ theme }) => theme.tokens['focus-border']};
        }
        :last-child {
            border-right: 1px solid ${({ theme }) => theme.tokens['focus-border']};
        }
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

export interface TableProps<T extends CustomRowProps> {
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

    stickyHeader?: boolean;

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
    stickyHeader = false,
}: TableProps<T>): ReactElement {
    const tableRef = useRef<HTMLTableElement>(null);
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

    useEffect(() => {
        if (tableRef.current === null) {
            return;
        }
        const headerCells = tableRef.current.getElementsByTagName('th');
        const rows = tableRef.current.getElementsByTagName('tr');

        // sticky column
        let totalLeft = 0;
        renderedColumns.forEach((column, index) => {
            if (column.sticky) {
                const headerCell = headerCells[index];
                headerCell.style.setProperty('left', `${totalLeft}px`);
                headerCell.style.setProperty('z-index', '2');

                Array.from(rows).forEach((row) => {
                    row.cells[index].style.setProperty('left', `${totalLeft}px`);
                    headerCell.style.setProperty('z-index', '2');
                });

                totalLeft += headerCell.clientWidth;
            }
        });

        // sticky row
        let totalTop = 0;
        if (stickyHeader) {
            Array.from(headerCells).forEach((headerCell, index) => {
                headerCell.style.setProperty('top', '0');
                headerCell.style.setProperty('z-index', renderedColumns[index].sticky ? '3' : '2');
            });
            const headerRow = rows[0];
            totalTop = headerRow.clientHeight;
        }
        data.forEach((dataRow, index) => {
            if ((dataRow as CustomRowProps).sticky) {
                const row = rows[index + 1];
                Array.from(row.cells).forEach((cell, cellIndex) => {
                    cell.style.setProperty('top', `${totalTop}px`);
                    cell.style.setProperty('z-index', renderedColumns[cellIndex].sticky ? '3' : '2');
                });
                totalTop += row.clientHeight;
            }
        });
    }, [renderedColumns, data, stickyHeader, tableRef]);

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
            ref={tableRef}
        >
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps() /* eslint-disable-line react/jsx-props-no-spreading */}>
                        {headerGroup.headers.map((column) => getHeading(column, stickyHeader))}
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
                            sticky={!!(row.original as CustomRowProps).sticky}
                        />
                    );
                })}
            </tbody>
        </StyledTable>
    );
}
