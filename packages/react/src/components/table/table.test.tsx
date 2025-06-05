import { RenderResult } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { Table, TableProps } from './table';
import { TableColumn } from './types';

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
    test('has desktop styles', () => {
        const { container } = renderTable(columns, 'desktop');

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has tablet styles', () => {
        const { container } = renderTable(columns, 'tablet');

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has mobile styles', () => {
        const { container } = renderTable(columns, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has custom text alignment', () => {
        const { container } = renderTable(columnsTextAligned);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has sorting styles', () => {
        const { container } = renderTable(columnsSorted, undefined, { defaultSort: { id: 'column1', desc: false } });

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has striped styles', () => {
        const { container } = renderTable(columns, undefined, { striped: true });

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has small rowSize styles', () => {
        const { container } = renderTable(columns, undefined, { rowSize: 'small' });

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has rowNumbers styles', () => {
        const { container } = renderTable(columns, undefined, { rowNumbers: true });

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has clickable rows styles', () => {
        const { container } = renderTable(columns, undefined, { onRowClick: jest.fn() });

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has error rows styles', () => {
        const { container } = renderWithProviders(
            <Table<TestData>
                columns={columns}
                data={errorData}
                rowIdField="id"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has selectable rows styles', () => {
        const { container } = renderWithProviders(
            <Table<TestData> rowSelectionMode="multiple" columns={columns} data={data} rowIdField="id" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has sticky header styles', () => {
        const { container } = renderWithProviders(
            <Table<TestData> stickyHeader columns={columns} data={data} rowIdField="id" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has sticky column styles', () => {
        const { container } = renderWithProviders(
            <Table<TestData3Columns> columns={columnsSticky} data={stickyColumnsData} rowIdField="id" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has aria-label on header columns', () => {
        const { container } = renderWithProviders(
            <Table<TestData>
                columns={columnsWithHeaderAriaLabel}
                data={data}
                rowIdField="id"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has column with headers grouped', () => {
        const { container } = renderWithProviders(
            <Table<TestData>
                columns={columnsWithHeadersGrouped}
                data={data}
                rowIdField="id"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
