import { FunctionComponent, useMemo, useReducer } from 'react';
import { usersReducer, UsersDataContext, UsersDispatchContext } from '../state';
import { getCurrentPageUsers, loadUsers } from '../utils';

const INITIAL_PAGE = 1;
const DEFAULT_ITEMS_PER_PAGE = 10;

export const Provider: FunctionComponent = ({ children }) => {
    const initialUsers = loadUsers();
    const initialPageUsers = getCurrentPageUsers(initialUsers, INITIAL_PAGE, DEFAULT_ITEMS_PER_PAGE);
    const [state, dispatch] = useReducer(
        usersReducer,
        {
            users: [...initialUsers],
            processedUsers: [...initialUsers],
            currentPageUsers: [...initialPageUsers],
            currentPage: INITIAL_PAGE,
            itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
        },
    );

    const usersValue = useMemo(() => state, [state]);
    const dispatchValue = useMemo(() => dispatch, [dispatch]);

    return (
        <UsersDataContext.Provider value={usersValue}>
            <UsersDispatchContext.Provider value={dispatchValue}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersDataContext.Provider>
    );
};
