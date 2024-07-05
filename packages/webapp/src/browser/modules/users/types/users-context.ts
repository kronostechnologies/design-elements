import { User } from './user';

export interface UsersContextProps {
    users: User[],
    sortedUsers: User[],
    currentPageUsers: User[],
    currentPage: number,
    usersPerPage: number,
}
