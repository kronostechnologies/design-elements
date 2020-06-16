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
    ];
    return (
        <Table columns={columns} data={data} />
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

    const data = [
        {
            column1: 'a',
            column2: 'a',
            column3: 'a',
            href: '/home',
        },
        {
            column1: 'b',
            column2: 'b',
            column3: 'b',
            href: '/contact',
        },
    ];

    return (
        <Table
            columns={columns}
            data={data}
            onRowClick={(row) => {
                if (row.original.href) console.log(row.original.href);
            }}
        />
    );
};

export const customTextAlignment = () => {
    const column: ColumnsProps = [
        {
            Header: 'Column 1',
            accessor: 'column1',
        },
        {
            Header: () => <div style={{ textAlign: 'center' }}>Column 2</div>,
            Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
            accessor: 'column2',
        },
        {
            Header: () => <div style={{ textAlign: 'right' }}>Column 3</div>,
            Cell: ({ value }) => <div style={{ textAlign: 'right' }}>{value}</div>,
            accessor: 'column3',
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
        <Table columns={column} data={data} />
    );
};

export const customColumns = () => {
    const column: ColumnsProps = [
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

    const data = [
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
        <Table columns={column} data={data} />
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
            sort: true,
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
            sort: true,
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
