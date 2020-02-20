import React, { ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { LinkProps } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';

import EquisoftLogo from '../../logos/logo-equisoft-reversed.svg';
import { breakpoints } from '../../tokens/breakpoints';
import { Icon } from '../icon/icon';
import { RouterLinkProps } from '../route-link/route-link';
import { SideDrawer } from '../side-drawer/side-drawer';

const Header = styled.header`
    align-items: center;
    background: ${props => props.theme.main['primary-2']};
    box-sizing: border-box;
    display: flex;
    height: 48px;
    justify-content: space-between;
    padding: var(--spacing-1x) var(--spacing-2x);

    @media screen and (max-width: ${breakpoints.desktop}px) {
        height: 56px;
    }
`;

const Logo = styled.a<LinkProps>`
    align-items: center;
    display: flex;
    font-size: 1.5rem;
    font-weight: var(--font-bold);
    height: 100%;
`;

const Equisoft = styled(EquisoftLogo)`
    height: 100%;
`;

const Content = styled.div`
    color: ${props => props.theme.greys.white};
`;

const BurgerButton = styled.button`
    appearance: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
`;

interface HeadbandProps {
    /** Right-side content */
    children: ReactNode;
    /**
     * Sets logo href
     * @default /
     **/
    logoHref?: string;
    /** What will be displayed inside the mobile drawer */
    mobileDrawerContent: ReactNode;
    /** Takes Link or NavLink from react-router-dom */
    routerLink: RouterLinkProps;
}

export const Headband = ({
    children,
    logoHref = '/',
    mobileDrawerContent,
    routerLink }: HeadbandProps): ReactElement => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth);
    const [mobile, setMobile] = useState(screenWidth <= breakpoints.mobile);
    const themeContext = useContext(ThemeContext);

    useEffect(() => {
        window.addEventListener('resize', handleScreenResize);
        return () => {
            window.removeEventListener('resize', handleScreenResize);
        };
    }, []);

    useEffect(() => {
        const isMobile = screenWidth <= breakpoints.mobile;

        if (!isMobile) {
            setDrawerOpen(false);
        }
        setMobile(isMobile);
    }, [screenWidth]);

    const handleScreenResize = (): void => {
        setScreenWidth(window.innerWidth || document.documentElement.clientWidth);
    };

    return (
        <Header role="banner">
            <Logo to={logoHref} as={routerLink} aria-label="Home">
                <Equisoft />
            </Logo>
            {mobile ? (
                <>
                    <BurgerButton
                        aria-expanded={drawerOpen}
                        aria-controls="menu-drawer"
                        aria-label="Navigation"
                        type="button"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                    >
                        <Icon name="menu" color={themeContext.greys.white}/>
                    </BurgerButton>
                    <SideDrawer id="menu-drawer" open={drawerOpen && screenWidth <= breakpoints.mobile}>
                        {mobileDrawerContent}
                    </SideDrawer>
                </>
            ) :
            (
                <Content>
                    {children}
                </Content>
            )}
        </Header>
    );
};
