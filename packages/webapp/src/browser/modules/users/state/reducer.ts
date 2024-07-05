import { UsersAction, UsersActionProps, UsersContextProps } from '../types';
import { getCurrentPageUsers, sortUsers } from '../utils';

export const usersReducer = (state: UsersContextProps, action: UsersActionProps): UsersContextProps => {
    const updatedState = { ...state };

    switch (action.type) {
        case UsersAction.SORT:
            updatedState.sortedUsers = action.sortProps
                ? sortUsers([...state.users], action.sortProps.id, action.sortProps.desc)
                : [...state.users];
            break;
        case UsersAction.UPDATE_CURRENT_PAGE:
            updatedState.currentPage = action.currentPage ?? state.currentPage;
            updatedState.usersPerPage = action.usersPerPage ?? state.usersPerPage;
            break;
        default:
            return state;
    }

    updatedState.currentPageUsers = getCurrentPageUsers(
        [...updatedState.sortedUsers],
        updatedState.currentPage,
        updatedState.usersPerPage,
    );

    return updatedState;
};
