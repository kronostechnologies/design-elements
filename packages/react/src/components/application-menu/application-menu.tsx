import React, { ReactElement, ReactNode, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';

import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { SideDrawer } from '../side-drawer/side-drawer';
import { Logo, LogoName } from './logo';

const getPadding = (device: DeviceType): string => {
    if (device === 'tablet') return '12px var(--spacing-2x)';
    else if (device === 'mobile') return 'var(--spacing-2x)';
    else return 'var(--spacing-1x) var(--spacing-2x)';
};

const Header = styled.header<{ device: DeviceType }>`
    align-items: center;
    background: ${props => props.theme.main['primary-2']};
    box-sizing: border-box;
    display: flex;
    height: ${({ device }) => device === 'desktop' ? 48 : 56}px;
    justify-content: space-between;
    padding: ${({ device }) => getPadding(device)};
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

interface HeadbandProps {
    /** Set the app name to get the proper logos */
    appName?: LogoName;
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
    mobileDrawerContent }: HeadbandProps,
): ReactElement => {
    const { device, isMobile } = useDeviceContext();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const themeContext = useContext(ThemeContext);

    return (
        <Header device={device}>
            <LogoWrapper to={logoHref} aria-label="Home">
                <Logo name={appName} mobile={isMobile} />
            </LogoWrapper>
            {isMobile && mobileDrawerContent ? (
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
