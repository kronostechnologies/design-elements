import { calculateStickyColumns, calculateStickyHeader } from './table-utils';

function getTable(): HTMLTableElement {
    const table: HTMLTableElement = document.createElement('table');
    const header: HTMLTableRowElement = document.createElement('tr');
    header.appendChild(document.createElement('th'));
    header.appendChild(document.createElement('th'));
    header.appendChild(document.createElement('th'));
    table.appendChild(header);
    const row1: HTMLTableRowElement = document.createElement('tr');
    row1.appendChild(document.createElement('td'));
    row1.appendChild(document.createElement('td'));
    row1.appendChild(document.createElement('td'));
    table.appendChild(row1);
    const row2: HTMLTableRowElement = document.createElement('tr');
    row2.appendChild(document.createElement('td'));
    row2.appendChild(document.createElement('td'));
    row2.appendChild(document.createElement('td'));
    table.appendChild(row2);
    const row3: HTMLTableRowElement = document.createElement('tr');
    row3.appendChild(document.createElement('td'));
    row3.appendChild(document.createElement('td'));
    row3.appendChild(document.createElement('td'));
    table.appendChild(row3);
    return table;
}

function getTableValues(): {
    headerCells: NodeListOf<HTMLTableCellElement>,
    rows: NodeListOf<HTMLTableRowElement>,
} {
    const table = getTable();

    return {
        headerCells: table.querySelectorAll('th'),
        rows: table.querySelectorAll('tr'),
    };
}

describe('Table utils', () => {
    describe('calculateStickyColumns', () => {
        it('should set header cell z-index when column is sticky', () => {
            const { headerCells, rows } = getTableValues();

            calculateStickyColumns([true, true, false], headerCells, rows);

            expect(headerCells[0].style.getPropertyValue('z-index')).toEqual('2');
            expect(headerCells[1].style.getPropertyValue('z-index')).toEqual('2');
            expect(headerCells[2].style.getPropertyValue('z-index')).toEqual('');
        });

        it('should set all rows column z-index when column is sticky', () => {
            const { headerCells, rows } = getTableValues();

            calculateStickyColumns([true, true, false], headerCells, rows);

            Array.from(rows).forEach((row) => {
                expect(row.cells[0].style.getPropertyValue('z-index')).toEqual('2');
                expect(row.cells[1].style.getPropertyValue('z-index')).toEqual('2');
                expect(row.cells[2].style.getPropertyValue('z-index')).toEqual('');
            });
        });

        it('should set header cell left when column is sticky', () => {
            const { headerCells, rows } = getTableValues();

            calculateStickyColumns([true, true, false], headerCells, rows);

            expect(headerCells[0].style.getPropertyValue('left')).toEqual('0px');
            const left = headerCells[0].clientWidth;
            expect(headerCells[1].style.getPropertyValue('left')).toEqual(`${left}px`);
            expect(headerCells[2].style.getPropertyValue('left')).toEqual('');
        });

        it('should set all rows column left when column is sticky', () => {
            const { headerCells, rows } = getTableValues();

            calculateStickyColumns([true, true, false], headerCells, rows);

            const left = headerCells[0].clientWidth;
            Array.from(rows).forEach((row) => {
                expect(row.cells[0].style.getPropertyValue('left')).toEqual('0px');
                expect(row.cells[1].style.getPropertyValue('left')).toEqual(`${left}px`);
                expect(row.cells[2].style.getPropertyValue('left')).toEqual('');
            });
        });
    });

    describe('calculateStickyRows', () => {
        it('should set header cell z-index when header is sticky', () => {
            const { headerCells } = getTableValues();

            calculateStickyHeader([false, false, false], headerCells);

            expect(headerCells[0].style.getPropertyValue('z-index')).toEqual('4');
            expect(headerCells[1].style.getPropertyValue('z-index')).toEqual('4');
            expect(headerCells[2].style.getPropertyValue('z-index')).toEqual('4');
        });

        it('should set header cell z-index higher when both header and column are sticky', () => {
            const { headerCells } = getTableValues();

            // first column is sticky
            calculateStickyHeader([true, false, false], headerCells);

            expect(headerCells[0].style.getPropertyValue('z-index')).toEqual('5');
            expect(headerCells[1].style.getPropertyValue('z-index')).toEqual('4');
            expect(headerCells[2].style.getPropertyValue('z-index')).toEqual('4');
        });

        it('should set header cell top when header is sticky', () => {
            const { headerCells } = getTableValues();

            calculateStickyHeader([true, false, false], headerCells);

            expect(headerCells[0].style.getPropertyValue('top')).toEqual('0px');
            expect(headerCells[1].style.getPropertyValue('top')).toEqual('0px');
            expect(headerCells[2].style.getPropertyValue('top')).toEqual('0px');
        });
    });
});
