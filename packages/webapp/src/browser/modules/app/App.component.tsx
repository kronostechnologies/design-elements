import { FunctionComponent } from 'react';
import { AppLoader } from './layout';
import { AppProviders } from './Providers.component';
import { AppRouter } from './Router.component';

export const App: FunctionComponent = () => (
    <AppProviders>
        <AppLoader>
            <AppRouter />
        </AppLoader>
    </AppProviders>
);
