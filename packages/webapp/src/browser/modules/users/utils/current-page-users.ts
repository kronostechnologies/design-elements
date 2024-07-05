import { User } from '../types';

export function getCurrentPageUsers(users: User[], currentPage: number, itemsPerPage: number): User[] {
    return users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
}
