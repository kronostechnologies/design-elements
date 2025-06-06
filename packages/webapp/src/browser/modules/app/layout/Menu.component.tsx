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
                {
                    href: ROUTES.users.path,
                    end: ROUTES.users.end,
                    iconName: 'users',
                    name: t('nav:Users'),
                },
                {
                    href: ROUTES.docusign.path,
                    end: ROUTES.docusign.end,
                    iconName: 'home',
                    name: t('nav:Docusign'),
                },
            ]}
            footerItems={[]}
        />
    );
};
