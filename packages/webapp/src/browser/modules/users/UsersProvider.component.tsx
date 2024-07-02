import { TableData } from '@equisoft/design-elements-react';
import { createContext, Dispatch, FunctionComponent, useContext, useMemo, useReducer } from 'react';
import { ActionType, TableDataType, UserAction } from './types';
import { generateUsersData } from './utils';

interface UsersDataContextType {
    users: TableData<TableDataType>[],
    filteredUsers: TableData<TableDataType>[]
}

export const UsersDataContext = createContext<UsersDataContextType>(
    { users: generateUsersData(100), filteredUsers: [] },
);

export const UsersDispatchContext = createContext<Dispatch<UserAction> | undefined>(undefined);

export const useUsersContext = (): UsersDataContextType => {
    const context = useContext(UsersDataContext);

    if (context === undefined) {
        throw new Error('useUsersData must be used within a UsersDataProvider');
    }
    return context;
};

export const useUserContext = (id?: string): TableDataType | undefined => {
    const { users } = useContext(UsersDataContext);
    return users.find((u) => u.id === id);
};

export const useUsersActions = (): Dispatch<UserAction> => {
    const context = useContext(UsersDispatchContext);
    if (context === undefined) {
        throw new Error('useUsersDispatch must be used within a UsersDataProvider');
    }
    return context;
};

const usersReducer = (state: UsersDataContextType, action: UserAction): UsersDataContextType => {
    switch (action.type) {
        case ActionType.CREATE_USER:
            // eslint-disable-next-line no-case-declarations
            const newUser = generateUsersData(1)[0];
            return { ...state, users: [...state.users, newUser], filteredUsers: [...state.filteredUsers, newUser] };
        case ActionType.DELETE_USER:
            // eslint-disable-next-line no-case-declarations
            const users = state.users.filter((user) => user.id !== action.payload);
            // eslint-disable-next-line no-case-declarations
            const filteredUsers = state.filteredUsers.filter((user) => user.id !== action.payload);
            return { ...state, users, filteredUsers };
        case ActionType.SEARCH_USER:
            // eslint-disable-next-line no-case-declarations
            const searchTerm = action.payload?.toLowerCase() ?? '';
            return {
                ...state,
                filteredUsers: state.users.filter((user) => user.name.toLowerCase().includes(searchTerm)
                    || user.email?.toLowerCase().includes(searchTerm)
                    || user.phone?.toLowerCase().includes(searchTerm)
                    || user.gender?.toLowerCase().includes(searchTerm)
                    || user.salutation?.toLowerCase().includes(searchTerm)
                    || user.birthDate?.toLowerCase().includes(searchTerm)
                    || user.favoriteColor?.toLowerCase().includes(searchTerm)),
            };
        default:
            return state;
    }
};

export const UsersProvider: FunctionComponent = ({ children }) => {
    const initialUsers = generateUsersData(100);
    const [state, dispatch] = useReducer(
        usersReducer,
        { users: initialUsers, filteredUsers: initialUsers },
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
