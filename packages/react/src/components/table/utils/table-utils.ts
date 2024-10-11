import * as React from 'react';
import { Column, ExpandedState } from '@tanstack/react-table';
import { TableData, TableDataAsRowData, TableDataAsRowGroup } from '../types';

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

export function calculateStickyFooter(
    stickyColumns: boolean[],
    footerCells: NodeListOf<HTMLTableCellElement>,
): void {
    Array.from(footerCells).forEach((footerCell, index) => {
        footerCell.style.setProperty('bottom', '0px');
        footerCell.style.setProperty('z-index', stickyColumns[index] ? '5' : '4');
    });
}

export function calculateStickyPosition(
    stickyColumns: boolean[],
    stickyHeader: boolean,
    stickyFooter: boolean,
    tableRef: React.RefObject<HTMLTableElement>,
): void {
    if (tableRef.current === null) {
        return;
    }
    const headerCells = tableRef.current.querySelectorAll('th');
    const rows = tableRef.current.querySelectorAll<HTMLTableRowElement>('tbody > tr');
    const footerCells = tableRef.current.querySelector('tfoot')?.querySelectorAll('td');

    calculateStickyColumns(stickyColumns, headerCells, rows);

    if (stickyHeader) {
        calculateStickyHeader(stickyColumns, headerCells);
    }

    if (stickyFooter && footerCells !== null && footerCells !== undefined) {
        calculateStickyFooter(stickyColumns, footerCells);
    }
}

export function isAGroupColumn<TData, TValue>(column: Column <TData, TValue>): boolean {
    return column.columns.length > 0;
}

export function isLastColumnInAGroup<TData, TValue>(column: Column <TData, TValue>): boolean {
    if (!column.parent) {
        return false;
    }

    const parentColumns = column.parent.columns;
    return column === parentColumns[parentColumns.length - 1];
}

export function isGroupRowType<T extends object>(rowData: TableData<T>): rowData is TableDataAsRowGroup<T> {
    return ('groupLabel' in rowData);
}

export function isDataRowType<T extends object>(rowData: TableData<T>): rowData is TableDataAsRowData<T> {
    return !('groupLabel' in rowData);
}

export function getExpandedIncludingGroups(expanded: ExpandedState, data: TableData<object>[]): ExpandedState {
    if (expanded === true) {
        return expanded;
    }

    return {
        ...expanded,
        ...data.reduce((p, c, i) => (isGroupRowType(c) ? { ...p, [i]: true } : p), {} as Record<string, boolean>),
    };
}
