import { SkipLink } from '@equisoft/design-elements-react';
import React, { VoidFunctionComponent } from 'react';
import styled from 'styled-components';

export default {
    title: 'Skip Link',
    component: SkipLink,
};

const Navigation = styled.nav`
    align-items: center;
    background-color: ${({ theme }) => theme.greys.black};
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    color: ${({ theme }) => theme.greys.white};
    display: flex;
    height: 50px;
    justify-content: center;
    width: 100%;
`;

const Main = styled.main`
    align-items: center;
    background-color: ${({ theme }) => theme.greys.grey};
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    display: flex;
    height: 150px;
    justify-content: center;
    width: 100%;
`;

export const Normal: VoidFunctionComponent = () => (
    <>
        <SkipLink href="#main">Skip to main content</SkipLink>
        <Navigation>
            <p tabIndex={0}>Navigation</p>
        </Navigation>
        <Main id="main">
            <p tabIndex={0}>Main content</p>
        </Main>
    </>
);
