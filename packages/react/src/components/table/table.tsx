import { ReactElement, useRef, useState, useMemo, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import {
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
import { TFunction } from 'i18next';
import { useTranslation } from '../../i18n/use-translation';
import { IconButton } from '../buttons/icon-button';
import { StyledTableRow, TableRow } from './table-row';
import { TableHeader } from './table-header';
import { TableFooter } from './table-footer';
import { Checkbox } from '../checkbox/checkbox';
import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { TableData, TableColumn } from './types';

type RowSize = 'small' | 'medium' | 'large';

type UtilityColumnType = 'selection' | 'numbers' | 'expand';

function getThPadding(device: DeviceType, rowSize?: RowSize): string {
    switch (rowSize) {
        case 'small':
            switch (device) {
                case 'desktop':
                    return 'var(--spacing-half) var(--spacing-2x)';
                case 'tablet':
                    return 'var(--spacing-1x)';
                case 'mobile':
                    return 'var(--spacing-2x) var(--spacing-1x)';
            }
            break;
        case 'large':
            switch (device) {
                case 'desktop':
                    return 'var(--spacing-2x) var(--spacing-2x)';
                case 'tablet':
                    return 'var(--spacing-3x) var(--spacing-2x)';
                case 'mobile':
                    return 'var(--spacing-3x) var(--spacing-1x)';
            }
            break;
        default:
            switch (device) {
                case 'desktop':
                    return 'var(--spacing-1x) var(--spacing-2x)';
                case 'tablet':
                    return 'var(--spacing-3x) var(--spacing-1x)';
                case 'mobile':
                    return 'var(--spacing-3x) 0';
            }
    }
}

function getTdPadding(device: DeviceType, rowSize?: RowSize): string {
    switch (rowSize) {
        case 'small':
            switch (device) {
                case 'desktop':
                    return 'var(--spacing-half) var(--spacing-2x)';
                case 'tablet':
                    return 'var(--spacing-1x)';
                case 'mobile':
                    return 'var(--spacing-2x) var(--spacing-1x)';
            }
            break;
        case 'large':
            switch (device) {
                case 'desktop':
                    return 'var(--spacing-2x) var(--spacing-2x)';
                case 'tablet':
                    return 'var(--spacing-3x) var(--spacing-2x)';
                case 'mobile':
                    return 'var(--spacing-3x) var(--spacing-1x)';
            }
            break;
        default:
            switch (device) {
                case 'desktop':
                    return 'var(--spacing-1x) var(--spacing-2x)';
                case 'tablet':
                    return 'var(--spacing-3x) var(--spacing-1x)';
                case 'mobile':
                    return 'var(--spacing-3x) 0';
            }
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
    background: ${({ theme }) => theme.component['table-background-color']};
    border-collapse: collapse;
    color: ${({ theme }) => theme.component['table-text-color']};
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
    color: ${({ theme }) => theme.component['table-cell-number-text-color']};
    font-size: 0.75rem;
    margin-left: 50%;
    min-width: var(--size-2halfx);
    transform: translateX(-50%);
    width: var(--size-2halfx);
`;

const StyledTHead = styled.thead`
    background: ${({ theme }) => theme.component['table-header-background-color']};
`;

const StyledTBody = styled.tbody`
    background: ${({ theme }) => theme.component['table-body-background-color']};
`;

const StyledTFoot = styled.tfoot`
    background: ${({ theme }) => theme.component['table-footer-background-color']};
`;

const ExpandButton = styled(IconButton) <{ $expanded: boolean }>`
    transform: rotate(${({ $expanded }) => ($expanded ? 90 : 0)}deg);
    transition: transform 0.2s ease-in-out;

    &[aria-expanded='true'] {
        background-color: transparent;
    }
`;

function getUtilityColumn<T extends object>(type: UtilityColumnType, t: TFunction<'translation'>): TableColumn<T> {
    const column: TableColumn<T> = {
        id: type,
        className: utilColumnClassName,
    };

    switch (type) {
        case 'selection':
            column.header = ({ table }) => (
                <Checkbox
                    data-testid="row-checkbox-all"
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            );
            column.cell = ({ row }) => (
                <Checkbox
                    data-testid={`row-checkbox-${row.index}`}
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    indeterminate={row.getIsSomeSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            );
            break;

        case 'numbers':
            column.cell = ({ row }) => <RowNumber>{row.index + 1}</RowNumber>;
            break;

        case 'expand':
            column.cell = ({ row }) => {
                const isExpanded = row.getIsExpanded();
                if (!row.getCanExpand()) {
                    return null;
                }
                return (
                    <ExpandButton
                        type="button"
                        buttonType="tertiary"
                        iconName="caretRight"
                        onClick={row.getToggleExpandedHandler()}
                        aria-expanded={isExpanded}
                        $expanded={isExpanded}
                        aria-label={
                            row.subRows.length > 0
                                ? t('subrowsAriaLabel', { count: row.subRows.length })
                                : undefined
                        }
                    />
                );
            };
            break;
    }

    return column;
}

export interface TableProps<T extends object> {
    data: T[];
    defaultSort?: ColumnSort;
    columns: TableColumn<T>[];
    expandableRows?: 'single' | 'multiple';
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
    const { t } = useTranslation('table');
    const tableRef = useRef<HTMLTableElement>(null);
    const { device } = useDeviceContext();
    const [sorting, setSorting] = useState<SortingState>(defaultSort ? [defaultSort] : []);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [expanded, setExpanded] = useState<ExpandedState>({});

    // Add utility columns for row numbers and row selection
    const columns = useMemo(() => {
        const cols = [...providedColumns];

        if (selectableRows) {
            cols.unshift(getUtilityColumn<T>('selection', t));
        } else if (expandableRows) {
            cols.unshift(getUtilityColumn<T>('expand', t));
        } else if (rowNumbers) {
            cols.unshift(getUtilityColumn<T>('numbers', t));
        }

        return cols;
    }, [selectableRows, expandableRows, rowNumbers, providedColumns, t]);

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getSubRows: ((row) => (row as any).subRows),
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand:
            expandableRows
                ? ((row) => row.subRows.length > 0 || !!(row.original as TableData<T>).subContent)
                : undefined,
        onSortingChange: (updater: Updater<SortingState>) => {
            const newValue = functionalUpdate(updater, sorting);
            setSorting(newValue);
            onSort?.(newValue[0] ?? null);
        },
        onExpandedChange: (updater: Updater<ExpandedState>) => {
            let newValue = functionalUpdate(updater, expanded);

            // Hackish because onExpandedChange doesn't provide the currently expanded/collapsed row
            if (expandableRows === 'single' && Object.keys(newValue).length > 1) {
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
                        key={headerGroup.id}
                        headerGroup={headerGroup}
                        sticky={stickyHeader}
                    />
                ))}
            </StyledTHead>
            <StyledTBody>
                {table.getRowModel().rows.map((row) => {
                    const rowOriginal = row.original as TableData<T>;
                    return (
                        <Fragment key={row.id}>
                            <TableRow<T>
                                striped={striped}
                                error={!!rowOriginal.error}
                                row={row}
                                onClick={onRowClick}
                            />
                            {rowOriginal.subContent && row.getIsExpanded() && (
                                <StyledTableRow>
                                    <td />
                                    <td colSpan={99}>
                                        {rowOriginal.subContent}
                                    </td>
                                </StyledTableRow>
                            )}
                        </Fragment>
                    );
                })}
            </StyledTBody>
            {hasFooter && (
                <StyledTFoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <TableFooter<T>
                            key={footerGroup.id}
                            footerGroup={footerGroup}
                            sticky={stickyFooter}
                        />
                    ))}
                </StyledTFoot>
            )}
        </StyledTable>
    );
};
