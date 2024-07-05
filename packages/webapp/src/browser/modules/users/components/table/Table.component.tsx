import {
    TableColumn,
    Table as DataTable,
} from '@equisoft/design-elements-react';
import { FunctionComponent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useUsersActions, useUsersContext } from '../../state';
import { User, UsersAction } from '../../types';
import { Footer as TableFooter } from './Footer.component';
import { Name as NameCell } from './cells/Name.component';

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

export const Table: FunctionComponent = () => {
    const { t } = useTranslation('users');
    const { currentPageUsers } = useUsersContext();
    const dispatch = useUsersActions();

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

    return (
        <TableContainer>
            <DataTable
                rowSize="small"
                columns={columns}
                data={currentPageUsers}
                defaultSort={{ id: 'id', desc: false }}
                onSort={(sort) => dispatch({
                    type: UsersAction.SORT,
                    sortProps: sort ? { id: sort.id as keyof User, desc: sort.desc } : undefined,
                })}
                manualSort
            />
            <TableFooter />
        </TableContainer>
    );
};
