import { RouteObject } from 'react-router';
import { HomePage } from '../../modules/home';
import { UserPage, UsersPage } from '../../modules/users';
import { RouteCollection, RouteDefinition } from './route.types';

export const ROUTES: RouteCollection = {
    home: {
        path: '/',
        component: HomePage,
        end: true,
    },
    users: {
        path: '/users',
        component: UsersPage,
        end: true,
    },
    user: {
        path: '/users/:mode?/:id?',
        component: UserPage,
        end: true,
    },
};

export const ROUTER_ROUTES: RouteObject[] = Object.keys(ROUTES).map((key: string): RouteObject => {
    const route: Readonly<RouteDefinition> = ROUTES[key];
    return {
        id: key,
        path: route.path,
        Component: route.component,
    };
});
