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
    getExpandedRowModel,
    ExpandedState,
    TableOptions,
    RowSelectionState,
} from '@tanstack/react-table';
import { IconButton } from '../buttons/icon-button';
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
        width: 1px;
    }
`;

const RowNumber = styled.span`
    box-sizing: border-box;
    color: ${({ theme }) => theme.greys['dark-grey']};
    font-size: 0.75rem;
    margin-left: 50%;
    min-width: var(--size-2halfx);
    transform: translateX(-50%);
    width: var(--size-2halfx);
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

const StyledSubRowCell = styled.td`
    border-top: 1px solid ${({ theme }) => theme.greys.grey};
`;

function getUtilityColumn<T extends object>(type: string): CustomColumnDef<T> {
    return {
        id: type,
        className: utilColumnClassName,
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
                    <RowNumber>{row.index + 1}</RowNumber>
                );
            }

            if (type === 'expand' && row.getCanExpand()) {
                return row.getIsExpanded()
                    ? (
                        <IconButton
                            buttonType='tertiary'
                            iconName='caretDown'
                            onClick={row.getToggleExpandedHandler()}
                        />
                    ) : (
                        <IconButton
                            buttonType='tertiary'
                            iconName='caretRight'
                            onClick={row.getToggleExpandedHandler()}
                        />
                    );
            }

            return null;
        },
    };
}

export interface TableProps<T extends object> {
    data: T[];
    defaultSort?: ColumnSort;
    columns: CustomColumnDef<T>[];
    expandableRows?: boolean;
    renderExpandedRow?: (props: { row: Row<T> }) => React.ReactNode;
    rowCanExpand?: (row: Row<T>) => boolean;
    singleExpand?: boolean;
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
    columns: providedColumns,
    expandableRows,
    renderExpandedRow,
    rowCanExpand,
    singleExpand,
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
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [expanded, setExpanded] = useState<ExpandedState>({});

    // Add utility columns for row numbers and row selection
    const columns = useMemo(() => {
        const cols = [...providedColumns];

        if (selectableRows) {
            cols.unshift(getUtilityColumn<T>('selection'));
        } else if (expandableRows) {
            cols.unshift(getUtilityColumn<T>('expand'));
        } else if (rowNumbers) {
            cols.unshift(getUtilityColumn<T>('numbers'));
        }

        return cols;
    }, [selectableRows, expandableRows, rowNumbers, providedColumns]);

    const tableOptions: TableOptions<T> = {
        data,
        columns,
        state: {
            sorting,
            rowSelection,
            expanded,
        },
        enableMultiSort: false,
        manualSorting: manualSort,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: expandableRows ? (rowCanExpand ?? (() => true)) : undefined,
        onSortingChange: (updater: Updater<SortingState>) => {
            const newValue = functionalUpdate(updater, sorting);
            setSorting(newValue);
            onSort?.(newValue[0] ?? null);
        },
        onExpandedChange: (updater: Updater<ExpandedState>) => {
            let newValue = functionalUpdate(updater, expanded);

            // Hackish because onExpandedChange doesn't provide the currently expanded/collapsed row
            if (singleExpand && Object.keys(newValue).length > 1) {
                newValue = functionalUpdate(updater, {});
            }

            setExpanded(newValue);
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
                    <>
                        <TableRow<T>
                            striped={striped}
                            error={!!(row.original as CustomRowProps).error}
                            row={row}
                            onClick={onRowClick}
                        />
                        {row.getIsExpanded() && (
                            <tr>
                                <td />
                                <StyledSubRowCell colSpan={999}>
                                    {renderExpandedRow?.({ row })}
                                </StyledSubRowCell>
                            </tr>
                        )}
                    </>
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
