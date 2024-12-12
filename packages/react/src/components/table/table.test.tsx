import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { Table, TableProps } from './table';
import { TableColumn } from './types';

interface TestData {
    column1: string;
    column2: string;
    error?: boolean;
}

interface TestData3Columns {
    column1: string;
    column2: string;
    column3: string;
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
    columnsArray: TableColumn<TestData>[],
    currentDevice?: DeviceType,
    props?: TablePropsLite,
): cheerio.Cheerio {
    return renderWithProviders(
        <Table columns={columnsArray} data={data} {...props} />,
        currentDevice,
    );
}

const columnsWithHeaderAriaLabel: TableColumn<TestData>[] = [
    {
        header: 'Column 1',
        headerAriaLabel: 'column 1 aria label',
        accessorKey: 'column1',
    },
    {
        header: '',
        headerAriaLabel: 'column 2 aria label',
        accessorKey: 'column2',
    },
];

const columnsWithHeadersGrouped: TableColumn<TestData>[] = [
    {
        header: 'Group 1',
        columns: [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
        ],
    },
    {
        header: 'Group 2',
        columns: [
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ],
    },
];

const columns: TableColumn<TestData>[] = [
    {
        header: 'Column 1',
        accessorKey: 'column1',
    },
    {
        header: 'Column 2',
        accessorKey: 'column2',
    },
];

const columnsTextAligned: TableColumn<TestData>[] = [
    {
        header: 'Column 1',
        accessorKey: 'column1',
        textAlign: 'right',
    },
    {
        header: 'Column 2',
        accessorKey: 'column2',
        textAlign: 'center',
    },
];

const columnsSorted: TableColumn<TestData>[] = [
    {
        header: 'Column 1',
        accessorKey: 'column1',
        sortable: true,
    },
    {
        header: 'Column 2',
        accessorKey: 'column2',
        sortable: true,
    },
];

const columnsSticky: TableColumn<TestData3Columns>[] = [
    {
        header: 'Column 1',
        accessorKey: 'column1',
        sticky: true,
    },
    {
        header: 'Column 2',
        accessorKey: 'column2',
        sticky: true,
    },
    {
        header: 'Column 3',
        accessorKey: 'column3',
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

const stickyColumnsData: TestData3Columns[] = [
    {
        column1: 'Hello',
        column2: 'Big',
        column3: 'World',
    },
    {
        column1: 'Hello',
        column2: 'Big',
        column3: 'World',
    },
    {
        column1: 'Hello',
        column2: 'Big',
        column3: 'World',
    },
];

describe('Table', () => {
    test('column sorting should be set to defaultSort value when defaultSort is set', () => {
        const wrapper = mountWithProviders(
            <Table
                columns={columnsSorted}
                data={data}
                defaultSort={{ id: 'column1', desc: false }}
            />,
        );

        expect(getByTestId(wrapper, 'sort-icon').prop('sort')).toBe('ascending');
    });

    test('onRowClick callback is called when a row is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <Table
                rowSelectionMode="multiple"
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
            <Table
                rowSelectionMode="multiple"
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
            <Table
                rowSelectionMode="multiple"
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
            <Table
                rowSelectionMode="multiple"
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
        const tree = renderTable(columnsSorted, undefined, { defaultSort: { id: 'column1', desc: false } });

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
        const tree = renderWithProviders(<Table columns={columns} data={errorData} />);

        expect(tree).toMatchSnapshot();
    });

    test('has selectable rows styles', () => {
        const tree = renderWithProviders(<Table rowSelectionMode="multiple" columns={columns} data={data} />);

        expect(tree).toMatchSnapshot();
    });

    test('has sticky header styles', () => {
        const tree = renderWithProviders(<Table stickyHeader columns={columns} data={data} />);

        expect(tree).toMatchSnapshot();
    });

    test('has sticky column styles', () => {
        const tree = renderWithProviders(<Table columns={columnsSticky} data={stickyColumnsData} />);

        expect(tree).toMatchSnapshot();
    });

    test('has aria-label on header columns', () => {
        const tree = renderWithProviders(
            <Table
                columns={columnsWithHeaderAriaLabel}
                data={data}
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has column with headers grouped', () => {
        const tree = renderWithProviders(
            <Table<TestData>
                columns={columnsWithHeadersGrouped}
                data={data}
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has radio buttons in single selection mode', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <Table
                rowSelectionMode="single"
                columns={columns}
                data={data}
                onSelectedRowsChange={callback}
            />,
        );

        expect(getByTestId(wrapper, 'row-radiobutton-0')
            .find('input')
            .prop('type')).toBe('radio');
    });

    test('has single selection when selecting other row in single selection mode', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <Table
                rowSelectionMode="single"
                columns={columns}
                data={data}
                onSelectedRowsChange={callback}
            />,
        );

        getByTestId(wrapper, 'row-radiobutton-0')
            .find('input')
            .simulate('change', { target: { checked: true } });
        getByTestId(wrapper, 'row-radiobutton-1')
            .find('input')
            .simulate('change', { target: { checked: true } });

        expect(getByTestId(wrapper, 'row-radiobutton-0')
            .find('input')
            .prop('checked')).toBe(false);
        expect(getByTestId(wrapper, 'row-radiobutton-1')
            .find('input')
            .prop('checked')).toBe(true);
    });

    test('should select only one row when multiple selected rows are provided but selectionMode is single', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <Table
                rowSelectionMode="single"
                columns={columns}
                data={data}
                selectedRows={[data[0], data[1]]}
                onSelectedRowsChange={callback}
            />,
        );

        expect(getByTestId(wrapper, 'row-radiobutton-0')
            .find('input')
            .prop('checked')).toBe(true);
        expect(getByTestId(wrapper, 'row-radiobutton-1')
            .find('input')
            .prop('checked')).toBe(false);
    });

    test('should select multiple rows when selectionMode is multiple', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <Table
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                selectedRows={[data[0], data[1]]}
                onSelectedRowsChange={callback}
            />,
        );

        expect(getByTestId(wrapper, 'row-checkbox-0')
            .find('input')
            .prop('checked')).toBe(true);
        expect(getByTestId(wrapper, 'row-checkbox-1')
            .find('input')
            .prop('checked')).toBe(true);
    });
});
