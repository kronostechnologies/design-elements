import { ReactElement, useMemo, useRef, useState } from 'react';
import { Button, Pagination, Table, TableColumn, TableData, TextInput, Tooltip } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Data Table',
    component: Table,
    parameters: rawCodeParameters,
    tags: ['autodocs'],
};

interface Data {
    column1: string;
    column2: string;
    column3: string;
}

export const Default: Story = () => {
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
        <Table columns={columns} data={data} />
    );
};

const StyledTable = styled(
    ({ className, columns, data }) => (<Table<Data> className={className} columns={columns} data={data} />),
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

export const WithColumnClassnames: Story = () => {
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
};

interface FooterData {
    column1: string;
    column2: string;
    numbers: number;
}

export const WithFooter: Story = () => {
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
        const total = data.reduce((sum, row) => row.numbers + sum, 0);
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
        <Table columns={columns} data={data} />
    );
};

export const ErrorRows: Story = () => {
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
        <Table columns={columns} data={data} />
    );
};

export const Striped: Story = () => {
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
        <Table striped columns={columns} data={data} />
    );
};

export const RowNumbers: Story = () => {
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
        <Table rowNumbers columns={columns} data={data} />
    );
};

export const SmallRows: Story = () => {
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
        <Table rowSize="small" columns={columns} data={data} />
    );
};

export const LargeRows: Story = () => {
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
        <Table rowSize="large" columns={columns} data={data} />
    );
};

export const RowClickCallback: Story = () => {
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
            onRowClick={(row) => {
                console.info('row: ', row);
                console.info('href: ', row.original.href);
            }}
        />
    );
};

export const CustomTextAlignment: Story = () => {
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
        <Table columns={columns} data={data} />
    );
};

interface ComplexData {
    category: {
        value: string;
        tooltip?: string;
    };
    amount?: string;
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

export const CustomColumns: Story = () => {
    const data: ComplexData[] = [
        {
            category: {
                value: 'Safety fund',
                tooltip: 'Money for emergencies',
            },
            amount: '2000$',
        },
        {
            category: {
                value: 'Investments',
            },
            amount: '12000$',
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
        <Table columns={columns} data={data} />
    );
};

export const SortableRows: Story = () => {
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
        },
        {
            header: 'Column 3',
            accessorKey: 'column3',
            sortable: true,
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
        <Table columns={columns} data={data} defaultSort={{ id: 'column2', desc: false }} />
    );
};

export const SelectableRows: Story = () => {
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
        <Table selectableRows columns={columns} data={data} onSelectedRowsChange={console.info} />
    );
};

export const ExpandableSubrowsMultiple: Story = () => {
    interface ExpandableData {
        id: string;
        name: string;
    }

    const columns: TableColumn<ExpandableData>[] = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Name',
            accessorKey: 'name',
        },
    ];

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
        <Table
            columns={columns}
            data={data}
            expandableRows='multiple'
        />
    );
};

export const ExpandableSubrowsSingle: Story = () => {
    interface ExpandableData {
        id: string;
        name: string;
    }

    const columns: TableColumn<ExpandableData>[] = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Name',
            accessorKey: 'name',
        },
    ];

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
        <Table
            columns={columns}
            data={data}
            expandableRows='single'
        />
    );
};

export const ExpandableSubContent: Story = () => {
    interface ExpandableData {
        id: string;
        name: string;
    }

    const columns: TableColumn<ExpandableData>[] = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Name',
            accessorKey: 'name',
        },
    ];

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
        <Table
            columns={columns}
            data={data}
            expandableRows='single'
        />
    );
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

export const Sticky: Story = () => {
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
            <Table columns={columns} data={data} stickyHeader onRowClick={(row) => console.info('row: ', row)} />
        </ScrollableWrap>
    );
};

interface StickyHeaderFooterData {
    column1: string;
    column2: string;
    column3: string;
    column4: string;
}

export const StickyFooter: Story = () => {
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
            <Table columns={columns} data={data} stickyFooter onRowClick={(row) => console.info('row: ', row)} />
        </ScrollableWrap>
    );
};

export const StickyHeaderAndFooter: Story = () => {
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
            <Table
                columns={columns}
                data={data}
                stickyHeader
                stickyFooter
                onRowClick={(row) => console.info('row: ', row)}
            />
        </ScrollableWrap>
    );
};

const StyledTableWithBackground = styled(Table<StickyHeaderFooterData>)`
    background: #a9cad8;
`;

export const WithBackgroundColor: Story = () => {
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
            <StyledTableWithBackground
                selectableRows
                stickyHeader
                stickyFooter
                columns={columns}
                data={data}
                onSelectedRowsChange={console.info}
            />
        </ScrollableWrap>
    );
};

export const HeaderAriaLabel: Story = () => {
    const columns: TableColumn<Data>[] = [
        {
            header: 'Column with text',
            headerAriaLabel: '',
            accessorKey: 'column1',
        },
        {
            header: '',
            headerAriaLabel: 'Column 2 aria label',
            accessorKey: 'column2',
        },
        {
            header: 'Column 3 with text',
            headerAriaLabel: '',
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
    ];
    return (
        <Table columns={columns} data={data} />
    );
};

export const GroupedHeaders: Story = () => {
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
        <Table columns={columns} data={data} />
    );
};

interface OptimizationData {
    id: number;
    name: string;
    country: string;
}

/**
 * When the components is re-rendering, it will always update the table with the provided data and columns, even when
 * you pass the same data and columns. But the very important key here is if you pass a different **columns** object
 * between renders, the table will UNMOUNT and RE-MOUNT every cell instead of doing the usual React update. This will
 * impact the performance and could create unwanted behaviors. So to prevent that, you should give the column
 * definitions a stable identity by memoizing it (ex: store it in a useMemo or useState hook).
 *
 * Additionally, if your columns use some dependencies, you can pass them via useRef instead, so you don't have to
 * recreate the columns object everytime the dependencies changes.
 */
export const Optimization: Story = () => {
    const [data, setData] = useState<OptimizationData[]>([
        {
            id: 1,
            name: 'Jennifer',
            country: 'Canada',
        },
        {
            id: 2,
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
            <Button type="button" buttonType='secondary' onClick={() => setAllowEditing(!allowEditing)}>
                Toggle Editable
            </Button>
            <Table
                columns={columns}
                data={data}
            />
        </>
    );
};

interface TablePaginationData {
    id: number;
    age: number;
    country: string;
}

function makeData(): TableData<TablePaginationData>[] {
    const countries = ['Canada', 'United States', 'France', 'Germany', 'Italy', 'Spain', 'Portugal', 'Japan'];
    return [...Array(35).keys()].map((i) => ({
        id: i + 1,
        age: Math.floor(Math.random() * 90) + 10,
        country: countries[Math.floor(Math.random() * countries.length)],
    }));
}

export const TableWithPagination: Story = () => {
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
            <Table
                columns={columns}
                data={currentPageData}
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
};
