import { RouteObject } from 'react-router';
import { RouteCollection, RouteDefinition } from '../../core';
import { HomePage } from '../home';
import { UserPage, UsersPage } from '../users';
import { DocusignPage } from '../docusign';

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
        path: '/user/:id?',
        component: UserPage,
        end: true,
    },
    docusign: {
        path: '/docusign',
        component: DocusignPage,
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
