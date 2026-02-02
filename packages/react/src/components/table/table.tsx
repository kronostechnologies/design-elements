import {
    ColumnSort,
    ExpandedState,
    functionalUpdate,
    getCoreRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    Row,
    RowSelectionState,
    SortingState,
    TableOptions,
    Updater,
    useReactTable,
} from '@tanstack/react-table';
import { TFunction } from 'i18next';
import { ChangeEvent, Fragment, ReactElement, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { devConsole } from '../../utils/dev-console';
import { v4 as uuid } from '../../utils/uuid';
import { IconButton } from '../buttons';
import { Checkbox } from '../checkbox/checkbox';
import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { RadioInput } from '../radio-button/radio-input';
import { TableFooter } from './table-footer';
import { TableHeader } from './table-header';
import { StyledTableRow, TableRow } from './table-row';
import { type TableColumn, type TableData } from './types';
import { createRowSelectionStateFromSelectedRowIds } from './utils/table-utils';

type RowSize = 'small' | 'medium' | 'large';

const enum UtilityColumnId {
    Selection = 'selection',
    Numbers = 'numbers',
    Expand = 'expand'
}

export type RowSelectionMode = 'single' | 'multiple';

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

const ALWAYS_EXPANDED_VALUE = true;

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

    thead th {
        font-weight: var(--font-semi-bold);
        padding: ${({ $device, $rowSize }) => getThPadding($device, $rowSize)};
    }

    th,
    td {
        font-size: ${({ $device }) => ($device === 'desktop' ? 0.875 : 1)}rem;
        line-height: 1.5rem;
        margin: 0;
        padding: ${({ $device, $rowSize }) => getTdPadding($device, $rowSize)};

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

const StyledRadioInput = styled(RadioInput)`
    vertical-align: sub;
`;

function getSelectionColumn<T extends object>(
    t: TFunction<'translation'>,
    rowSelectionMode: RowSelectionMode | undefined,
    ariaLabelledByColumnId: string | undefined,
    expandChildrenOnRowSelection: boolean | undefined,
    expanded: ExpandedState,
    hideSelectAll: boolean,
): TableColumn<T> {
    const column: TableColumn<T> = {
        id: UtilityColumnId.Selection,
        className: utilColumnClassName,
    };

    if (rowSelectionMode === 'multiple') {
        if (!hideSelectAll) {
            column.header = ({ table }) => (
                <Checkbox
                    data-testid="row-checkbox-all"
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            );
        }

        column.cell = ({ table, row }) => {
            let indeterminate = false;
            let checked = false;

            if (row.getIsAllSubRowsSelected()) {
                checked = true;
            } else if (row.getIsSomeSelected()) {
                indeterminate = true;
            } else {
                checked = row.getIsSelected();
            }

            const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
                const isChecked = event.target.checked;

                table.setRowSelection((oldSelection: RowSelectionState) => {
                    const updatedSelection = { ...oldSelection };

                    if (isChecked) {
                        updatedSelection[row.id] = true;

                        row.subRows.forEach((sub) => {
                            updatedSelection[sub.id] = true;
                        });
                    } else {
                        delete updatedSelection[row.id];

                        row.subRows.forEach((sub) => {
                            delete updatedSelection[sub.id];
                        });
                    }

                    // Select parent when all children were selected, or deselect parent when any child was deselected
                    const parentRow = row.getParentRow();

                    if (parentRow && parentRow.subRows.length > 0) {
                        const allChildrenChecked = parentRow.subRows.every((sub) => updatedSelection[sub.id]);

                        if (allChildrenChecked) {
                            updatedSelection[parentRow.id] = true;
                        } else {
                            delete updatedSelection[parentRow.id];
                        }
                    }

                    return updatedSelection;
                });

                // auto-expand
                const hasChildren = row.subRows.length > 0;
                if (expandChildrenOnRowSelection && expanded !== ALWAYS_EXPANDED_VALUE && isChecked && hasChildren) {
                    row.toggleExpanded(true);
                }
            };

            return (
                <Checkbox
                    data-testid={`row-checkbox-${row.id}`}
                    checked={checked}
                    disabled={!row.getCanSelect()}
                    indeterminate={indeterminate}
                    onChange={onChange}
                />
            );
        };
    } else if (rowSelectionMode === 'single') {
        if (!ariaLabelledByColumnId) {
            devConsole.warn('ariaLabelledByColumnId is recommended for Accessibility');
        }

        const radioBtnName = `row-radiobutton-${uuid()}`;

        column.cell = ({ table, row }) => {
            const onChange = (): void => {
                table.setRowSelection(() => ({
                    [row.id]: true,
                }));
            };

            const radioBtnId = `row-radiobutton-${row.id}`;
            return (
                <StyledRadioInput
                    id={radioBtnId}
                    data-testid={radioBtnId}
                    ariaLabel={t('selectRow')}
                    ariaLabelledBy={ariaLabelledByColumnId ? [radioBtnId, `${row.id}_${ariaLabelledByColumnId}`] : []}
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    name={radioBtnName}
                    onChange={onChange}
                />
            );
        };
    }

    return column;
}

function getExpandColumn<T extends object>(t: TFunction<'translation'>): TableColumn<T> {
    return {
        id: UtilityColumnId.Expand,
        className: utilColumnClassName,
        cell: ({ row }) => {
            const isExpanded = row.getIsExpanded();
            if (!row.getCanExpand()) {
                return null;
            }
            return (
                <ExpandButton
                    type="button"
                    buttonType="tertiary"
                    iconName="chevronRight"
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
        },
    } satisfies TableColumn<T>;
}

function getNumbersColumn<T extends object>(): TableColumn<T> {
    return {
        id: UtilityColumnId.Numbers,
        className: utilColumnClassName,
        cell: ({ row }) => <RowNumber>{row.index + 1}</RowNumber>,
    } satisfies TableColumn<T>;
}

export type TableRowId = string;
type RowIdField<T> = { [K in keyof T]: T[K] extends TableRowId ? K : never }[keyof T]

export interface TableProps<T extends object> {
    ariaLabelledByColumnId?: string,
    data: T[];
    defaultSort?: ColumnSort;
    columns: TableColumn<T>[];
    excludeGroupsFromSelection?: boolean;
    expandableRows?: 'single' | 'multiple';
    expandChildrenOnRowSelection?: boolean;
    hideSelectAll?: boolean;
    /**
     * Field name that will be used to generate the unique ID of each row
     */
    rowIdField: RowIdField<T>;
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
    rowSelectionMode?: RowSelectionMode;
    selectedRowIds?: TableRowId[];
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

    onSelectedRowIdsChange?(selectedRows: TableRowId[]): void;

    onSelectedRowsChange?(selectedRows: T[]): void;

    onSort?(sort: ColumnSort | null): void;
}

type TableComponent = <T extends object>(props: TableProps<T>) => ReactElement;

export const Table: TableComponent & { displayName?: string | undefined } = <T extends object>({
    ariaLabelledByColumnId,
    className,
    data,
    rowIdField,
    defaultSort,
    columns: providedColumns,
    excludeGroupsFromSelection = false,
    expandableRows,
    expandChildrenOnRowSelection,
    hideSelectAll = false,
    selectedRowIds,
    stickyHeader = false,
    stickyFooter = false,
    rowNumbers = false,
    rowSize = 'medium',
    rowSelectionMode,
    striped = false,
    manualSort = false,
    onRowClick,
    onSelectedRowIdsChange,
    onSelectedRowsChange,
    onSort,
}: TableProps<T>): ReactElement => {
    const { t } = useTranslation('table');
    const tableRef = useRef<HTMLTableElement>(null);
    const { device } = useDeviceContext();
    const [sorting, setSorting] = useState<SortingState>(defaultSort ? [defaultSort] : []);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const [previousSelectedRowIds, setPreviousSelectedRowIds] = useState<TableRowId[]>([]);
    const tableInstance = useRef<ReturnType<typeof useReactTable<T>>>();

    function hasSelectedIdsChanged(rowIds: TableRowId[]): boolean {
        return previousSelectedRowIds !== rowIds && (
            previousSelectedRowIds.length !== rowIds.length
            || previousSelectedRowIds.some((value) => !rowIds.includes(value))
        );
    }

    // extends columns with utility column if needed (for row numbers and row selection)
    const columns = useMemo(() => {
        const cols: TableColumn<T>[] = providedColumns.map((column) => ({
            ...column,
            textAlign: column.textAlign ?? 'left',
        }));

        if (rowSelectionMode) {
            cols.unshift(getSelectionColumn<T>(
                t,
                rowSelectionMode,
                ariaLabelledByColumnId,
                expandChildrenOnRowSelection,
                expanded,
                hideSelectAll,
            ));
        }
        if (expandableRows) {
            cols.unshift(getExpandColumn<T>(t));
        }
        if (rowNumbers) {
            cols.unshift(getNumbersColumn<T>());
        }

        return cols;
    }, [
        t,
        rowSelectionMode,
        expandableRows,
        rowNumbers,
        providedColumns,
        ariaLabelledByColumnId,
        expandChildrenOnRowSelection,
        expanded,
        hideSelectAll,
    ]);

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
        getRowId: (row: T): TableRowId => row[rowIdField] as TableRowId,
        getSortedRowModel: getSortedRowModel(),
        getSubRows: (originalRow) => (originalRow as TableData<T>).subRows,
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
            const allExpandedIds = Object.keys(newValue);

            // Hackish because onExpandedChange doesn't provide the currently expanded/collapsed row
            if (expandableRows === 'single' && allExpandedIds.length > 1) {
                newValue = functionalUpdate(updater, {});
            }
            setExpanded(newValue);
        },
        enableRowSelection: true,
        onRowSelectionChange: (updater: Updater<RowSelectionState>) => {
            const newRowSelection = functionalUpdate(updater, rowSelection);
            const newSelectedRowIds = Object.keys(newRowSelection);

            setRowSelection(newRowSelection);
            setPreviousSelectedRowIds(newSelectedRowIds);

            const currentTable = tableInstance.current;

            if (currentTable) {
                const emittedRowIds = newSelectedRowIds.filter(
                    (rowId) => !excludeGroupsFromSelection || !currentTable.getRow(rowId).subRows.length,
                );

                onSelectedRowIdsChange?.(emittedRowIds);

                if (onSelectedRowsChange) {
                    const emittedSelectedRows = emittedRowIds
                        .map((rowId) => currentTable.getRow(rowId))
                        .map((row) => row.original);

                    onSelectedRowsChange(emittedSelectedRows);
                }
            }
        },
    };

    const table = useReactTable(tableOptions);
    tableInstance.current = table;

    const hasFooter = columns.some((column) => 'footer' in column);

    if (rowSelectionMode !== undefined && selectedRowIds !== undefined && hasSelectedIdsChanged(selectedRowIds)) {
        const newSelection: RowSelectionState = createRowSelectionStateFromSelectedRowIds(
            selectedRowIds,
            rowSelectionMode,
        );

        setRowSelection(newSelection);
        setPreviousSelectedRowIds(selectedRowIds);
    }

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
                    const hasError = !!rowOriginal.error;
                    return (
                        <Fragment key={row.id}>
                            <TableRow<T>
                                striped={striped}
                                error={hasError}
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

Table.displayName = 'Table';
