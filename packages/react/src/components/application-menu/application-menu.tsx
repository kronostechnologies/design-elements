import React, { ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';

import { breakpoints } from '../../tokens/breakpoints';
import { Icon } from '../icon/icon';
import { SideDrawer } from '../side-drawer/side-drawer';
import { Logo, LogoName } from './logo';

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
        padding: 12px var(--spacing-2x);
    }

    @media screen and (max-width: ${breakpoints.mobile}px) {
        padding: var(--spacing-2x);
    }
`;

const LogoWrapper = styled(Link)`
    align-items: center;
    display: flex;
    font-size: 1.5rem;
    font-weight: var(--font-bold);
    height: 100%;
`;

const BurgerButton = styled.button`
    appearance: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
`;

const Content = styled.div`
    color: ${props => props.theme.greys.white};
`;

type appNameType =  'default'       | 'analyze' | 'apply'   |
                    'centralize'    | 'connect' | 'design'  |
                    'illustrate'    | 'manage'  | 'plan';

interface HeadbandProps {
    /** Set the app name to get the proper logos */
    appName?: appNameType;
    /** Right-side content */
    children: ReactNode;
    /**
     * Sets logo href
     * @default /
     **/
    logoHref?: string;
    /** What will be displayed inside the mobile drawer */
    mobileDrawerContent?: ReactNode;
}

export const ApplicationMenu = ({
    appName = 'default',
    children,
    logoHref = '/',
    mobileDrawerContent }: HeadbandProps): ReactElement => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth);
    const [mobile, setMobile] = useState(screenWidth <= breakpoints.mobile);
    const themeContext = useContext(ThemeContext);
    const productName = (mobile && appName !== 'default') ? `${appName}Mobile` as LogoName : appName;

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
        <Header>
            <LogoWrapper to={logoHref} aria-label="Home">
                <Logo name={productName} />
            </LogoWrapper>
            {mobile && mobileDrawerContent ? (
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
                    <SideDrawer id="menu-drawer" open={drawerOpen}>
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
