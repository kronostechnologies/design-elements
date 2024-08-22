import { UsersContextProps } from '../types';

const INITIAL_PAGE = 1;
const DEFAULT_USERS_PER_PAGE = 10;

export const initialUsersContext: UsersContextProps = {
    users: [],
    table: {
        currentPage: INITIAL_PAGE,
        usersPerPage: DEFAULT_USERS_PER_PAGE,
        currentPageUsers: [],
        totalCount: 0,
    },
};
