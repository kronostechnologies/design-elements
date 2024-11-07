import { FunctionComponent } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ROUTES, useConfiguration } from '../../core';
import { UnexpectedError, NotFoundRoute, AppLayout } from './layout';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createAppRouter = (publicPath: string) => createBrowserRouter([
    {
        path: ROUTES.root.path,
        element: <AppLayout />,
        ErrorBoundary: UnexpectedError,
        children: [
            {
                path: ROUTES.home.path,
                lazy: async () => {
                    const { HomePage } = await import('../home');
                    return { Component: HomePage };
                },
                ErrorBoundary: UnexpectedError,
            },
            {
                path: ROUTES.users.path,
                lazy: async () => {
                    const { UsersPage } = await import('../users');
                    return { Component: UsersPage };
                },
                ErrorBoundary: UnexpectedError,
            },
            {
                path: ROUTES.user.path,
                lazy: async () => {
                    const { UserPage } = await import('../users');
                    return { Component: UserPage };
                },
                ErrorBoundary: UnexpectedError,
            },
        ],
    },
    {
        path: '*',
        lazy: async () => ({
            Component: NotFoundRoute,
        }),
        ErrorBoundary: UnexpectedError,
    },
], {
    basename: publicPath,
});

export const AppRouter: FunctionComponent = () => {
    const { configuration } = useConfiguration();
    const router = createAppRouter(configuration.publicPath);

    return (
        <RouterProvider router={router} />
    );
};
