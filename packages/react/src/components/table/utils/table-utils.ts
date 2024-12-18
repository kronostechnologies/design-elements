import { type Column, type RowSelectionState } from '@tanstack/react-table';
import { type TableRowId } from '../table';

export function isSameRowSelectionState(obj1: RowSelectionState, obj2: RowSelectionState): boolean {
    if (obj1 === obj2) {
        return true;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let i = 0; i < keys1.length; i++) {
        const key = keys1[i];
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

export function createRowSelectionStateFromSelectedRows(
    selectedRowIds: TableRowId[],
    rowSelectionMode: 'single' | 'multiple',
): RowSelectionState {
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
