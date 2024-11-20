import { DesignSystem } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigurationProvider, initializeConfiguration } from '../../core';
import { Provider as UsersProvider } from '../users/components/Provider.component';
import { UnexpectedErrorBoundary } from './layout';

export const AppProviders: FunctionComponent = (
    { children },
) => {
    const appConfig = initializeConfiguration();
    const { i18n } = useTranslation();

    return (
        <ConfigurationProvider configuration={appConfig}>
            <UnexpectedErrorBoundary>
                <UsersProvider>
                    <DesignSystem language={i18n.language}>
                        {children}
                    </DesignSystem>
                </UsersProvider>
            </UnexpectedErrorBoundary>
        </ConfigurationProvider>
    );
};
