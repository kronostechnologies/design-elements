import { createContext, FunctionComponent, useContext, useMemo } from 'react';
import { User } from './types';
import { loadUsers } from './utils';

interface UsersDataContextType {
    users: User[]
}

export const UsersDataContext = createContext<UsersDataContextType>(
    { users: loadUsers() },
);

export const useUsersContext = (): UsersDataContextType => {
    const context = useContext(UsersDataContext);

    if (context === undefined) {
        throw new Error('useUsersData must be used within a UsersDataProvider');
    }

    return context;
};

export const useUserContext = (id?: string): User | undefined => {
    const { users } = useContext(UsersDataContext);
    return users.find((u) => u.id === id);
};

export const Provider: FunctionComponent = ({ children }) => {
    const initialUsers = loadUsers();

    const usersValue = useMemo(() => ({
        users: initialUsers,
    }), [initialUsers]);

    return (
        <UsersDataContext.Provider value={usersValue}>
            {children}
        </UsersDataContext.Provider>
    );
};
