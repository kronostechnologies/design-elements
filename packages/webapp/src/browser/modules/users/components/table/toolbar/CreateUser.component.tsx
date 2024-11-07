import { Icon, Link } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../../../../core';
import { UserMode } from '../../../types';

export const CreateUser: FunctionComponent = () => {
    const { t } = useTranslation('users');
    return (
        <Link
            button={{ buttonType: 'secondary' }}
            href={ROUTES.user.getHref(UserMode.CREATE)}
        >
            <Icon name="plusSign" />
            {t('create')}
        </Link>
    );
};
