import { type Column, type RowSelectionState } from '@tanstack/react-table';
import { CSSProperties } from 'react';
import { type RowSelectionMode, type TableRowId } from '../table';
import { CustomCell, TableColumn } from '../types';

export function createRowSelectionStateFromSelectedRowIds(
    selectedRowIds: TableRowId[],
    rowSelectionMode: RowSelectionMode | undefined,
): RowSelectionState {
    if (rowSelectionMode === undefined) {
        return {};
    }

    if (rowSelectionMode === 'single' && selectedRowIds.length > 1) {
        return {
            [selectedRowIds[0]]: true,
        } satisfies RowSelectionState;
    }

    return selectedRowIds.reduce((acc: RowSelectionState, rowId) => {
        acc[rowId] = true;
        return acc;
    }, {} satisfies RowSelectionState);
}

export function calculateStickyColumns(
    stickyColumns: boolean[],
    headerCells: NodeListOf<HTMLTableCellElement>,
    rows: NodeListOf<HTMLTableRowElement>,
): void {
    let left = 0;
    stickyColumns.forEach((sticky, index) => {
        if (sticky) {
            const headerCell = headerCells[index];
            headerCell.style.setProperty('left', `${left}px`);
            headerCell.style.setProperty('z-index', '2');

            Array.from(rows).forEach((row) => {
                row.cells[index].style.setProperty('left', `${left}px`);
                row.cells[index].style.setProperty('z-index', '2');
            });

            left += headerCell.getBoundingClientRect().width;
        }
    });
}

export function calculateStickyHeader(
    stickyColumns: boolean[],
    headerCells: NodeListOf<HTMLTableCellElement>,
): void {
    Array.from(headerCells).forEach((headerCell, index) => {
        headerCell.style.setProperty('top', '0px');
        headerCell.style.setProperty('z-index', stickyColumns[index] ? '5' : '4');
    });
}

export function isAGroupColumn<TData, TValue>(column: Column<TData, TValue>): boolean {
    return column.columns.length > 0;
}

export function isLastColumnInAGroup<TData, TValue>(column: Column<TData, TValue>): boolean {
    if (!column.parent) {
        return false;
    }

    const parentColumns = column.parent.columns;
    return column === parentColumns[parentColumns.length - 1];
}

export function findNearestTextAlign<TData extends object, TValue>(
    column: CustomCell<TData, TValue>['column'],
): CSSProperties['textAlign'] {
    if (column.columnDef.textAlign) {
        return column.columnDef.textAlign;
    }

    if (column.parent) {
        const parentColumnDef = column.parent.columnDef as TableColumn<TData>;
        if (parentColumnDef?.textAlign) {
            return parentColumnDef.textAlign;
        }
        return findNearestTextAlign(column.parent as CustomCell<TData, TValue>['column']);
    }

    return undefined;
}
