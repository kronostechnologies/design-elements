import {
    Heading,
} from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Table as UsersTable } from './components/Table/Table.component';
import { UsersProvider } from './UsersProvider.component';

export const UsersPage: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <UsersProvider>
            <Heading bold noMargin type='xlarge' tag="h1">{t('users:title')}</Heading>
            <UsersTable />
        </UsersProvider>
    );
};
