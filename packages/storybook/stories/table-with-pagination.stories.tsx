import {
    Pagination,
    Table,
    TableColumn,
    TableRow,
} from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useMemo, useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Structure/Table with Pagination',
    component: Table,
    parameters: rawCodeParameters,
};

export const TableWithPagination: Story = () => {
    const ITEMS_PER_PAGE = 10;

    interface Data {
        id: number;
        age: number;
        country: string;
    }

    function makeData(): TableRow<Data>[] {
        const countries = ['Canada', 'United States', 'France', 'Germany', 'Italy', 'Spain', 'Portugal', 'Japan'];
        return [...Array(35).keys()].map((i) => ({
            id: i + 1,
            age: Math.floor(Math.random() * 90) + 10,
            country: countries[Math.floor(Math.random() * countries.length)],
        }));
    }

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

    function sliceDataForCurrentPage<T>(data: T[], itemsPerPage: number, pageIndex: number): T[] {
        return data.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage);
    }

    const [data, setData] = useState<TableRow<Data>[]>(makeData());
    const [currentPage, setCurrentPage] = useState(1);

    const columns: TableColumn<Data> = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
            sortable: true,
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

    return (
        <>
            <Table
                columns={columns}
                data={sliceDataForCurrentPage(data, ITEMS_PER_PAGE, currentPage - 1)}
                onSorting={(sorting) => {
                    if (sorting) {
                        const key = sorting.id as keyof Data;
                        setData([...data].sort((a, b) => sortFn(a[key], b[key], sorting.desc)));
                    }
                }}
                manualSorting
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
