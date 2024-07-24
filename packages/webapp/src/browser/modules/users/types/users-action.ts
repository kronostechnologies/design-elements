import { User } from './user';
import { TableContextKeys, TableContextProps } from './users-context';

export enum UsersAction {
    LOAD_USERS = 'LOAD_USERS',
    UPDATE_TABLE = 'UPDATE_TABLE',
}

export interface UsersActionProps {
    type: string,
    users?: User[],
    key?: TableContextKeys,
    value?: TableContextProps[TableContextKeys],
}
