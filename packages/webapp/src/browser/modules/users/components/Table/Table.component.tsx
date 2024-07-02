import {
    TableColumn,
    Table as DataTable,
} from '@equisoft/design-elements-react';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { TableDataType } from '../../types';
import { useUsersContext } from '../../UsersProvider.component';
import { ActionsCell } from './ActionsCell.component';
import { Footer as TableFooter } from './Footer.component';
import { NameCell } from './NameCell.component';
import { ToolBar as TableToolBar } from './ToolBar.component';

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
    }

    .data-column {
        box-sizing: border-box;
        width: 35%;
    }
`;

const DEFAULT_ITEMS_PER_PAGE = 15;

export const Table: FunctionComponent = () => {
    const { t } = useTranslation('users');
    const { filteredUsers } = useUsersContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
    const currentPageData = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns: TableColumn<TableDataType>[] = useMemo(() => [
        {
            id: 'name',
            header: t('name'),
            accessorKey: 'id',
            className: 'data-column',
            sortable: true,
            sortDescFirst: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            cell: (props) => (
                <NameCell id={props.cell.getValue() as TableDataType['id']} />
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
            id: 'birthDate',
            header: '',
            accessorKey: 'id',
            className: 'action-column',
            sortable: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            cell: (props) => (
                <ActionsCell id={props.cell.getValue() as TableDataType['id']} />
            ),
        },
    ], [t]);

    const updatePageData = useCallback((newCurrentPage: number, newItemsPerPage?: number) => {
        setCurrentPage(newCurrentPage);
        setItemsPerPage(newItemsPerPage ?? itemsPerPage);
    }, [itemsPerPage]);

    return (
        <TableContainer>
            <TableToolBar />
            <DataTable
                rowSize="small"
                columns={columns}
                data={currentPageData}
            />
            <TableFooter
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                numberOfResults={filteredUsers.length}
                updatePageData={updatePageData}
            />
        </TableContainer>
    );
};
