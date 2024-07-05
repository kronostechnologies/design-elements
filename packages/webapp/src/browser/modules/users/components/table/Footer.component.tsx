import { Pagination } from '@equisoft/design-elements-react';
import { FunctionComponent, ReactElement, useCallback } from 'react';
import styled from 'styled-components';
import { useUsersActions, useUsersContext } from '../../state';
import { UsersAction } from '../../types';

const FooterPaginationWrapper = styled.nav`
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    display: flex;
    gap: 8px;
    justify-content: space-between;
`;

export const Footer: FunctionComponent = () => {
    const { users, currentPage, usersPerPage } = useUsersContext();
    const dispatch = useUsersActions();

    const renderPagination = useCallback((): ReactElement => (
        <Pagination
            resultsPerPage={usersPerPage}
            numberOfResults={users.length}
            activePage={currentPage}
            onPageChange={(page) => {
                dispatch({
                    type: UsersAction.UPDATE_CURRENT_PAGE,
                    currentPage: page,
                });
            }}
            pagesShown={3}
        />
    ), [usersPerPage, users.length, currentPage, dispatch]);

    return (
        <FooterPaginationWrapper aria-label="table's pagination">
            <div />
            {renderPagination()}
        </FooterPaginationWrapper>
    );
};
