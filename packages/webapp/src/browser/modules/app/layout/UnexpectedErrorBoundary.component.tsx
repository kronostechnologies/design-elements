import { FunctionComponent, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '../../../core';
import { ScreenCentered } from './styled-elements';

const UnexpectedError: FunctionComponent = () => {
    const { t } = useTranslation();

    return (<ScreenCentered>{t('unexpectedError')}</ScreenCentered>);
};

export const UnexpectedErrorBoundary: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => (
    <ErrorBoundary fallback={<UnexpectedError />}>
        {children}
    </ErrorBoundary>
);
