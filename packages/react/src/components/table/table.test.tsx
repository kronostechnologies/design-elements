import React from 'react';

import { renderWithProviders } from '@design-elements/test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { ColumnsProps, Table, TableProps } from './table';

describe('Table', () => {
    test('has desktop styles', () => {
        const tree = renderTable(columns, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('has tablet styles', () => {
        const tree = renderTable(columns, 'tablet');

        expect(tree).toMatchSnapshot();
    });

    test('has mobile styles', () => {
        const tree = renderTable(columns, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('has custom text alignment', () => {
        const tree = renderTable(columnsTextAligned);

        expect(tree).toMatchSnapshot();
    });

    test('has sorting styles', () => {
        const tree = renderTable(columnsSorted);

        expect(tree).toMatchSnapshot();
    });

    test('has striped styles', () => {
        const tree = renderTable(columns, undefined, { striped: true });

        expect(tree).toMatchSnapshot();
    });

    test('has small rowSize styles', () => {
        const tree = renderTable(columns, undefined, { rowSize: 'small' });

        expect(tree).toMatchSnapshot();
    });

    test('has rowNumbers styles', () => {
        const tree = renderTable(columns, undefined, { rowNumbers: true });

        expect(tree).toMatchSnapshot();
    });

    test('has clickable rows styles', () => {
        const tree = renderTable(columns, undefined, { onRowClick: jest.fn() });

        expect(tree).toMatchSnapshot();
    });

    test('has error rows styles', () => {
        const tree = renderWithProviders(<Table<TestData> columns={columns} data={errorData}/>);

        expect(tree).toMatchSnapshot();
    });
});

interface TablePropsLite extends Omit<TableProps<TestData>, 'columns' | 'data'> {}

const renderTable = (columnsArray: ColumnsProps, currentDevice?: DeviceType, props?: TablePropsLite) => (
    renderWithProviders(
        <Table<TestData> columns={columnsArray} data={data} {...props}/>,
        currentDevice,
    )
);

const columns = [
    {
        Header: 'Column 1',
        accessor: 'column1',
    },
    {
        Header: 'Column 2',
        accessor: 'column2',
    },
];

const columnsTextAligned = [
    {
        Header: 'Column 1',
        accessor: 'column1',
        textAlign: 'right',
    },
    {
        Header: 'Column 2',
        accessor: 'column2',
        textAlign: 'center',
    },
];

const columnsSorted = [
    {
        Header: 'Column 1',
        accessor: 'column1',
        sortable: true,
    },
    {
        Header: 'Column 2',
        accessor: 'column2',
        sortable: true,
    },
];

interface TestData {
    column1: string;
    column2: string;
    error?: boolean;
}

const data: TestData[] = [
    {
        column1: 'Hello',
        column2: 'World',
    },
    {
        column1: 'Hello',
        column2: 'World',
    },
    {
        column1: 'Hello',
        column2: 'World',
    },
];

const errorData: TestData[] = [
    {
        column1: 'Hello',
        column2: 'World',
        error: true,
    },
    {
        column1: 'Hello',
        column2: 'World',
    },
    {
        column1: 'Hello',
        column2: 'World',
        error: true,
    },
];
