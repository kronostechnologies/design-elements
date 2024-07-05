import { UsersAction, UsersActionProps, UsersContextProps } from '../types';
import { getCurrentPageUsers } from '../utils';

export const usersReducer = (state: UsersContextProps, action: UsersActionProps): UsersContextProps => {
    switch (action.type) {
        case UsersAction.SORT: {
            const defaultUsers = [...state.users];
            const sortedUsers = action.sortedUsers ?? defaultUsers;
            const currentPageUsers = getCurrentPageUsers(sortedUsers, state.currentPage, state.itemsPerPage);
            return {
                ...state,
                processedUsers: sortedUsers,
                currentPageUsers,
            };
        }
        case UsersAction.UPDATE_CURRENT_PAGE: {
            const currentPage = action.currentPage ?? state.currentPage;
            const itemsPerPage = action.itemsPerPage ?? state.itemsPerPage;
            const currentPageUsers = getCurrentPageUsers([...state.processedUsers], currentPage, itemsPerPage);
            return {
                ...state,
                currentPageUsers,
                currentPage,
                itemsPerPage,
            };
        }
        default:
            return state;
    }
};
