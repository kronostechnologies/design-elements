import React, { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import EquisoftIco from '../../logos/logo-equisoft-ico.svg';
import EquisoftLogo from '../../logos/logo-equisoft-reversed.svg';

import { breakpoints } from '../../tokens/breakpoints';
import { MediaView } from '../media-view/media-view';

const desktopMin = `${(breakpoints.desktop / 16)}rem`;

const Header = styled.header`
    align-items: center;
    background: ${props => props.theme.main['primary-2']};
    box-sizing: border-box;
    color: ${props => props.theme.greys.white};
    display: flex;
    min-height: 2.75rem;
    padding: 0 var(--spacing-2x);

    @media screen and (min-width: ${desktopMin}) {
        min-height: 5rem;
        padding: 0 var(--spacing-3x);
    }
`;

const Logo = styled.div``;

const HomeLink = styled(Link)`
    align-items: center;
    display: flex;
    font-size: 1.5rem;
`;

const Equisoft = styled(EquisoftLogo)`
    height: 40px;
    width: 161px;
`;

const RightContent = styled.div`
    flex-grow: 1;
    margin-left: var(--spacing-2x);
    text-align: right;

    @media screen and (min-width: ${desktopMin}) {
        margin-left: var(--spacing-3x);
    }
`;

interface HeadbandProps {
    /** Right-side content */
    children: ReactNode;
}

export function Headband({ children }: HeadbandProps): ReactElement {
    return (
        <Header role="banner">
            <Logo>
                <HomeLink to="/" aria-label="Home" rel="index">
                    <MediaView maxWidth={breakpoints.desktop}>
                        <EquisoftIco aria-hidden="true" focusable="false" />
                    </MediaView>
                    <MediaView minWidth={breakpoints.desktop}>
                        <Equisoft aria-hidden="true" focusable="false" />
                    </MediaView>
                </HomeLink>
            </Logo>

            <RightContent>
                {children}
            </RightContent>
        </Header>
    );
}
