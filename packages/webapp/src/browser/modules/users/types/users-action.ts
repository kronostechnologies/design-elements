import { User } from './user';

export enum UsersAction {
    SORT = 'SORT',
    UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE',
}

export interface UsersActionProps {
    type: string,
    currentPage?: number,
    itemsPerPage?: number,
    sortProps?: { id: keyof User, desc: boolean },
}
