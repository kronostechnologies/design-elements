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
import { Fragment, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { devConsole } from '../../utils/dev-console';
import { isEqual } from '../../utils/object';
import { v4 as uuid } from '../../utils/uuid';
import { IconButton } from '../buttons';
import { Checkbox } from '../checkbox/checkbox';
import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { RadioInput } from '../radio-button/radio-input';
import { TableFooter } from './table-footer';
import { TableHeader } from './table-header';
import { StyledTableRow, TableRow } from './table-row';
import { TableColumn, TableData } from './types';

type RowSize = 'small' | 'medium' | 'large';

const enum UtilityColumnId {
    Selection = 'selection',
    Numbers = 'numbers',
    Expand = 'expand'
}

type RowSelectionMode = 'single' | 'multiple';

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

const StyledRadioInput = styled(RadioInput)`
    vertical-align: sub;
`;

function getSelectionColumn<T extends object>(
    t: TFunction<'translation'>,
    rowSelectionMode: RowSelectionMode | undefined,
    ariaLabelledByColumnId: string | undefined,
    expandChildrenOnRowSelection: boolean | undefined,
    expanded: ExpandedState,
): TableColumn<T> {
    const column: TableColumn<T> = {
        id: UtilityColumnId.Selection,
        className: utilColumnClassName,
    };

    if (rowSelectionMode === 'multiple') {
        column.header = ({ table }) => (
            <Checkbox
                data-testid="row-checkbox-all"
                checked={table.getIsAllRowsSelected()}
                indeterminate={table.getIsSomeRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
            />
        );
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

            const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
                const isChecked = event.target.checked;

                const updatedSelection = { ...table.getState().rowSelection };
                if (isChecked) {
                    updatedSelection[row.id] = true;
                } else {
                    delete updatedSelection[row.id];
                }

                // Select parent when all children was selected, or deselect parent when any child was deselected
                const allSelectedIds = Object.keys(updatedSelection);
                allSelectedIds.forEach((key) => {
                    const parentRow = table.getRow(key).getParentRow();
                    if (parentRow && parentRow.subRows.length > 0) {
                        const allChildrenChecked = parentRow.subRows.every((sub) => allSelectedIds.includes(sub.id));
                        parentRow.toggleSelected(allChildrenChecked, { selectChildren: false });
                    }
                });

                row.toggleSelected(isChecked);

                // auto-expand
                const hasChildren = row.subRows.length > 0;
                if (expandChildrenOnRowSelection && expanded !== ALWAYS_EXPANDED_VALUE && isChecked && hasChildren) {
                    row.toggleExpanded(true);
                }
            };

            return (
                <Checkbox
                    data-testid={`row-checkbox-${row.index}`}
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
            const radioBtnId = `row-radiobutton-${row.index}`;
            return (
                <StyledRadioInput
                    id={radioBtnId}
                    data-testid={radioBtnId}
                    ariaLabel={t('selectRow')}
                    ariaLabelledBy={ariaLabelledByColumnId ? [radioBtnId, `${row.id}_${ariaLabelledByColumnId}`] : []}
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    name={radioBtnName}
                    onChange={() => {
                        table.toggleAllRowsSelected(false);
                        row.toggleSelected(true);
                    }}
                />
            );
        };
    }

    return column;
}

function getExpandColumn<T extends object>(
    t: TFunction<'translation'>,
): TableColumn<T> {
    const column: TableColumn<T> = {
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
        },
    };

    return column;
}

function getNumbersColumn<T extends object>(): TableColumn<T> {
    const column: TableColumn<T> = {
        id: UtilityColumnId.Numbers,
        className: utilColumnClassName,
        cell: ({ row }) => <RowNumber>{row.index + 1}</RowNumber>,
    };

    return column;
}

export interface TableProps<T extends object> {
    ariaLabelledByColumnId?: string,
    data: T[];
    defaultSort?: ColumnSort;
    columns: TableColumn<T>[];
    expandableRows?: 'single' | 'multiple';
    expandChildrenOnRowSelection?: boolean;
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
    selectedRows?: T[];
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
    ariaLabelledByColumnId,
    className,
    data,
    defaultSort,
    columns: providedColumns,
    expandableRows,
    expandChildrenOnRowSelection,
    selectedRows,
    stickyHeader = false,
    stickyFooter = false,
    rowNumbers = false,
    rowSize = 'medium',
    rowSelectionMode,
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
    const [previousSelectedRows, setPreviousSelectedRows] = useState<T[] | undefined>(selectedRows);

    // extends columns with utility column if needed (for row numbers and row selection)
    const columns = useMemo(() => {
        const cols = [...providedColumns];

        if (rowSelectionMode) {
            cols.unshift(getSelectionColumn<T>(
                t,
                rowSelectionMode,
                ariaLabelledByColumnId,
                expandChildrenOnRowSelection,
                expanded,
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
        onRowSelectionChange: setRowSelection,
    };

    const table = useReactTable(tableOptions);
    const hasFooter = columns.some((column) => 'footer' in column);
    const currentRowSelection = table.getState().rowSelection;

    useEffect(() => {
        if (rowSelectionMode && onSelectedRowsChange) {
            const newSelectedRows = Object.keys(currentRowSelection).map((rowId) => table.getRow(rowId).original);
            onSelectedRowsChange(newSelectedRows);
        }
    }, [rowSelectionMode, currentRowSelection, onSelectedRowsChange, table]);

    if (selectedRows !== undefined && previousSelectedRows !== selectedRows && rowSelectionMode !== undefined) {
        const selectedRowIds = table.getRowModel().flatRows
            .filter((row) => selectedRows.includes(row.original))
            .map((row) => row.id);

        const newSelection: RowSelectionState = selectedRowIds.reduce((acc: RowSelectionState, rowId) => {
            acc[rowId] = true;
            return acc;
        }, {} satisfies RowSelectionState);

        if (!isEqual(currentRowSelection, newSelection)) {
            setRowSelection(newSelection);
        }
        setPreviousSelectedRows(selectedRows);
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
