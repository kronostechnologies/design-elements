import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { breakpoints } from '../../tokens/breakpoints';
import { MediaView } from '../media-view/media-view';

import EquisoftIco from '../../logos/logo-equisoft-ico.svg';
import EquisoftLogo from '../../logos/logo-equisoft-reversed.svg';

const tabletMin = `${(breakpoints.tablet / 16)}rem`;

const Header = styled.header`
    align-items: center;
    background: ${props => props.theme.main['primary-2']};
    box-sizing: border-box;
    color: ${props => props.theme.greys.white};
    display: flex;
    justify-content: space-between;
    min-height: 2.75rem;
    padding: 0.75rem var(--spacing-2x);

    @media screen and (min-width: ${tabletMin}) {
        min-height: 5rem;
        padding: 1.25rem var(--spacing-3x);
    }
`;

const Brand = styled.a`
    align-items: center;
    display: flex;
    flex: 1 1 50vw;

    @media screen and (min-width: ${tabletMin}) {
        background: transparent;
        flex: 0 1 auto;
        justify-content: space-between;
    }

    &,
    &:active,
    &:visited {
        color: inherit;
        text-decoration: none;
    }
`;

const Logo = styled.div`
    align-items: center;
    display: flex;
    flex: 1 1 50%;
    font-size: 1.5rem;
    font-weight: var(--font-bold);
`;

const Equisoft = styled(EquisoftLogo)`
    height: 40px;
    width: 161px;
`;

const Project = styled.em`
    display: block;
    flex: 1 1 50%;
    font-size: 1.25rem;
    font-style: normal;
    line-height: 1.5rem;
    padding: 0 var(--spacing-3x);

    @media screen and (min-width: ${tabletMin}) {
        border-left: 1px solid ${props => props.theme.greys.white};
        font-size: 1rem;
        line-height: 2.5rem;
        margin: 0 0 0 var(--spacing-3x);
        padding: 0 0 0 var(--spacing-3x);
    }
`;

interface HeadbandProps {
    /** Application name label */
    appName: string;
    /** Right-side content */
    children: ReactNode;
}

export function Headband({ children, appName }: HeadbandProps): ReactElement {
    return (
        <Header role="banner">
            <Brand href="/" aria-label="Home" rel="index">
                <MediaView maxWidth={breakpoints.tablet}>
                    <Logo>
                        <EquisoftIco />
                    </Logo>
                </MediaView>

                <MediaView minWidth={breakpoints.tablet}>
                    <Logo>
                        <Equisoft />
                    </Logo>
                </MediaView>

                <Project>{appName}</Project>
            </Brand>

            <div>
                {children}
            </div>
        </Header>
    );
}
