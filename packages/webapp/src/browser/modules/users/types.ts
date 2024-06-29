export interface TableDataType {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export enum ActionTypes {
    CREATE_USER = 'CREATE_USER',
    DELETE_USER = 'DELETE_USER',
    SEARCH_USER = 'SEARCH_USER',
}

export interface UserAction {
    type: string,
    payload?: string,
}
