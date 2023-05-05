import { Table, TableColumn, TableRow, Tooltip } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Structure/Table',
    component: Table,
    parameters: rawCodeParameters,
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

export const Striped: Story = () => {
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

interface ComplexData {
    category: {
        value: string;
        tooltip?: string;
    };
    amount?: string;
}

interface CategoryCellProps {
    value: ComplexData['category'];
}

const CategoryCell: VoidFunctionComponent<CategoryCellProps> = ({ value }) => (
    <div style={{ display: 'flex' }}>
        <p style={{ marginRight: 'var(--spacing-half)' }}>{value.value}</p>
        {value.tooltip && (<Tooltip label={value.tooltip} />)}
    </div>
);

interface AmountCellProps {
    value: ComplexData['amount'];
}

const AmountHeader: VoidFunctionComponent = () => <div style={{ textAlign: 'right' }}>Amount ($)</div>;
const AmountCell: VoidFunctionComponent<AmountCellProps> = ({ value }) => (
    <div style={{ textAlign: 'right' }}>{value}</div>
);

export const CustomColumns: Story = () => {
    const columns: TableColumn<ComplexData> = [
        {
            Header: 'Category',
            accessor: 'category',
            Cell: CategoryCell,
        },
        {
            Header: AmountHeader,
            accessor: 'amount',
            Cell: AmountCell,
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
    column15: string,
}

const Wrap = styled.div`
    height: 200px;
    overflow: scroll;
`;

export const Sticky: Story = () => {
    const columns: TableColumn<StickyData> = [
        {
            Header: 'Column 1',
            accessor: 'column1',
            sticky: true,
        },
        {
            Header: 'Column 2',
            accessor: 'column2',
            sticky: true,
        },
        {
            Header: 'Column 3',
            accessor: 'column3',
        },
        {
            Header: 'Column 4',
            accessor: 'column4',
        },
        {
            Header: 'Column 5',
            accessor: 'column5',
        },
        {
            Header: 'Column 6',
            accessor: 'column6',
        },
        {
            Header: 'Column 7',
            accessor: 'column7',
        },
        {
            Header: 'Column 8',
            accessor: 'column8',
        },
        {
            Header: 'Column 9',
            accessor: 'column9',
        },
        {
            Header: 'Column 10',
            accessor: 'column10',
        },
        {
            Header: 'Column 11',
            accessor: 'column11',
        },
        {
            Header: 'Column 12',
            accessor: 'column12',
        },
        {
            Header: 'Column 13',
            accessor: 'column13',
        },
        {
            Header: 'Column 14',
            accessor: 'column14',
        },
        {
            Header: 'Column 15',
            accessor: 'column15',
        },
    ];

    const data: TableRow<StickyData>[] = [
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
        <Wrap>
            <Table columns={columns} data={data} stickyHeader onRowClick={(row) => console.info('row: ', row)} />
        </Wrap>
    );
};
