import {
    Button,
    Heading,
    Pagination,
    Table,
    type TableColumn,
    type TableData,
    type TableProps,
    type TableRowId,
    TextInput,
    Tooltip,
} from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { rawCodeParameters } from './utils/parameters';

const meta: Meta<typeof Table> = {
    title: 'Components/Data Table',
    component: Table,
    parameters: rawCodeParameters,
};

export default meta;

type Story = StoryObj<typeof Table>;

interface Data {
    column1: string;
    column2: string;
    column3: string;
    column4?: string;
}

export const Default: Story = {
    render(args) {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
            },
            {
                column1: 'c',
                column2: 'c',
                column3: 'c',
            },
        ];
        return (
            <Table<Data>
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...args as TableProps<Data>}
                columns={columns}
                data={data}
                rowIdField="column1"
            />
        );
    },
};

export const WithCaption: Story = {
    render(args) {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
            },
            {
                column1: 'c',
                column2: 'c',
                column3: 'c',
            },
        ];
        return (
            <Table<Data>
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...args as TableProps<Data>}
                caption="Table caption"
                captionSize="large"
                columns={columns}
                data={data}
                rowIdField="column1"
            />
        );
    },
};

export const WithHeading: Story = {
    render() {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
            },
            {
                column1: 'c',
                column2: 'c',
                column3: 'c',
            },
        ];
        return (
            <>
                <Heading id="with-heading-heading-id" type="medium">Table Heading</Heading>
                <Table<Data>
                    columns={columns}
                    data={data}
                    rowIdField="column1"
                    ariaLabelledBy="with-heading-heading-id"
                />
            </>
        );
    },
};

export const WithSummary: Story = {
    render() {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
            },
            {
                column1: 'c',
                column2: 'c',
                column3: 'c',
            },
        ];
        return (
            <>
                <p id="with-summary-description-id">
                    This is a summary of the table. It provides an overview of the dataset,
                    displaying key information across multiple columns. It allows users to sort,
                    filter, and interact with the data efficiently.
                </p>
                <Table<Data>
                    columns={columns}
                    data={data}
                    rowIdField="column1"
                    ariaDescribedBy="with-summary-description-id"
                />
            </>
        );
    },
};

const StyledTable = styled(
    ({ className, columns, data }) => (
        <Table<Data> className={className} columns={columns} data={data} rowIdField="column1" />
    ),
)`
    .column-1 {
        box-sizing: border-box;
        width: 150px;
    }

    .column-2 {
        box-sizing: border-box;
        width: 300px;
    }
`;

export const WithColumnClassnames: Story = {
    render() {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
                className: 'column-1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
                className: 'column-2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
                className: 'column-3',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
            },
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
        ];
        return (
            <StyledTable columns={columns} data={data} />
        );
    },
};

interface FooterData {
    column1: string;
    column2: string;
    numbers: number;
}

export const WithFooter: Story = {
    render() {
        const data: TableData<FooterData>[] = [
            {
                column1: 'a',
                column2: 'a',
                numbers: 10,
            },
            {
                column1: 'b',
                column2: 'b',
                numbers: 20,
            },
            {
                column1: 'a',
                column2: 'a',
                numbers: 30,
            },
        ];

        // Footer function for the 'numbers' column
        const footerSum = (): ReactElement => {
            const total = (data as FooterData[]).reduce((sum, row) => row.numbers + sum, 0);
            return (
                <span>
                    Total:
                    {total}
                </span>
            );
        };

        // Calculate the total sum of 'numbers'
        const columns: TableColumn<FooterData>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
                footer: 'Footer with colspan',
                footerColSpan: 2,
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
                footerColSpan: 0,
            },
            {
                header: 'Numbers',
                accessorKey: 'numbers',
                footer: footerSum,
            },
        ];

        return (
            <Table<FooterData> columns={columns} data={data} rowIdField="column1" />
        );
    },
};

export const ErrorRows: Story = {
    render() {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
                error: true,
            },
            {
                column1: 'c',
                column2: 'c',
                column3: 'c',
                error: true,
            },
        ];
        return (
            <Table<Data> columns={columns} data={data} rowIdField="column1" />
        );
    },
};

export const Striped: Story = {
    render() {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
            },
            {
                column1: 'c',
                column2: 'c',
                column3: 'c',
            },
        ];
        return (
            <Table<Data> striped columns={columns} data={data} rowIdField="column1" />
        );
    },
};

export const RowNumbers: Story = {
    render() {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
            },
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
        ];
        return (
            <Table<Data> rowNumbers columns={columns} data={data} rowIdField="column1" />
        );
    },
};

export const SmallRows: Story = {
    render() {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
            },
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
        ];
        return (
            <Table<Data> rowSize="small" columns={columns} data={data} rowIdField="column1" />
        );
    },
};

export const LargeRows: Story = {
    render() {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
            },
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
        ];
        return (
            <Table<Data> rowSize="large" columns={columns} data={data} rowIdField="column1" />
        );
    },
};

export const RowClickCallback: Story = {
    render() {
        interface DataWithHref {
            column1: string;
            column2: string;
            column3: string;
            href: string;
        }

        const columns: TableColumn<DataWithHref>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<DataWithHref>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
                href: '/row1',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
                href: '/row2',
            },
        ];

        return (
            <Table<DataWithHref>
                columns={columns}
                data={data}
                rowIdField="column1"
                onRowClick={(row) => {
                    console.info('row: ', row);
                    console.info('href: ', (row.original as DataWithHref).href);
                }}
            />
        );
    },
};

export const CustomTextAlignment: Story = {
    render() {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
                textAlign: 'center',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
                textAlign: 'right',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'Hello',
                column2: 'World',
                column3: 'Hello',
            },
            {
                column1: 'Hello',
                column2: 'World',
                column3: 'Hello',
            },
        ];

        return (
            <Table<Data> columns={columns} data={data} rowIdField="column1" />
        );
    },
};

interface ComplexData {
    category: {
        value: string;
        tooltip?: string;
    };
    amount?: string;
    id: string;
}

const CategoryCell = ({ cellValue }: { cellValue: ComplexData['category'] }): ReactElement => {
    const { value, tooltip } = cellValue;

    return (
        <div style={{ display: 'flex' }}>
            <p style={{ marginRight: 'var(--spacing-half)' }}>{value}</p>
            {tooltip && <Tooltip label={tooltip} />}
        </div>
    );
};

const AmountHeader = (): ReactElement => (
    <div style={{ textAlign: 'right' }}>Amount ($)</div>
);
const AmountCell = ({ cellValue }: { cellValue: ComplexData['amount'] }): ReactElement => (
    <div style={{ textAlign: 'right' }}>{cellValue}</div>
);

export const CustomColumns: Story = {
    render() {
        const data: TableData<ComplexData>[] = [
            {
                category: {
                    value: 'Safety fund',
                    tooltip: 'Money for emergencies',
                },
                amount: '2000$',
                id: '0',
            },
            {
                category: {
                    value: 'Investments',
                },
                amount: '12000$',
                id: '1',
            },
        ];

        const columns: TableColumn<ComplexData>[] = [
            {
                header: 'Category',
                accessorKey: 'category',
                // eslint-disable-next-line react/no-unstable-nested-components
                cell: (props) => <CategoryCell cellValue={props.cell.getValue() as ComplexData['category']} />,
            },
            {
                header: AmountHeader,
                accessorKey: 'amount',
                // eslint-disable-next-line react/no-unstable-nested-components
                cell: (props) => <AmountCell cellValue={props.cell.getValue() as ComplexData['amount']} />,
            },
        ];

        return (
            <Table<ComplexData> columns={columns} data={data} rowIdField="id" />
        );
    },
};

export const SortableRows: Story = {
    render() {
        interface SortableData {
            column1: string;
            column2: string;
            column3: number;
            column4: string;
        }

        const columns: TableColumn<SortableData>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
                sortable: true,
                textAlign: 'right',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
                sortable: true,
                textAlign: 'center',
            },
            {
                header: 'Custom sort by length',
                accessorKey: 'column4',
                sortable: true,
                sortingFn: (rowA, rowB) => {
                    const a = rowA.original.column4;
                    const b = rowB.original.column4;

                    if (a.length === b.length) {
                        return 0;
                    }

                    return a.length > b.length ? 1 : -1;
                },
            },
        ];

        const data: TableData<SortableData>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 10,
                column4: 'short',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 20,
                column4: 'loooooong',
            },
        ];
        return (
            <Table<SortableData>
                columns={columns}
                data={data}
                rowIdField="column1"
                defaultSort={{ id: 'column2', desc: false }}
            />
        );
    },
};

export const MultipleSelectableRows: Story = {
    render() {
        interface SelectableData {
            column1: string;
            column2: string;
            column3: number;
        }

        const columns: TableColumn<SelectableData>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<SelectableData>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 10,
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 20,
            },
        ];
        return (
            <Table<SelectableData>
                rowSelectionMode="multiple"
                columns={columns}
                data={data}
                rowIdField="column1"
                onSelectedRowIdsChange={console.info}
            />
        );
    },
};

interface ExpandableData {
    id: string;
    name: string;
}

const expandableDataColumns: TableColumn<ExpandableData>[] = [
    {
        header: 'ID',
        accessorKey: 'id',
    },
    {
        header: 'Name',
        accessorKey: 'name',
    },
];

const ROWS_PER_PAGE = 5;

function generateData(totalRows: number): TableData<ExpandableData>[] {
    return new Array(totalRows).fill(null).map((_, index) => {
        const page = Math.floor(index / ROWS_PER_PAGE) + 1;
        return {
            id: `${page}-${index}`,
            name: `Row ${page}-${index}`,
            subRows: [
                { id: `${page}-${index}.A`, name: `Row ${page}-${index}.A` },
                { id: `${page}-${index}.B`, name: `Row ${page}-${index}.B` },
            ],
        };
    });
}

export const MultipleSelectableExpandableSubRows: Story = {
    render() {
        const [selectedRowIds, setSelectedRowIds] = useState<TableRowId[]>([]);

        const data: TableData<ExpandableData>[] = [
            {
                id: '1',
                name: 'AAA',
                subRows: [
                    { id: '1.A', name: 'AAA-1' },
                    { id: '1.B', name: 'AAA-2' },
                ],
            },
            {
                id: '2',
                name: 'BBB',
                subRows: [
                    { id: '2.A', name: 'BBB-1' },
                    { id: '2.B', name: 'BBB-2' },
                ],
            },
        ];

        return (
            <Table<ExpandableData>
                expandableRows="multiple"
                rowSelectionMode="multiple"
                columns={expandableDataColumns}
                data={data}
                rowIdField="id"
                selectedRowIds={selectedRowIds}
                onSelectedRowIdsChange={setSelectedRowIds}
                expandChildrenOnRowSelection
                hideSelectAll
            />
        );
    },
};

export const PaginatedMultipleSelectableExpandableSubRows: Story = {
    render() {
        const TOTAL_PAGES = 3;
        const data = useMemo(() => generateData(ROWS_PER_PAGE * TOTAL_PAGES), []);

        const [selectedRowIds, setSelectedRowIds] = useState<TableRowId[]>([]);
        const [currentPage, setCurrentPage] = useState(1);

        const currentData = useMemo(
            () => data.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE),
            [data, currentPage],
        );

        return (
            <>
                <Table<ExpandableData>
                    expandableRows="multiple"
                    rowSelectionMode="multiple"
                    columns={expandableDataColumns}
                    data={currentData}
                    rowIdField="id"
                    selectedRowIds={selectedRowIds}
                    onSelectedRowIdsChange={(ids: TableRowId[]) => {
                        console.info(ids);
                        setSelectedRowIds(ids);
                    }}
                    expandChildrenOnRowSelection
                />
                <Pagination
                    resultsPerPage={ROWS_PER_PAGE}
                    numberOfResults={data.length}
                    activePage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    pagesShown={5}
                />
            </>
        );
    },
};

export const SingleSelectableRows: Story = {
    render() {
        interface SelectableData {
            column1: string;
            column2: string;
            column3: number;
        }

        const columns: TableColumn<SelectableData>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
            },
        ];

        const data: TableData<SelectableData>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 10,
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 20,
            },
        ];
        return (
            <Table
                rowSelectionMode="single"
                columns={columns}
                data={data}
                rowIdField="column1"
                onSelectedRowIdsChange={console.info}
                ariaLabelledByColumnId="column2"
            />
        );
    },
};

export const ExpandableSubrowsMultiple: Story = {
    render() {
        const data: TableData<ExpandableData>[] = [
            {
                id: '1',
                name: 'AAA',
                subRows: [
                    { id: '1.A', name: 'AAA-1' },
                    { id: '1.B', name: 'AAA-2' },
                ],
            },
            {
                id: '2',
                name: 'BBB',
                subRows: [
                    { id: '2.A', name: 'BBB-1' },
                    { id: '2.B', name: 'BBB-2' },
                ],
            },
        ];
        return (
            <Table<ExpandableData>
                columns={expandableDataColumns}
                data={data}
                rowIdField="id"
                expandableRows="multiple"
            />
        );
    },
};

export const ExpandableSubrowsSingle: Story = {
    render() {
        const data: TableData<ExpandableData>[] = [
            {
                id: '1',
                name: 'AAA',
                subRows: [
                    { id: '1.1', name: 'AAA-1' },
                    { id: '1.2', name: 'AAA-2' },
                ],
            },
            {
                id: '2',
                name: 'BBB',
                subRows: [
                    { id: '2.1', name: 'BBB-1' },
                    { id: '2.2', name: 'BBB-2' },
                ],
            },
        ];
        return (
            <Table<ExpandableData>
                columns={expandableDataColumns}
                data={data}
                rowIdField="id"
                expandableRows="single"
            />
        );
    },
};

export const ExpandableSubContent: Story = {
    render() {
        const data: TableData<ExpandableData>[] = [
            {
                id: '1',
                name: 'AAA',
                subContent: 'Sub content in plain text',
            },
            {
                id: '2',
                name: 'BBB',
                subContent: (
                    <>
                        Sub content with HTML
                        <br />
                        <b>BBB</b>
                    </>
                ),
            },
        ];

        return (
            <Table<ExpandableData>
                columns={expandableDataColumns}
                data={data}
                rowIdField="id"
                expandableRows="single"
            />
        );
    },
};

export const Grouping: Story = {
    args: {
        expandableRows: 'multiple',
    },
    render(args): ReactElement {
        interface GroupingData {
            id: string;
            name: string;
        }

        const columns: TableColumn<GroupingData>[] = [
            {
                header: 'Name',
                accessorKey: 'name',
                sortable: true,
            },
            {
                header: 'ID',
                accessorKey: 'id',
                sortable: true,
            },
        ];

        const data: TableData<GroupingData>[] = [
            {
                id: '0',
                name: 'Group A',
                subRows: [
                    { id: '1.A', name: 'AAA-1' },
                    { id: '1.B', name: 'AAA-2' },
                ],
            },
            {
                id: '1',
                name: 'Group C',
                subRows: [
                    { id: '3.A', name: 'CCC-1' },
                    { id: '3.B', name: 'CCC-2' },
                ],
            },
            {
                id: '2',
                name: 'Group B',
                subRows: [
                    { id: '2.A', name: 'BBB-1' },
                    { id: '2.B', name: 'BBB-2' },
                ],
            },
        ];

        return (
            <Table<GroupingData>
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...args as TableProps<GroupingData>}
                columns={columns}
                data={data}
                rowIdField="id"
                rowSelectionMode="multiple"
            />
        );
    },
};

interface StickyData {
    column1: string;
    column2: string;
    column3: string;
    column4: string;
    column5: string;
    column6: string;
    column7: string;
    column8: string;
    column9: string;
    column10: string;
    column11: string;
    column12: string;
    column13: string;
    column14: string;
    column15: string;
}

const ScrollableWrap = styled.div`
    max-height: 400px;
    overflow: auto;
`;

export const Sticky: Story = {
    render() {
        const columns: TableColumn<StickyData>[] = [
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
            {
                header: 'Column 4',
                accessorKey: 'column4',
            },
            {
                header: 'Column 5',
                accessorKey: 'column5',
            },
            {
                header: 'Column 6',
                accessorKey: 'column6',
            },
            {
                header: 'Column 7',
                accessorKey: 'column7',
            },
            {
                header: 'Column 8',
                accessorKey: 'column8',
            },
            {
                header: 'Column 9',
                accessorKey: 'column9',
            },
            {
                header: 'Column 10',
                accessorKey: 'column10',
            },
            {
                header: 'Column 11',
                accessorKey: 'column11',
            },
            {
                header: 'Column 12',
                accessorKey: 'column12',
            },
            {
                header: 'Column 13',
                accessorKey: 'column13',
            },
            {
                header: 'Column 14',
                accessorKey: 'column14',
            },
            {
                header: 'Column 15',
                accessorKey: 'column15',
            },
        ];

        const data: TableData<StickyData>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
                column4: 'a',
                column5: 'a',
                column6: 'a',
                column7: 'a',
                column8: 'a',
                column9: 'a',
                column10: 'a',
                column11: 'a',
                column12: 'a',
                column13: 'a',
                column14: 'a',
                column15: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
                column4: 'b',
                column5: 'b',
                column6: 'b',
                column7: 'b',
                column8: 'b',
                column9: 'b',
                column10: 'b',
                column11: 'b',
                column12: 'b',
                column13: 'b',
                column14: 'b',
                column15: 'b',
            },
            {
                column1: 'c',
                column2: 'c',
                column3: 'c',
                column4: 'c',
                column5: 'c',
                column6: 'c',
                column7: 'c',
                column8: 'c',
                column9: 'c',
                column10: 'c',
                column11: 'c',
                column12: 'c',
                column13: 'c',
                column14: 'c',
                column15: 'c',
                error: true,
            },
            {
                column1: 'd',
                column2: 'd',
                column3: 'd',
                column4: 'd',
                column5: 'd',
                column6: 'd',
                column7: 'd',
                column8: 'd',
                column9: 'd',
                column10: 'd',
                column11: 'd',
                column12: 'd',
                column13: 'd',
                column14: 'd',
                column15: 'd',
            },
            {
                column1: 'e',
                column2: 'e',
                column3: 'e',
                column4: 'e',
                column5: 'e',
                column6: 'e',
                column7: 'e',
                column8: 'e',
                column9: 'e',
                column10: 'e',
                column11: 'e',
                column12: 'e',
                column13: 'e',
                column14: 'e',
                column15: 'e',
            },
            {
                column1: 'f',
                column2: 'f',
                column3: 'f',
                column4: 'f',
                column5: 'f',
                column6: 'f',
                column7: 'f',
                column8: 'f',
                column9: 'f',
                column10: 'f',
                column11: 'f',
                column12: 'f',
                column13: 'f',
                column14: 'f',
                column15: 'f',
            },
            {
                column1: 'g',
                column2: 'g',
                column3: 'g',
                column4: 'g',
                column5: 'g',
                column6: 'g',
                column7: 'g',
                column8: 'g',
                column9: 'g',
                column10: 'g',
                column11: 'g',
                column12: 'g',
                column13: 'g',
                column14: 'g',
                column15: 'g',
            },
            {
                column1: 'h',
                column2: 'h',
                column3: 'h',
                column4: 'h',
                column5: 'h',
                column6: 'h',
                column7: 'h',
                column8: 'h',
                column9: 'h',
                column10: 'h',
                column11: 'h',
                column12: 'h',
                column13: 'h',
                column14: 'h',
                column15: 'h',
            },
            {
                column1: 'i',
                column2: 'i',
                column3: 'i',
                column4: 'i',
                column5: 'i',
                column6: 'i',
                column7: 'i',
                column8: 'i',
                column9: 'i',
                column10: 'i',
                column11: 'i',
                column12: 'i',
                column13: 'i',
                column14: 'i',
                column15: 'i',
            },
        ];

        return (
            <ScrollableWrap>
                <Table<StickyData>
                    columns={columns}
                    data={data}
                    rowIdField="column1"
                    stickyHeader
                    onRowClick={(row) => console.info('row: ', row)}
                />
            </ScrollableWrap>
        );
    },
};

interface StickyHeaderFooterData {
    column1: string;
    column2: string;
    column3: string;
    column4: string;
}

export const StickyFooter: Story = {
    render() {
        const columns: TableColumn<StickyHeaderFooterData>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
                footer: 'Footer 1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
                footer: 'Footer 2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
                footer: 'Footer 3',
            },
            {
                header: 'Column 4',
                accessorKey: 'column4',
                footer: 'Footer 4',
            },
        ];

        const data: TableData<StickyHeaderFooterData>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
                column4: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
                column4: 'b',
            },
            {
                column1: 'c',
                column2: 'c',
                column3: 'c',
                column4: 'c',
            },
            {
                column1: 'd',
                column2: 'd',
                column3: 'd',
                column4: 'd',
            },
            {
                column1: 'e',
                column2: 'e',
                column3: 'e',
                column4: 'e',
            },
            {
                column1: 'f',
                column2: 'f',
                column3: 'f',
                column4: 'f',
            },
            {
                column1: 'g',
                column2: 'g',
                column3: 'g',
                column4: 'g',
            },
            {
                column1: 'h',
                column2: 'h',
                column3: 'h',
                column4: 'h',
            },
            {
                column1: 'i',
                column2: 'i',
                column3: 'i',
                column4: 'i',
            },
        ];

        return (
            <ScrollableWrap>
                <Table<StickyHeaderFooterData>
                    columns={columns}
                    data={data}
                    rowIdField="column1"
                    stickyFooter
                    onRowClick={(row) => console.info('row: ', row)}
                />
            </ScrollableWrap>
        );
    },
};

export const StickyHeaderAndFooter: Story = {
    render() {
        const columns: TableColumn<StickyHeaderFooterData>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
                footer: 'Footer 1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
                footer: 'Footer 2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
                footer: 'Footer 3',
            },
            {
                header: 'Column 4',
                accessorKey: 'column4',
                footer: 'Footer 4',
            },
        ];

        const data: TableData<StickyHeaderFooterData>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
                column4: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
                column4: 'b',
            },
            {
                column1: 'c',
                column2: 'c',
                column3: 'c',
                column4: 'c',
            },
            {
                column1: 'd',
                column2: 'd',
                column3: 'd',
                column4: 'd',
            },
            {
                column1: 'e',
                column2: 'e',
                column3: 'e',
                column4: 'e',
            },
            {
                column1: 'f',
                column2: 'f',
                column3: 'f',
                column4: 'f',
            },
            {
                column1: 'g',
                column2: 'g',
                column3: 'g',
                column4: 'g',
            },
            {
                column1: 'h',
                column2: 'h',
                column3: 'h',
                column4: 'h',
            },
            {
                column1: 'i',
                column2: 'i',
                column3: 'i',
                column4: 'i',
            },
        ];

        return (
            <ScrollableWrap>
                <Table<StickyHeaderFooterData>
                    columns={columns}
                    data={data}
                    rowIdField="column1"
                    stickyHeader
                    stickyFooter
                    onRowClick={(row) => console.info('row: ', row)}
                />
            </ScrollableWrap>
        );
    },
};

// https://github.com/styled-components/styled-components/issues/1803
const StyledTableWithBackground: typeof Table = styled(Table)`
    background: #a9cad8;
`;

export const WithBackgroundColor: Story = {
    render() {
        const columns: TableColumn<StickyHeaderFooterData>[] = [
            {
                header: 'Column 1',
                accessorKey: 'column1',
                footer: 'Footer 1',
            },
            {
                header: 'Column 2',
                accessorKey: 'column2',
                footer: 'Footer 2',
            },
            {
                header: 'Column 3',
                accessorKey: 'column3',
                footer: 'Footer 3',
            },
            {
                header: 'Column 4',
                accessorKey: 'column4',
                footer: 'Footer 4',
            },
        ];

        const data: TableData<StickyHeaderFooterData>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
                column4: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
                column4: 'b',
            },
            {
                column1: 'c',
                column2: 'c',
                column3: 'c',
                column4: 'c',
            },
            {
                column1: 'd',
                column2: 'd',
                column3: 'd',
                column4: 'd',
            },
            {
                column1: 'e',
                column2: 'e',
                column3: 'e',
                column4: 'e',
            },
            {
                column1: 'f',
                column2: 'f',
                column3: 'f',
                column4: 'f',
            },
            {
                column1: 'g',
                column2: 'g',
                column3: 'g',
                column4: 'g',
            },
            {
                column1: 'h',
                column2: 'h',
                column3: 'h',
                column4: 'h',
            },
            {
                column1: 'i',
                column2: 'i',
                column3: 'i',
                column4: 'i',
            },
        ];

        return (
            <ScrollableWrap>
                <StyledTableWithBackground<StickyHeaderFooterData>
                    rowSelectionMode="multiple"
                    stickyHeader
                    stickyFooter
                    columns={columns}
                    data={data}
                    rowIdField="column1"
                    onSelectedRowIdsChange={console.info}
                />
            </ScrollableWrap>
        );
    },
};

export const HeaderAriaLabel: Story = {
    render() {
        const columns: TableColumn<Data>[] = [
            {
                header: 'Column with text',
                accessorKey: 'column1',
                headerAriaLabel: '',
            },
            {
                header: '',
                accessorKey: 'column2',
                headerAriaLabel: 'Column 2 aria label',
            },
            {
                header: 'Column 3 with text',
                accessorKey: 'column3',
                headerAriaLabel: '',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
            },
        ];
        return (
            <Table<Data> columns={columns} data={data} rowIdField="column1" />
        );
    },
};

export const GroupedHeaders: Story = {
    render() {
        const columns: TableColumn<Data>[] = [
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
                textAlign: 'center',
            },
            {
                header: 'Group 3',
                columns: [
                    {
                        header: 'Column 4',
                        accessorKey: 'column4',
                    },
                ],
                textAlign: 'right',
            },
        ];

        const data: TableData<Data>[] = [
            {
                column1: 'a',
                column2: 'a',
                column3: 'a',
                column4: 'a',
            },
            {
                column1: 'b',
                column2: 'b',
                column3: 'b',
                column4: 'b',
            },
        ];

        return (
            <Table<Data> columns={columns} data={data} rowIdField="column1" />
        );
    },
};

interface OptimizationData {
    id: string;
    name: string;
    country: string;
}

export const Optimization: Story = {
    render() {
        const [data, setData] = useState<OptimizationData[]>([
            {
                id: '1',
                name: 'Jennifer',
                country: 'Canada',
            },
            {
                id: '2',
                name: 'William',
                country: 'USA',
            },
        ]);

        const [allowEditing, setAllowEditing] = useState<boolean>(true);

        const allowEditingRef = useRef<boolean>();
        allowEditingRef.current = allowEditing;

        const columns: TableColumn<OptimizationData>[] = useMemo(() => [
            {
                header: 'ID',
                accessorKey: 'id',
            },
            {
                header: 'Name',
                accessorKey: 'name',
                // eslint-disable-next-line react/no-unstable-nested-components
                cell: ({ row }) => (allowEditingRef.current ? (
                    <TextInput
                        noMargin
                        value={row.original.name}
                        onChange={(event) => {
                            setData((prev) => prev.map((d) => (
                                d.id === row.original.id
                                    ? { ...d, name: event.target.value }
                                    : d
                            )));
                        }}
                    />
                ) : row.original.name),
            },
            {
                header: 'Country',
                accessorKey: 'country',
            },
        ], []);

        return (
            <>
                <p>
                    When the component is re-rendering, it will always update the table with the provided data and
                    columns, even when you pass the same data and columns. But the very important key here is if you
                    pass a different **columns** object between renders, the table will UNMOUNT and RE-MOUNT every cell
                    instead of doing the usual React update. This will impact the performance and could create unwanted
                    behaviors. To prevent this, you should give the column definitions a stable identity by memoizing it
                    (ex: store it in a useMemo or useState hook).
                </p>
                <p style={{ marginBottom: '2rem' }}>
                    Additionally, if your columns use some dependencies, you can pass them via useRef instead, so you
                    don&apos;t have to recreate the columns object everytime the dependencies changes.
                </p>
                <p>
                    <Button type="button" buttonType="secondary" onClick={() => setAllowEditing(!allowEditing)}>
                        Toggle Editable
                    </Button>
                </p>
                <Table<OptimizationData>
                    columns={columns}
                    data={data}
                    rowIdField="id"
                />
            </>
        );
    },
};

interface TablePaginationData {
    id: string;
    age: number;
    country: string;
}

function makeData(): TableData<TablePaginationData>[] {
    const countries = ['Canada', 'United States', 'France', 'Germany', 'Italy', 'Spain', 'Portugal', 'Japan'];
    return [...Array(35).keys()].map((i) => ({
        id: `${i + 1}`,
        age: Math.floor(Math.random() * 90) + 10,
        country: countries[Math.floor(Math.random() * countries.length)],
    }));
}

export const TableWithPagination: Story = {
    render() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function sortFn(a: any, b: any, isDescending = false): number {
            let compareValue = 0;

            if (typeof a === 'string') {
                compareValue = a.localeCompare(b, 'en', { sensitivity: 'base' });
            } else if (typeof a === 'number') {
                compareValue = a - b;
            }

            if (isDescending) {
                return compareValue * -1;
            }

            return compareValue;
        }

        const ITEMS_PER_PAGE = 10;

        const [data, setData] = useState<TableData<TablePaginationData>[]>(makeData());
        const [currentPage, setCurrentPage] = useState(1);

        const columns: TableColumn<TablePaginationData>[] = useMemo(() => [
            {
                header: 'ID',
                accessorKey: 'id',
                sortable: true,
                sortDescFirst: false,
            },
            {
                header: 'Age',
                accessorKey: 'age',
                sortable: true,
            },
            {
                header: 'Country',
                accessorKey: 'country',
                sortable: true,
            },
        ], []);

        const currentPageData = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

        return (
            <>
                <Table<TablePaginationData>
                    columns={columns}
                    data={currentPageData}
                    rowIdField="id"
                    defaultSort={{ id: 'id', desc: false }}
                    onSort={(sort) => {
                        if (sort) {
                            const key = sort.id as keyof TablePaginationData;
                            setData([...data].sort((a, b) => sortFn(a[key], b[key], sort.desc)));
                        }
                    }}
                    manualSort
                />
                <Pagination
                    resultsPerPage={ITEMS_PER_PAGE}
                    numberOfResults={data.length}
                    activePage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    pagesShown={5}
                />
            </>
        );
    },
};
