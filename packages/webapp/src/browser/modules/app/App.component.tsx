import { DesignSystem } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import { Configuration, ConfigurationProvider, createRouter, initializeConfiguration } from '../../core';
import { UsersProvider } from '../users/UsersProvider.component';
import { AppLayout, AppLoader, UnexpectedErrorBoundary } from './layout';
import { ROUTER_ROUTES } from './routes';

export interface AppProps {
    configuration: Configuration;
}

const appConfig = initializeConfiguration();
const router = createRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: ROUTER_ROUTES,
    },
], {
    basename: appConfig.publicPath,
});

export const AppProviders: FunctionComponent = (
    { children },
) => (
    <UsersProvider>
        {children}
    </UsersProvider>
);

export const App: FunctionComponent<AppProps> = ({
    configuration,
}) => {
    const { i18n } = useTranslation();

    return (
        <ConfigurationProvider configuration={configuration}>
            <UnexpectedErrorBoundary>
                <DesignSystem language={i18n.language}>
                    <AppProviders>
                        <AppLoader>
                            <RouterProvider router={router} />
                        </AppLoader>
                    </AppProviders>
                </DesignSystem>
            </UnexpectedErrorBoundary>
        </ConfigurationProvider>
    );
};
