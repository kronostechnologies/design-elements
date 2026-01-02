import { type RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { type DeviceType } from '../device-context-provider';
import { Table, type TableProps } from './table';
import { type TableColumn, type TableData } from './types';

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
): RenderResult {
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
        textAlign: 'right',
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
    it('has desktop styles', () => {
        const { container } = renderTable(columns, 'desktop');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has tablet styles', () => {
        const { container } = renderTable(columns, 'tablet');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has mobile styles', () => {
        const { container } = renderTable(columns, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has custom text alignment', () => {
        const { container } = renderTable(columnsTextAligned);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has sorting styles', () => {
        const { container } = renderTable(columnsSorted, undefined, { defaultSort: { id: 'column1', desc: false } });

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has striped styles', () => {
        const { container } = renderTable(columns, undefined, { striped: true });

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has small rowSize styles', () => {
        const { container } = renderTable(columns, undefined, { rowSize: 'small' });

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has rowNumbers styles', () => {
        const { container } = renderTable(columns, undefined, { rowNumbers: true });

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has clickable rows styles', () => {
        const { container } = renderTable(columns, undefined, { onRowClick: jest.fn() });

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has error rows styles', () => {
        const { container } = renderWithProviders(
            <Table<TestData>
                columns={columns}
                data={errorData}
                rowIdField="id"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has selectable rows styles', () => {
        const { container } = renderWithProviders(
            <Table<TestData> rowSelectionMode="multiple" columns={columns} data={data} rowIdField="id" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has sticky header styles', () => {
        const { container } = renderWithProviders(
            <Table<TestData> stickyHeader columns={columns} data={data} rowIdField="id" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has sticky column styles', () => {
        const { container } = renderWithProviders(
            <Table<TestData3Columns> columns={columnsSticky} data={stickyColumnsData} rowIdField="id" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has aria-label on header columns', () => {
        const { container } = renderWithProviders(
            <Table<TestData>
                columns={columnsWithHeaderAriaLabel}
                data={data}
                rowIdField="id"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has column with headers grouped', () => {
        const { container } = renderWithProviders(
            <Table<TestData>
                columns={columnsWithHeadersGrouped}
                data={data}
                rowIdField="id"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render table caption', () => {
        renderWithProviders(
            <Table<TestData>
                columns={columns}
                data={data}
                rowIdField="id"
                caption="Test Caption"
            />,
        );

        expect(screen.getByText('Test Caption')).toBeInTheDocument();
    });

    it('should apply aria-labelledby attribute', () => {
        const headingId = 'table-heading';
        renderWithProviders(
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

        expect(screen.getByRole('table')).toHaveAttribute('aria-labelledby', headingId);
    });

    it('should apply aria-describedby attribute', () => {
        const descriptionId = 'table-description';
        renderWithProviders(
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

        expect(screen.getByRole('table')).toHaveAttribute('aria-describedby', descriptionId);
    });

    it('column sorting should be set to defaultSort value when defaultSort is set', () => {
        renderWithProviders(
            <Table<TestData>
                columns={columnsSorted}
                data={data}
                rowIdField="id"
                defaultSort={{ id: 'column1', desc: false }}
            />,
        );

        expect(screen.getByRole('columnheader', { name: 'Column 1' })).toHaveAttribute('aria-sort', 'ascending');
    });

    it('onRowClick callback is called when a row is clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                onRowClick={callback}
            />,
        );

        await user.click(screen.getByTestId('table-row-0'));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onSelectedRowIds is called when row-checkbox is checked', async () => {
        const onSelectedRowIdsChange = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                onSelectedRowIdsChange={onSelectedRowIdsChange}
            />,
        );

        const checkbox = screen.getByTestId('row-checkbox-0');
        await user.click(checkbox);

        expect(onSelectedRowIdsChange).toHaveBeenCalledWith([data[0].id]);
    });

    it('onSelectedRowIds is called with all rows when row-checkbox-all is checked', async () => {
        const onSelectedRowIdsChange = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                onSelectedRowIdsChange={onSelectedRowIdsChange}
            />,
        );

        const checkboxAll = screen.getByTestId('row-checkbox-all');
        await user.click(checkboxAll);

        expect(onSelectedRowIdsChange).toHaveBeenCalledWith(data.map((row) => row.id));
    });

    it('should hide select all checkbox', () => {
        renderWithProviders(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                hideSelectAll
            />,
        );

        expect(screen.queryByTestId('row-checkbox-all')).not.toBeInTheDocument();
    });

    it('has radio buttons in single selection mode', () => {
        renderWithProviders(
            <Table<TestData>
                rowSelectionMode="single"
                columns={columns}
                data={data}
                rowIdField="id"
            />,
        );

        const radio = screen.getByTestId('radiobutton-row-radiobutton-0');
        expect(radio).toHaveAttribute('type', 'radio');
    });

    it('has single selection when selecting other row in single selection mode', async () => {
        const user = userEvent.setup();
        renderWithProviders(
            <Table<TestData>
                rowSelectionMode="single"
                columns={columns}
                data={data}
                rowIdField="id"
            />,
        );

        const radio0 = screen.getByTestId('radiobutton-row-radiobutton-0');
        const radio1 = screen.getByTestId('radiobutton-row-radiobutton-1');

        await user.click(radio0);
        expect(radio0).toBeChecked();

        await user.click(radio1);
        expect(radio0).not.toBeChecked();
        expect(radio1).toBeChecked();
    });

    it('should select only one row when multiple selected rows are provided but selectionMode is single', () => {
        renderWithProviders(
            <Table<TestData>
                rowSelectionMode="single"
                columns={columns}
                data={data}
                rowIdField="id"
                selectedRowIds={[data[0].id, data[1].id]}
            />,
        );

        const radio0 = screen.getByTestId('radiobutton-row-radiobutton-0');
        const radio1 = screen.getByTestId('radiobutton-row-radiobutton-1');

        expect(radio0).toBeChecked();
        expect(radio1).not.toBeChecked();
    });

    it('should select multiple rows when selectionMode is multiple', () => {
        renderWithProviders(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="id"
                selectedRowIds={[data[0].id, data[1].id]}
            />,
        );

        const checkbox0 = screen.getByTestId('row-checkbox-0');
        const checkbox1 = screen.getByTestId('row-checkbox-1');

        expect(checkbox0).toBeChecked();
        expect(checkbox1).toBeChecked();
    });

    it('should select all sub rows when selection parent row', async () => {
        const onSelectedRowIdsChange = jest.fn();
        const user = userEvent.setup();
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
        renderWithProviders(
            <Table<TestData>
                rowSelectionMode="multiple"
                columns={columns}
                data={dataWithSubrows}
                rowIdField="id"
                onSelectedRowIdsChange={onSelectedRowIdsChange}
                expandChildrenOnRowSelection
            />,
        );

        const checkbox0 = screen.getByTestId('row-checkbox-0');
        await user.click(checkbox0);

        await waitFor(() => expect(onSelectedRowIdsChange).toHaveBeenLastCalledWith(['0', '1', '2']));
        expect(checkbox0).toBeChecked();

        const checkbox1 = screen.getByTestId('row-checkbox-1');
        const checkbox2 = screen.getByTestId('row-checkbox-2');

        expect(checkbox1).toBeChecked();
        expect(checkbox2).toBeChecked();
    });
});
