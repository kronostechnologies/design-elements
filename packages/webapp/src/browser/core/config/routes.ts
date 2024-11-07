import { RouteCollection } from '../navigation';

export const ROUTES: RouteCollection = {
    root: {
        path: '/',
        getHref: () => '/',
    },
    home: {
        path: '/home',
        getHref: () => '/home',
        end: true,
    },
    users: {
        path: '/users',
        getHref: () => '/users',
        end: true,
    },
    user: {
        path: '/users/:mode/:id?',
        getHref: (mode: string, id?: string) => `/users/${mode}${id ? `/${id}` : ''}`,
        end: true,
    },
};
