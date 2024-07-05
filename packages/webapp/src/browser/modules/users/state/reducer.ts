import { UsersAction, UsersActionProps, UsersContextProps } from '../types';
import { getCurrentPageUsers, sortUsers } from '../utils';

export const usersReducer = (state: UsersContextProps, action: UsersActionProps): UsersContextProps => {
    switch (action.type) {
        case UsersAction.SORT: {
            const sortedUsers = action.sortProps
                ? sortUsers([...state.processedUsers], action.sortProps.id, action.sortProps.desc)
                : [...state.users];
            return {
                ...state,
                processedUsers: sortedUsers,
                currentPageUsers: getCurrentPageUsers(sortedUsers, state.currentPage, state.itemsPerPage),
            };
        }
        case UsersAction.UPDATE_CURRENT_PAGE: {
            const currentPage = action.currentPage ?? state.currentPage;
            const itemsPerPage = action.itemsPerPage ?? state.itemsPerPage;
            return {
                ...state,
                currentPageUsers: getCurrentPageUsers([...state.processedUsers], currentPage, itemsPerPage),
                currentPage,
                itemsPerPage,
            };
        }
        default:
            return state;
    }
};
