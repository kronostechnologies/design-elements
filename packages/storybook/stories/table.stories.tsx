import { Table, TableColumn, TableRow, Tooltip } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

export default {
    title: 'Structure/Table',
    component: Table,
};

interface Data {
    column1: string;
    column2: string;
    column3: string;
}

export const Normal: Story = () => {
    const columns: TableColumn<Data> = [
        {
            Header: 'Column 1',
            accessor: 'column1',
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
        },
    ];

    const data: TableRow<Data>[] = [
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

export const WithColumnClassnames: Story = () => {
    const StyledTable = styled(({ className, columns, data }) => <Table<Data> className={className} columns={columns} data={data} />)`
        .column-1 {
            box-sizing: border-box;
            width: 150px;
        }

        .column-2 {
            box-sizing: border-box;
            width: 300px;
        }
`;

    const columns: TableColumn<Data> = [
        {
            Header: 'Column 1',
            accessor: 'column1',
            className: 'column-1',
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
            className: 'column-2',
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
            className: 'column-3',
        },
    ];

    const data: TableRow<Data>[] = [
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

export const ErrorRows: Story = () => {
    const columns: TableColumn<Data> = [
        {
            Header: 'Column 1',
            accessor: 'column1',
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
        },
    ];

    const data: TableRow<Data>[] = [
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

export const striped: Story = () => {
    const columns: TableColumn<Data> = [
        {
            Header: 'Column 1',
            accessor: 'column1',
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
        },
    ];

    const data: TableRow<Data>[] = [
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
    const columns: TableColumn<Data> = [
        {
            Header: 'Column 1',
            accessor: 'column1',
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
        },
    ];

    const data: TableRow<Data>[] = [
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
    const columns: TableColumn<Data> = [
        {
            Header: 'Column 1',
            accessor: 'column1',
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
        },
    ];

    const data: TableRow<Data>[] = [
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

export const RowClickCallback: Story = () => {
    interface DataWithHref {
        column1: string;
        column2: string;
        column3: string;
        href: string;
    }

    const columns: TableColumn<DataWithHref> = [
        {
            Header: 'Column 1',
            accessor: 'column1',
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
        },
    ];

    const data: TableRow<DataWithHref>[] = [
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
    const columns: TableColumn<Data> = [
        {
            Header: 'Column 1',
            accessor: 'column1',
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
            textAlign: 'center',
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
            textAlign: 'right',
        },
    ];

    const data: TableRow<Data>[] = [
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

export const CustomColumns: Story = () => {
    interface ComplexData {
        category: {
            value: string;
            tooltip?: string;
        };
        amount?: string;
    }

    const columns: TableColumn<ComplexData> = [
        {
            Header: 'Category',
            accessor: 'category',
            Cell: ({ value }) => (
                <div style={{ display: 'flex' }}>
                    <p style={{ marginRight: 'var(--spacing-half)' }}>{value.value}</p>
                    {value.tooltip && (<Tooltip>{value.tooltip}</Tooltip>)}
                </div>
            ),
        },
        {
            Header: () => <div style={{ textAlign: 'right' }}>Amount ($)</div>,
            accessor: 'amount',
            Cell: ({ value }) => <div style={{ textAlign: 'right' }}>{value}</div>,
        },
    ];

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

    return (
        <Table<ComplexData> columns={columns} data={data} />
    );
};

export const SortableRows: Story = () => {
    interface SortableData {
        column1: string;
        column2: string;
        column3: number;
    }

    const columns: TableColumn<SortableData> = [
        {
            Header: 'Column 1',
            accessor: 'column1',
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
            sortable: true,
            defaultSort: 'asc',
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
            sortable: true,
        },
    ];

    const data: TableRow<SortableData>[] = [
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
        <Table<SortableData> columns={columns} data={data} />
    );
};

export const SelectableRows: Story = () => {
    interface SelectableData {
        column1: string;
        column2: string;
        column3: number;
    }

    const columns: TableColumn<SelectableData> = [
        {
            Header: 'Column 1',
            accessor: 'column1',
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
        },
    ];

    const data: TableRow<SelectableData>[] = [
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
        <Table<SelectableData> selectableRows columns={columns} data={data} onSelectedRowsChange={console.info} />
    );
};
