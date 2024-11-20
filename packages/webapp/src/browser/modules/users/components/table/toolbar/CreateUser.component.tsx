import { Icon, Link } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { UserMode } from '../../../types';

export const CreateUser: FunctionComponent = () => {
    const { t } = useTranslation('users');
    return (
        <Link
            button={{ buttonType: 'secondary' }}
            href={`/users/${UserMode.CREATE}`}
        >
            <Icon name="plusSign" />
            {t('create')}
        </Link>
    );
};
