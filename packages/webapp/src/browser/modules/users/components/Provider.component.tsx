import { FunctionComponent, PropsWithChildren, useEffect, useMemo, useReducer } from 'react';
import { initialUsersContext } from '../constants';
import { usersReducer, UsersDataContext, UsersDispatchContext } from '../state';
import { UsersAction } from '../types';
import { loadUsers } from '../utils';

export const Provider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, initialUsersContext);

    useEffect(() => {
        dispatch({
            type: UsersAction.LOAD_USERS,
            users: loadUsers(),
        });
    }, []);

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
