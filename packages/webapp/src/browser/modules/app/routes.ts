import { RouteObject } from 'react-router';
import { RouteCollection, RouteDefinition } from '../../core';
import { HomePage } from '../home';
import { UsersPage } from '../users';

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
};

export const ROUTER_ROUTES: RouteObject[] = Object.keys(ROUTES).map((key: string): RouteObject => {
    const route: Readonly<RouteDefinition> = ROUTES[key];
    return {
        id: key,
        path: route.path,
        Component: route.component,
    };
});
