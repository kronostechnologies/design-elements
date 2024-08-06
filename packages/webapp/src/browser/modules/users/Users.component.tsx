import {
    Heading,
} from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Table as UsersTable } from './components/table/Table.component';

export const UsersPage: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <>
            <Heading bold noMargin type='xlarge' tag="h1">{t('users:title')}</Heading>
            <UsersTable />
        </>
    );
};
