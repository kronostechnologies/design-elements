import { UsersAction, UsersActionProps, UsersContextProps } from '../types';
import { getCurrentPageUsers, sortUsers } from '../utils';

export const usersReducer = (state: UsersContextProps, action: UsersActionProps): UsersContextProps => {
    const updatedState = { ...state };

    switch (action.type) {
        case UsersAction.LOAD_USERS:
            if (action.users) {
                updatedState.users = action.users;
            }
            break;
        case UsersAction.UPDATE_TABLE:
            if (action.key) {
                updatedState.table = {
                    ...state.table,
                    [action.key]: action.value,
                };
            }
            break;
        default:
            return state;
    }

    const sortedUsers = sortUsers(
        [...updatedState.users],
        updatedState.table.sortBy,
    );

    updatedState.table.totalCount = sortedUsers.length;

    updatedState.table.currentPageUsers = getCurrentPageUsers(
        [...sortedUsers],
        updatedState.table.currentPage,
        updatedState.table.usersPerPage,
    );

    return updatedState;
};
