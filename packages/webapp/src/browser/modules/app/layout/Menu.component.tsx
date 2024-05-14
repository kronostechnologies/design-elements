import { GlobalNavigation } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../routes';

export const Menu: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <GlobalNavigation
            mainItems={[
                {
                    href: ROUTES.home.path,
                    end: ROUTES.home.end,
                    iconName: 'home',
                    name: t('nav:Home'),
                },
            ]}
            footerItems={[]}
        />
    );
};
