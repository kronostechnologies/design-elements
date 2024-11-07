import { Link } from '@equisoft/design-elements-react';
import { FC, FunctionComponent, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ErrorBoundary, ROUTES } from '../../../core';
import { ScreenCentered } from './styled-elements';

const NotFoundContainer = styled.div`
    margin-top: 13rem; /* mt-52 */
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 600; /* font-semibold */
`;

export const NotFoundRoute: FC = () => {
    const { t } = useTranslation('core');
    return (
        <NotFoundContainer>
            <h1>{t('notFoundTitle')}</h1>
            <p>{t('notFoundMessage')}</p>
            <Link href={ROUTES.home.path}>
                {t('backToHome')}
            </Link>
        </NotFoundContainer>
    );
};

export const UnexpectedError: FunctionComponent = () => {
    const { t } = useTranslation();

    return (<ScreenCentered>{t('unexpectedError')}</ScreenCentered>);
};

export const UnexpectedErrorBoundary: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => (
    <ErrorBoundary fallback={<UnexpectedError />}>
        {children}
    </ErrorBoundary>
);
