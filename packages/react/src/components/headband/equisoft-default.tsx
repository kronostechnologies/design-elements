import React, { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import EquisoftIco from '../../logos/logo-equisoft-ico.svg';
import EquisoftLogo from '../../logos/logo-equisoft-reversed.svg';

import { breakpoints } from '../../tokens/breakpoints';
import { MediaView } from '../media-view/media-view';

const tabletMin = `${(breakpoints.tablet / 16)}rem`;

const SIDE_COLUMNS_TEMPLATE = 'calc(161px + var(--spacing-3x))';

const Header = styled.header`
    align-items: center;
    background: ${props => props.theme.main['primary-2']};
    box-sizing: border-box;
    color: ${props => props.theme.greys.white};
    display: grid;
    grid-gap: var(--spacing-2x);
    grid-template-columns: 0.75fr 2fr 0.75fr;
    min-height: 2.75rem;
    padding: 0 var(--spacing-2x);

    @media screen and (min-width: ${tabletMin}) {
        grid-gap: var(--spacing-3x);
        grid-template-columns: ${SIDE_COLUMNS_TEMPLATE} 1fr ${SIDE_COLUMNS_TEMPLATE};
        min-height: 5rem;
        padding: 0 var(--spacing-3x);
    }
`;

const Logo = styled.div`
    @media screen and (min-width: ${tabletMin}) {
        border-right: 1px solid ${props => props.theme.greys.white};
        padding: 0 var(--spacing-3x) 0 0;
    }
`;

const HomeLink = styled(Link)`
    align-items: center;
    display: flex;
    font-size: 1.5rem;
`;

const Equisoft = styled(EquisoftLogo)`
    height: 40px;
    width: 161px;
`;

const Project = styled.div`
    text-align: center;

    @media screen and (min-width: ${tabletMin}) {
        background: transparent;
        margin-right: var(--spacing-3x);
        text-align: left;
    }
`;

const ProjectName = styled.em`
    font-size: 1.25rem;
    font-style: normal;
    line-height: 2rem;

    @media screen and (min-width: ${tabletMin}) {
        font-size: 1rem;
        line-height: 1.5rem;
    }
`;

const RightContent = styled.div`
    text-align: right;
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
            <Logo>
                <HomeLink to="/" aria-label="Home" rel="index">
                    <MediaView maxWidth={breakpoints.tablet}>
                        <EquisoftIco />
                    </MediaView>
                    <MediaView minWidth={breakpoints.tablet}>
                        <Equisoft />
                    </MediaView>
                </HomeLink>
            </Logo>

            <Project>
                <ProjectName>{appName}</ProjectName>
            </Project>

            <RightContent>
                {children}
            </RightContent>
        </Header>
    );
}
