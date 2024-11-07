import { DesignSystem } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigurationProvider, initializeConfiguration } from '../../core';
import { Provider as UsersProvider } from '../users/components/Provider.component';
import { UnexpectedErrorBoundary } from './layout';

const ServerProviders: FunctionComponent = (
    { children },
) => {
    const appConfig = initializeConfiguration();
    return (
        <ConfigurationProvider configuration={appConfig}>
            <UnexpectedErrorBoundary>
                <UsersProvider>
                    {children}
                </UsersProvider>
            </UnexpectedErrorBoundary>
        </ConfigurationProvider>
    );
};

const ClientProviders: FunctionComponent = (
    { children },
) => {
    const { i18n } = useTranslation();

    return (
        <DesignSystem language={i18n.language}>
            {children}
        </DesignSystem>
    );
};

export const AppProviders: FunctionComponent = (
    { children },
) => (
    <ServerProviders>
        <ClientProviders>
            {children}
        </ClientProviders>
    </ServerProviders>
);
