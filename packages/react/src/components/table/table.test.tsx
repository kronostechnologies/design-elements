import React from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { Table, TableColumn, TableProps } from './table';

interface TestData {
    column1: string;
    column2: string;
    error?: boolean;
}

type TablePropsLite = Omit<TableProps<TestData>, 'columns' | 'data'>;

const data: TestData[] = [
    {
        column1: 'Hello',
        column2: 'World',
    },
    {
        column1: 'Hello',
        column2: 'Planet',
    },
    {
        column1: 'Hello',
        column2: 'Galaxy',
    },
];

function renderTable(
    columnsArray: TableColumn<TestData>,
    currentDevice?: DeviceType,
    props?: TablePropsLite,
): cheerio.Cheerio {
    return renderWithProviders(
        <Table<TestData> columns={columnsArray} data={data} {...props} />,
        currentDevice,
    );
}

const columns: TableColumn<TestData> = [
    {
        Header: 'Column 1',
        accessor: 'column1',
    },
    {
        Header: 'Column 2',
        accessor: 'column2',
    },
];

const columnsTextAligned: TableColumn<TestData> = [
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

const columnsSorted: TableColumn<TestData> = [
    {
        Header: 'Column 1',
        accessor: 'column1',
        sortable: true,
        defaultSort: 'asc',
    },
    {
        Header: 'Column 2',
        accessor: 'column2',
        sortable: true,
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

describe('Table', () => {
    test('column sorting should be set to defaultSort value when defaultSort is set', () => {
        const wrapper = mountWithProviders(<Table columns={columnsSorted} data={data} />);

        expect(getByTestId(wrapper, 'sort-icon').prop('sort')).toBe('ascending');
    });

    test('onRowClick callback is called when a row is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <Table<TestData>
                selectableRows
                columns={columns}
                data={data}
                onRowClick={callback}
            />,
        );

        getByTestId(wrapper, 'table-row-0').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onSelectedRowsChange callback is called on first render', () => {
        const callback = jest.fn();

        mountWithTheme(
            <Table<TestData>
                selectableRows
                columns={columns}
                data={data}
                onSelectedRowsChange={callback}
            />,
        );

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith([]);
    });

    test('onSelectedRowsChange callback is called when row-checkbox is checked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <Table<TestData>
                selectableRows
                columns={columns}
                data={data}
                onSelectedRowsChange={callback}
            />,
        );

        getByTestId(wrapper, 'row-checkbox-0').find('input').simulate('change', { target: { checked: true } });

        expect(callback).nthCalledWith(2, [data[0]]);
    });

    test('onSelectedRowsChange callback is called with all rows when row-checkbox-all is checked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <Table<TestData>
                selectableRows
                columns={columns}
                data={data}
                onSelectedRowsChange={callback}
            />,
        );

        getByTestId(wrapper, 'row-checkbox-all').find('input').simulate('change', { target: { checked: true } });

        expect(callback).nthCalledWith(2, data);
    });

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
        const tree = renderWithProviders(<Table<TestData> columns={columns} data={errorData} />);

        expect(tree).toMatchSnapshot();
    });

    test('has selectable rows styles', () => {
        const tree = renderWithProviders(<Table<TestData> selectableRows columns={columns} data={data} />);

        expect(tree).toMatchSnapshot();
    });
});
