import { GlobalHeader } from '@equisoft/design-elements-react';
import { FunctionComponent, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import { Menu } from './Menu.component';
import { UnexpectedErrorBoundary } from './UnexpectedErrorBoundary.component';

const Screen = styled.div`
    display: grid;
    grid: auto 1fr / auto 1fr;
    grid-gap: 0;
    grid-template-areas:
        'header header'
        'sidebar content';
    min-height: 100vh;
`;

const HeaderArea = styled.div`
    grid-area: header;
`;
const SidebarArea = styled.div`
    grid-area: sidebar;
`;
const ContentArea = styled.div`
    grid-area: content;
    margin: 0.5rem;
`;

const PageLoading: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <>{t('nav:pageLoading')}</>
    );
};

export const AppLayout: FunctionComponent = () => (
    <Screen>
        <HeaderArea>
            <GlobalHeader>&nbsp;</GlobalHeader>
        </HeaderArea>

        <SidebarArea>
            <Menu />
        </SidebarArea>

        <ContentArea>
            <UnexpectedErrorBoundary>
                <Suspense fallback={<PageLoading />}>
                    <Outlet />
                </Suspense>
            </UnexpectedErrorBoundary>
        </ContentArea>
    </Screen>
);
