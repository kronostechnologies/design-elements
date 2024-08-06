import { Heading } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

export const UserPage: FunctionComponent = () => {
    const { t } = useTranslation('user');

    return (
        <Heading bold noMargin type='xlarge' tag="h1">{t('title')}</Heading>
    );
};
