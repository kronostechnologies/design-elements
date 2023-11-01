import * as React from 'react';

export function calculateStickyColumns(
    stickyColumns: boolean[],
    headerCells: HTMLCollectionOf<HTMLTableHeaderCellElement>,
    rows: HTMLCollectionOf<HTMLTableRowElement>,
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
    headerCells: HTMLCollectionOf<HTMLTableHeaderCellElement>,
): void {
    Array.from(headerCells).forEach((headerCell, index) => {
        headerCell.style.setProperty('top', '0px');
        headerCell.style.setProperty('z-index', stickyColumns[index] ? '5' : '4');
    });
}

export function calculateStickyFooter(
    stickyColumns: boolean[],
    footerCells: HTMLCollectionOf<HTMLTableCellElement>,
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
    const headerCells = tableRef.current.getElementsByTagName('th');
    const rows = tableRef.current.getElementsByTagName('tr');
    const footerCells = tableRef.current.getElementsByTagName('tfoot')[0]?.getElementsByTagName('td');

    calculateStickyColumns(stickyColumns, headerCells, rows);
    if (stickyHeader) {
        calculateStickyHeader(stickyColumns, headerCells);
    }

    if (stickyFooter) {
        calculateStickyFooter(stickyColumns, footerCells);
    }
}
