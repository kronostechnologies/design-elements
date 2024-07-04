import {
    TableColumn,
    Table as DataTable, TableData,
} from '@equisoft/design-elements-react';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { User } from '../../types';
import { useUsersContext } from '../../Provider.component';
import { sortFn } from '../../utils';
import { Footer as TableFooter } from './Footer.component';
import { NameCell } from './cells/NameCell.component';

const TableContainer = styled.div`
    align-items: flex-start;
    align-self: stretch;
    background: #ffffff;
    border: 1px solid #f1f2f2;
    border-radius: 8px;
    box-shadow: 0 4px 20px -8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 8px;
    padding: 16px 32px;

    .action-column {
        box-sizing: border-box;
        width: auto;

        :focus {
            border-color: #007bff;
        }
    }

    .data-column {
        box-sizing: border-box;
        width: 35%;

        :focus {
            border-color: #007bff;
        }
    }
`;

const DEFAULT_ITEMS_PER_PAGE = 10;

export const Table: FunctionComponent = () => {
    const { t } = useTranslation('users');
    const { users } = useUsersContext();
    const [processedUsers, setProcessedUsers] = useState<TableData<User>[]>([...users]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
    const currentPageData = processedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns: TableColumn<User>[] = useMemo(() => [
        {
            id: 'name',
            header: t('name'),
            accessorKey: 'id',
            className: 'data-column',
            sortable: true,
            sortDescFirst: false,
            focusable: true,
            // eslint-disable-next-line react/no-unstable-nested-components
            cell: (props) => (
                <NameCell id={props.cell.getValue() as User['id']} />
            ),
        },
        {
            id: 'email',
            header: t('email'),
            accessorKey: 'email',
            className: 'data-column',
            sortable: true,
        },
        {
            id: 'phone',
            header: t('phone'),
            accessorKey: 'phone',
            className: 'data-column',
            sortable: true,
        },
        {
            id: 'actions',
            header: '',
            className: 'action-column',
            sortable: false,
        },
    ], [t]);

    const updatePageData = useCallback((newCurrentPage: number, newItemsPerPage?: number) => {
        setCurrentPage(newCurrentPage);
        setItemsPerPage(newItemsPerPage ?? itemsPerPage);
    }, [itemsPerPage]);

    return (
        <TableContainer>
            <DataTable
                rowSize="small"
                columns={columns}
                data={currentPageData}
                defaultSort={{ id: 'id', desc: false }}
                onSort={(sort) => {
                    if (sort) {
                        const key = sort.id as keyof User;
                        const sortedUsers = [...sortFn(processedUsers, key, sort.desc)];
                        setProcessedUsers(sortedUsers);
                    } else {
                        setProcessedUsers([...users]);
                    }
                }}
                manualSort
            />
            <TableFooter
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                numberOfResults={processedUsers.length}
                updatePageData={updatePageData}
            />
        </TableContainer>
    );
};
