import { createContext, Dispatch, useContext } from 'react';
import { User, UsersActionProps, UsersContextProps } from '../types';

export const UsersDataContext = createContext<UsersContextProps | undefined>(undefined);

export const UsersDispatchContext = createContext<Dispatch<UsersActionProps> | undefined>(undefined);

export const useUsersContext = (): UsersContextProps => {
    const context = useContext(UsersDataContext);

    if (context === undefined) {
        throw new Error('useUsersContext must be used within a UsersProvider');
    }

    return context;
};

export const useUserContext = (id?: User['id']): User | undefined => {
    const context = useContext(UsersDataContext);

    if (context === undefined) {
        throw new Error('useUserContext must be used within a UsersProvider');
    }

    return context.users.find((u) => u.id === id);
};

export const useUsersActions = (): Dispatch<UsersActionProps> => {
    const context = useContext(UsersDispatchContext);
    if (context === undefined) {
        throw new Error('useUsersActions must be used within a UsersProvider');
    }
    return context;
};
