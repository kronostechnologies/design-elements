import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { Table, TableProps } from './table';
import { TableColumn, TableData } from './types';

interface TestData {
    id: string;
    column1: string;
    column2: string;
    error?: boolean;
}

interface TestData3Columns {
    id: string;
    column1: string;
    column2: string;
    column3: string;
}

type TablePropsLite = Omit<TableProps<TestData>, 'columns' | 'data' | 'rowIdField'>;

const data: TestData[] = [
    {
        id: '0',
        column1: 'Hello',
        column2: 'World',
    },
    {
        id: '1',
        column1: 'Hello',
        column2: 'Planet',
    },
    {
        id: '2',
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
        <Table columns={columnsArray} data={data} rowIdField="id" {...props} />,
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
        id: '0',
        column1: 'Hello',
        column2: 'World',
        error: true,
    },
    {
        id: '1',
        column1: 'Hello',
        column2: 'World',
    },
    {
        id: '2',
        column1: 'Hello',
        column2: 'World',
        error: true,
    },
];

const stickyColumnsData: TestData3Columns[] = [
    {
        id: '0',
        column1: 'Hello',
        column2: 'Big',
        column3: 'World',
    },
    {
        id: '1',
        column1: 'Hello',
        column2: 'Big',
        column3: 'World',
    },
    {
        id: '2',
        column1: 'Hello',
        column2: 'Big',
        column3: 'World',
    },
];

describe('Table', () => {
    test('column sorting should be set to defaultSort value when defaultSort is set', () => {
        const wrapper = mountWithProviders(
            <Table<TestData>
                columns={columnsSorted}
                data={data}
                rowIdField="id"
                defaultSort={{ id: 'column1', desc: false }}
            />,
        );

        expect(getByTestId(wrapper, 'sort-icon').prop('sort')).toBe('ascending');
    });

    test('onRowClick callback is called when a row is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                onRowClick={callback}
            />,
        );

        getByTestId(wrapper, 'table-row-0').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onSelectedRows callbacks are called on first render', () => {
        const onSelectedRowIdsChange = jest.fn();
        const onSelectedRowsChange = jest.fn();

        mountWithTheme(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                onSelectedRowIdsChange={onSelectedRowIdsChange}
                onSelectedRowsChange={onSelectedRowsChange}
            />,
        );

        expect(onSelectedRowIdsChange).toHaveBeenCalledTimes(1);
        expect(onSelectedRowIdsChange).toHaveBeenCalledWith([]);
        expect(onSelectedRowsChange).toHaveBeenCalledTimes(1);
        expect(onSelectedRowsChange).toHaveBeenCalledWith([]);
    });

    test('onSelectedRows callbacks are called when row-checkbox is checked', () => {
        const onSelectedRowIdsChange = jest.fn();
        const onSelectedRowsChange = jest.fn();
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                onSelectedRowIdsChange={onSelectedRowIdsChange}
                onSelectedRowsChange={onSelectedRowsChange}
            />,
        );

        getByTestId(wrapper, 'row-checkbox-0').find('input').simulate('change', { target: { checked: true } });

        expect(onSelectedRowIdsChange).nthCalledWith(2, [data[0].id]);
        expect(onSelectedRowsChange).nthCalledWith(2, [data[0]]);
    });

    test('onSelectedRows callbacks are called with all rows when row-checkbox-all is checked', () => {
        const onSelectedRowIdsChange = jest.fn();
        const onSelectedRowsChange = jest.fn();
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                onSelectedRowIdsChange={onSelectedRowIdsChange}
                onSelectedRowsChange={onSelectedRowsChange}
            />,
        );

        getByTestId(wrapper, 'row-checkbox-all').find('input').simulate('change', { target: { checked: true } });

        expect(onSelectedRowIdsChange).nthCalledWith(2, data.map((row) => row.id));
        expect(onSelectedRowsChange).nthCalledWith(2, data);
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
        const tree = renderWithProviders(<Table<TestData> columns={columns} data={errorData} rowIdField="id" />);

        expect(tree).toMatchSnapshot();
    });

    test('has selectable rows styles', () => {
        const tree = renderWithProviders(
            <Table<TestData> rowSelectionMode="multiple" columns={columns} data={data} rowIdField="id" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has sticky header styles', () => {
        const tree = renderWithProviders(
            <Table<TestData> stickyHeader columns={columns} data={data} rowIdField="id" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has sticky column styles', () => {
        const tree = renderWithProviders(
            <Table<TestData3Columns> columns={columnsSticky} data={stickyColumnsData} rowIdField="id" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has aria-label on header columns', () => {
        const tree = renderWithProviders(
            <Table<TestData>
                columns={columnsWithHeaderAriaLabel}
                data={data}
                rowIdField="id"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has column with headers grouped', () => {
        const tree = renderWithProviders(
            <Table<TestData>
                columns={columnsWithHeadersGrouped}
                data={data}
                rowIdField="id"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has radio buttons in single selection mode', () => {
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="single"
                columns={columns}
                data={data}
                rowIdField="id"
            />,
        );

        expect(getByTestId(wrapper, 'row-radiobutton-0')
            .find('input')
            .prop('type')).toBe('radio');
    });

    test('has single selection when selecting other row in single selection mode', () => {
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="single"
                columns={columns}
                data={data}
                rowIdField="id"
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
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="single"
                columns={columns}
                data={data}
                rowIdField="id"
                selectedRowIds={[data[0].id, data[1].id]}
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
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                selectedRowIds={[data[0].id, data[1].id]}
            />,
        );

        expect(getByTestId(wrapper, 'row-checkbox-0')
            .find('input')
            .prop('checked')).toBe(true);
        expect(getByTestId(wrapper, 'row-checkbox-1')
            .find('input')
            .prop('checked')).toBe(true);
    });

    test('should select all sub rows when selection parent row', async () => {
        const onSelectedRowIdsChange = jest.fn();
        const dataWithSubrows: TableData<TestData>[] = [
            {
                id: '0',
                column1: 'Hello',
                column2: 'World',
                subRows: [
                    {
                        id: '1',
                        column1: 'Hello',
                        column2: 'Planet',
                    },
                    {
                        id: '2',
                        column1: 'Hello',
                        column2: 'Galaxy',
                    },
                ],
            },
        ];
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={dataWithSubrows}
                rowIdField="id"
                onSelectedRowIdsChange={onSelectedRowIdsChange}
                expandChildrenOnRowSelection
            />,
        );

        getByTestId(wrapper, 'row-checkbox-0')
            .find('input')
            .simulate('change', { target: { checked: true } });

        expect(onSelectedRowIdsChange).toHaveBeenLastCalledWith(['0', '1', '2']);
        expect(getByTestId(wrapper, 'row-checkbox-0')
            .find('input')
            .prop('checked')).toBe(true);
        expect(getByTestId(wrapper, 'row-checkbox-1')
            .find('input')
            .prop('checked')).toBe(true);
        expect(getByTestId(wrapper, 'row-checkbox-2')
            .find('input')
            .prop('checked')).toBe(true);
    });

    test('should exclude group row from selectedRows callback', async () => {
        const onSelectedRowIdsChange = jest.fn();
        const onSelectedRowChange = jest.fn();
        const dataWithSubRows: TableData<TestData>[] = [
            {
                id: '0',
                column1: 'Hello',
                column2: 'World',
                subRows: [
                    {
                        id: '1',
                        column1: 'Hello',
                        column2: 'Planet',
                    },
                    {
                        id: '2',
                        column1: 'Hello',
                        column2: 'Galaxy',
                    },
                ],
            },
        ];
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={dataWithSubRows}
                rowIdField="id"
                excludeGroupsFromSelection
                onSelectedRowIdsChange={onSelectedRowIdsChange}
                onSelectedRowsChange={onSelectedRowChange}
                expandChildrenOnRowSelection
            />,
        );

        getByTestId(wrapper, 'row-checkbox-0')
            .find('input')
            .simulate('change', { target: { checked: true } });

        expect(onSelectedRowIdsChange).toHaveBeenLastCalledWith(['1', '2']);
        expect(onSelectedRowChange).toHaveBeenLastCalledWith(dataWithSubRows[0].subRows);
        expect(getByTestId(wrapper, 'row-checkbox-0')
            .find('input')
            .prop('checked')).toBe(true);
        expect(getByTestId(wrapper, 'row-checkbox-1')
            .find('input')
            .prop('checked')).toBe(true);
        expect(getByTestId(wrapper, 'row-checkbox-2')
            .find('input')
            .prop('checked')).toBe(true);
    });
});
