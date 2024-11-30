import { FunctionComponent } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRouter, useConfiguration } from '../../core';
import { ROUTER_ROUTES } from '../../core/navigation/routes';
import { AppLayout } from './layout';

export const AppRouter: FunctionComponent = () => {
    const { configuration } = useConfiguration();

    const router = createRouter([
        {
            path: '/',
            element: <AppLayout />,
            children: ROUTER_ROUTES,
        },
    ], {
        basename: configuration.publicPath,
    });

    return (
        <RouterProvider router={router} />
    );
};
