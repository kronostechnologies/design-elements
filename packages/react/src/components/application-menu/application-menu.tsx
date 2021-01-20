import React, { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';
import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Content } from './application-menu-content';
import { Logo, LogoName } from './logo';

const getPadding = (device: DeviceType): string => {
    if (device === 'tablet') {
        return '12px var(--spacing-2x)';
    }
    if (device === 'mobile') {
        return 'var(--spacing-2x)';
    }
    return 'var(--spacing-1x) var(--spacing-2x)';
};

const Header = styled.header<{ device: DeviceType }>`
    align-items: center;
    background: ${(props) => props.theme.main['primary-2']};
    box-sizing: border-box;
    display: flex;
    height: ${({ device }) => (device === 'desktop' ? 48 : 56)}px;
    justify-content: space-between;
    padding: ${({ device }) => getPadding(device)};
`;

const LogoWrapper = styled(Link)`
    align-items: center;
    display: flex;
    font-size: 1.5rem;
    font-weight: var(--font-bold);
    height: 100%;
    ${focus}
`;

interface HeadbandProps {
    /** Set the app name to get the proper logos */
    appName?: LogoName;
    /** Right-side content */
    children: ReactNode;
    /**
     * Sets logo href
     * @default /
     */
    logoHref?: string;
    /** What will be displayed inside the mobile drawer */
    mobileDrawerContent?: ReactNode;
}

export function ApplicationMenu({
    appName = 'default',
    children,
    logoHref = '/',
    mobileDrawerContent,
}: HeadbandProps): ReactElement {
    const { device, isMobile } = useDeviceContext();

    return (
        <Header device={device}>
            <LogoWrapper to={logoHref} aria-label="Home">
                <Logo name={appName} mobile={isMobile} />
            </LogoWrapper>

            <Content mobileDrawerContent={mobileDrawerContent}>
                {children}
            </Content>
        </Header>
    );
}
