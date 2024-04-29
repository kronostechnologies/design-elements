import { FunctionComponent, PropsWithChildren, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenCentered } from './styled-elements';

const AppLoading: FunctionComponent = () => {
    const { t } = useTranslation();

    return (<ScreenCentered>{t('appLoading')}</ScreenCentered>);
};

export const AppLoader: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => (
    <Suspense fallback={<AppLoading />}>
        {children}
    </Suspense>
);
