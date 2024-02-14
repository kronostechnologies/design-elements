import { ReactElement, useRef, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import {
    HeaderContext,
    Row,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    ColumnSort,
    Updater,
    functionalUpdate,
} from '@tanstack/react-table';
import { TableRow } from './table-row';
import { TableHeader } from './table-header';
import { TableFooter } from './table-footer';
import { Checkbox } from '../checkbox/checkbox';
import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { CustomColumnDef } from './types';

type RowSize = 'small' | 'medium';

export type TableColumn<T extends object> = CustomColumnDef<T>[];
export type TableRow<T> = T & { error?: boolean };

interface CustomRowProps {
    error?: boolean;
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

const utilColumnClassName = 'eq-table__util-column';

function getCustomColumn<T extends object>(type: string): CustomColumnDef<T> {
    return {
        id: type,
        header(props: HeaderContext<T, unknown>) {
            if (type === 'selection') {
                const { table } = props;
                return (
                    <Checkbox
                        data-testid="row-checkbox-all"
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={table.getIsSomeRowsSelected()}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                    />
                );
            }
            // For 'numbers' type or any other type, return null or an empty header
            return null;
        },
        cell({ row }) {
            if (type === 'selection') {
                return (
                    <Checkbox
                        data-testid={`row-checkbox-${row.index}`}
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        indeterminate={row.getIsSomeSelected()}
                        onChange={row.getToggleSelectedHandler()}
                    />
                );
            }

            if (type === 'numbers') {
                return (
                    <span className={utilColumnClassName}>
                        {row.index + 1}
                    </span>
                );
            }

            return null;
        },
    };
}

interface StyledTableProps {
    $clickableRows: boolean;
    $device: DeviceType;
    $striped: boolean;
    $rowSize?: RowSize;
}

const StyledTable = styled.table<StyledTableProps>`
    background: ${({ theme }) => theme.greys.white};
    border-collapse: collapse;
    color: ${({ theme }) => theme.greys['neutral-90']};
    width: 100%;

    th {
        font-weight: var(--font-semi-bold);
        padding: ${({ $device, $rowSize }) => getThPadding($device, $rowSize)};
    }

    td {
        padding: ${({ $device, $rowSize }) => getTdPadding($device, $rowSize)};
    }

    th,
    td {
        font-size: ${({ $device }) => ($device === 'desktop' ? 0.875 : 1)}rem;
        line-height: 1.5rem;
        margin: 0;
        text-align: left;

        &:last-child {
            border-right: 0;
        }
    }

    .${utilColumnClassName} {
        box-sizing: border-box;
        color: ${({ theme }) => theme.greys['dark-grey']};
        font-size: 0.75rem;
        margin-left: 50%;
        min-width: var(--size-2halfx);
        transform: translateX(-50%);
        width: var(--size-2halfx);
    }
`;

const StyledTHead = styled.thead`
    background: inherit;
`;

const StyledTBody = styled.tbody`
    background: inherit;
`;

const StyledTFoot = styled.tfoot`
    background: inherit;
`;

export interface TableProps<T extends object> {
    data: T[];
    defaultSort?: ColumnSort;
    columns: CustomColumnDef<T>[];
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
    className?: string;
    stickyHeader?: boolean;
    stickyFooter?: boolean;
    manualSort?: boolean;
    onRowClick?(row: Row<T>): void;
    onSelectedRowsChange?(selectedRows: T[]): void;
    onSort?(sort: ColumnSort | null): void;
}

export const Table = <T extends object>({
    className,
    data,
    defaultSort,
    columns: defaultColumns,
    stickyHeader = false,
    stickyFooter = false,
    rowNumbers = false,
    rowSize = 'medium',
    selectableRows,
    striped = false,
    manualSort = false,
    onRowClick,
    onSelectedRowsChange,
    onSort,
}: TableProps<T>): ReactElement => {
    const tableRef = useRef<HTMLTableElement>(null);
    const { device } = useDeviceContext();
    const [sorting, setSorting] = useState<SortingState>(defaultSort ? [defaultSort] : []);
    const [rowSelection, setRowSelection] = useState({});

    // Add custom columns for row numbers and row selection
    const columns = useMemo(() => {
        const cols = [...defaultColumns];
        if (selectableRows) {
            cols.unshift(getCustomColumn<T>('selection'));
        } else if (rowNumbers) {
            cols.unshift(getCustomColumn<T>('numbers'));
        }
        return cols;
    }, [selectableRows, rowNumbers, defaultColumns]);

    const tableOptions = {
        data,
        columns,
        state: {
            sorting,
            rowSelection,
        },
        enableMultiSort: false,
        manualSorting: manualSort,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: (updater: Updater<SortingState>) => {
            const newValue = functionalUpdate(updater, sorting);
            setSorting(newValue);
            onSort?.(newValue[0] ?? null);
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
    };

    const table = useReactTable(tableOptions);
    const hasFooter = columns.some((column) => 'footer' in column);
    const currentRowSelection = table.getState().rowSelection;

    useEffect(() => {
        if (selectableRows && onSelectedRowsChange) {
            const selectedRowIds = currentRowSelection;
            const selectedIndexes = Object.keys(selectedRowIds).filter((index) => selectedRowIds[index]);
            const selectedRows = selectedIndexes.map((index) => data[parseInt(index, 10)]);

            onSelectedRowsChange(selectedRows);
        }
    }, [selectableRows, currentRowSelection, onSelectedRowsChange, data]);

    return (
        <StyledTable
            className={className}
            $rowSize={rowSize}
            $striped={striped}
            $device={device}
            $clickableRows={onRowClick !== undefined}
            ref={tableRef}
        >
            <StyledTHead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableHeader<T>
                        headerGroup={headerGroup}
                        sticky={stickyHeader}
                    />
                ))}
            </StyledTHead>
            <StyledTBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow<T>
                        striped={striped}
                        error={!!(row.original as CustomRowProps).error}
                        row={row}
                        onClick={onRowClick}
                    />
                ))}
            </StyledTBody>
            {hasFooter && (
                <StyledTFoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <TableFooter<T>
                            footerGroup={footerGroup}
                            sticky={stickyFooter}
                        />
                    ))}
                </StyledTFoot>
            )}
        </StyledTable>
    );
};
