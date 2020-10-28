import { ColumnsProps, Table, Tooltip } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Table',
    component: Table,
};

export const normal = () => {
    const columns: ColumnsProps = [
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

    const data = [
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

export const errorRows = () => {
    const columns: ColumnsProps = [
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

    const data = [
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

export const striped = () => {
    const columns: ColumnsProps = [
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

    const data = [
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

export const rowNumbers = () => {
    const columns: ColumnsProps = [
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

    const data = [
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

export const smallRows = () => {
    const columns: ColumnsProps = [
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

    const data = [
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

export const rowClickCallback = () => {
    const columns: ColumnsProps = [
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

    interface Data {
        column1: string;
        column2: string;
        column3: string;
        href: string;
    }

    const data: Data[] = [
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
        <Table<Data>
            columns={columns}
            data={data}
            onRowClick={(row) => {
                console.log('row: ', row);
                console.log('href: ', row.original.href);
            }}
        />
    );
};

export const customTextAlignment = () => {
    const columns: ColumnsProps = [
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

    const data = [
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

export const customColumns = () => {
    const columns: ColumnsProps = [
        {
            Header: 'Category',
            accessor: 'category',
            Cell: ({ value }: any) => (
                <div style={{ display: 'flex' }}>
                    <p style={{ marginRight: 'var(--spacing-half)' }}>{value.value}</p>
                    {value.tooltip && (<Tooltip>{value.tooltip}</Tooltip>)}
                </div>
            ),
        },
        {
            Header: () => <div style={{ textAlign: 'right' }}>Amount ($)</div>,
            accessor: 'amount',
            Cell: ({ value }: any) => <div style={{ textAlign: 'right' }}>{value}</div>,
        },
    ];

    interface Data {
        category: {
            value: string;
            tooltip?: string;
        };
        amount?: string;
    }

    const data: Data[] = [
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
        <Table<Data> columns={columns} data={data} />
    );
};

export const sortableRows = () => {
    const columns: ColumnsProps = [
        {
            Header: 'Column 1',
            accessor: 'column1',
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
            sortable: true,
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
            sortable: true,
        },
    ];

    const data = [
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
        <Table columns={columns} data={data} />
    );
};
