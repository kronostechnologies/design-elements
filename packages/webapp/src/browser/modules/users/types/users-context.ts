import { User, UserKeys } from './user';

export interface TableContextProps {
    currentPage: number,
    usersPerPage: number,
    sortBy?: {
        key: UserKeys,
        desc: boolean,
    },
    currentPageUsers: User[],
    totalCount: number,
}

export type TableContextKeys = keyof TableContextProps;

export interface UsersContextProps {
    users: User[],
    table: TableContextProps,
}
