import { Table } from '~/components/table/table';
import { TableColumn, TableData } from '~/components/table/types';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, mountWithTheme } from '../../test-utils/renderer';

interface TestData {
    id: string;
    column1: string;
    column2: string;
    error?: boolean;
}

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

const SELECT_ALL_CHECKBOX_TESTID = 'row-checkbox-all';

describe('Table', () => {
    it('should render table caption', () => {
        const wrapper = mountWithTheme(
            <Table<TestData>
                columns={columns}
                data={data}
                rowIdField="id"
                caption="Test Caption"
            />,
        );

        expect(wrapper.find('caption').text()).toBe('Test Caption');
    });

    it('should apply aria-labelledby attribute', () => {
        const headingId = 'table-heading';
        const wrapper = mountWithTheme(
            <>
                <h2 id={headingId}>Table Title</h2>
                <Table<TestData>
                    columns={columns}
                    data={data}
                    rowIdField="id"
                    ariaLabelledBy={headingId}
                />
            </>,
        );

        expect(wrapper.find('table').prop('aria-labelledby')).toBe(headingId);
    });

    it('should apply aria-describedby attribute', () => {
        const descriptionId = 'table-description';
        const wrapper = mountWithTheme(
            <>
                <p id={descriptionId}>This table describes important data.</p>
                <Table<TestData>
                    columns={columns}
                    data={data}
                    rowIdField="id"
                    ariaDescribedBy={descriptionId}
                />
            </>,
        );

        expect(wrapper.find('table').prop('aria-describedby')).toBe(descriptionId);
    });

    it('column sorting should be set to defaultSort value when defaultSort is set', () => {
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

    it('onRowClick callback is called when a row is clicked', () => {
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

    it('onSelectedRowIds is called when row-checkbox is checked', () => {
        const onSelectedRowIdsChange = jest.fn();
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                onSelectedRowIdsChange={onSelectedRowIdsChange}
            />,
        );

        getByTestId(wrapper, 'row-checkbox-0').find('input').simulate('change', { target: { checked: true } });

        expect(onSelectedRowIdsChange).toHaveBeenCalledWith([data[0].id]);
    });

    it('onSelectedRowIds is called with all rows when row-checkbox-all is checked', () => {
        const onSelectedRowIdsChange = jest.fn();
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                onSelectedRowIdsChange={onSelectedRowIdsChange}
            />,
        );

        getByTestId(wrapper, SELECT_ALL_CHECKBOX_TESTID).find('input')
            .simulate('change', { target: { checked: true } });

        expect(onSelectedRowIdsChange).toHaveBeenCalledWith(data.map((row) => row.id));
    });

    it('should hide select all checkbox', () => {
        const wrapper = mountWithTheme(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                hideSelectAll
            />,
        );

        expect(getByTestId(wrapper, SELECT_ALL_CHECKBOX_TESTID).exists()).toBe(false);
    });

    it('has radio buttons in single selection mode', () => {
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

    it('has single selection when selecting other row in single selection mode', () => {
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

    it('should select only one row when multiple selected rows are provided but selectionMode is single', () => {
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

    it('should select multiple rows when selectionMode is multiple', () => {
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

    it('should select all sub rows when selection parent row', () => {
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
});
