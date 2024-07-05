import { User } from './user';

export interface UsersContextProps {
    users: User[],
    processedUsers: User[],
    currentPageUsers: User[],
    currentPage: number,
    itemsPerPage: number,
}
