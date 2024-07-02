export interface TableDataType {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    gender?: string;
    salutation?: string;
    favoriteColor?: string;
}

export enum ActionType {
    CREATE_USER = 'CREATE_USER',
    DELETE_USER = 'DELETE_USER',
    SEARCH_USER = 'SEARCH_USER',
}

export enum UserView {
    CREATE = 'create',
    EDIT = 'edit',
    VIEW = 'view',
}

export interface UserAction {
    type: string,
    payload?: string,
}
