import { SkipLink } from '@equisoft/design-elements-react';
import { VoidFunctionComponent } from 'react';
import styled from 'styled-components';

export default {
    title: 'Components/Skip Link',
    component: SkipLink,
};

const Navigation = styled.nav`
    align-items: center;
    background-color: ${({ theme }) => theme.ref['color-black']};
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    color: ${({ theme }) => theme.ref['color-white']};
    display: flex;
    height: 56px;
    justify-content: center;
    width: 100%;
`;

const Main = styled.main`
    align-items: center;
    background-color: ${({ theme }) => theme.ref['color-neutral-15']};
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    display: flex;
    height: 150px;
    justify-content: center;
    width: 100%;
`;

export const Default: VoidFunctionComponent = () => (
    <>
        <SkipLink href="#main" />
        <Navigation>
            <p tabIndex={0}>Navigation</p>
        </Navigation>
        <Main id="main">
            <p tabIndex={0}>Main content</p>
        </Main>
    </>
);
