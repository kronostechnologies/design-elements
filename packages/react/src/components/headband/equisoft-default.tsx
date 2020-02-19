import React, { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import EquisoftLogo from '../../logos/logo-equisoft-reversed.svg';
import { breakpoints } from '../../tokens/breakpoints';

const Header = styled.header`
    align-items: center;
    background: ${props => props.theme.main['primary-2']};
    box-sizing: border-box;
    color: ${props => props.theme.greys.white};
    display: flex;
    height: 48px;
    justify-content: space-between;
    padding: var(--spacing-1x) var(--spacing-2x);

    @media screen and (max-width: ${breakpoints.desktop}px) {
        height: 56px;
    }
`;

const Brand = styled.a`
    display: flex;
    height: 100%;
`;

const HomeLink = styled(Link)`
    align-items: center;
    display: flex;
    font-size: 1.5rem;
`;

const Equisoft = styled(EquisoftLogo)`
    height: 100%;
`;

interface HeadbandProps {
    /** Right-side content */
    children: ReactNode;
}

export const Headband = ({ children }: HeadbandProps): ReactElement => (
    <Header role="banner">
        <Brand href="/" aria-label="Home" rel="index">
            <Logo>
                <Equisoft />
            </Logo>
        </Brand>
        <div>
            {children}
        </div>
    </Header>
);
