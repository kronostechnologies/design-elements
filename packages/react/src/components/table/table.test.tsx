import React from 'react';

import { renderWithProviders } from '@design-elements/test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { ColumnsProps, Table } from './table';

describe('Table', () => {
    test('has desktop styles', () => {
        const tree = renderTable(columns, 'desktop');

        expect(tree).toMatchSnapshot();
    });
});

describe('Table', () => {
    test('has tablet styles', () => {
        const tree = renderTable(columns, 'tablet');

        expect(tree).toMatchSnapshot();
    });
});

describe('Table', () => {
    test('has mobile styles', () => {
        const tree = renderTable(columns, 'mobile');

        expect(tree).toMatchSnapshot();
    });
});

describe('Table', () => {
    test('has custom text alignment', () => {
        const tree = renderTable(columnsTextAligned);

        expect(tree).toMatchSnapshot();
    });
});

describe('Table', () => {
    test('has sorting styles', () => {
        const tree = renderTable(columnsSorted);

        expect(tree).toMatchSnapshot();
    });
});

const renderTable = (columnsArray: ColumnsProps, currentDevice?: DeviceType) => (
    renderWithProviders(
        <Table columns={columnsArray} data={data}/>,
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
        sort: true,
    },
    {
        Header: 'Column 2',
        accessor: 'column2',
        textAlign: 'center',
        sort: true,
    },
];

const data = [
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
