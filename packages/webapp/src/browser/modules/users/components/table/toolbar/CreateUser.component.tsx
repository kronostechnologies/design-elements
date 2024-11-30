import { Icon, Link } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { UserMode } from '../../../types';

export const CreateUser: FunctionComponent = () => {
    const { t } = useTranslation('users');
    return (
        <Link
            button={{ buttonType: 'secondary' }}
            href={`/users/${UserMode.CREATE}`}
            routerLink={NavLink}
        >
            <Icon name="plusSign" />
            {t('create')}
        </Link>
    );
};
