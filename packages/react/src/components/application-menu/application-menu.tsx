import React, { ComponentProps, ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { focus } from '../../utils/css-state';
import { DeviceType, useDeviceContext } from '../device-context-provider/device-context-provider';
import { SkipLink } from '../skip-link/skip-link';
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
    position: relative;
`;

const LinkStyles = css`
    align-items: center;
    display: flex;
    font-size: 1.5rem;
    font-weight: var(--font-bold);
    height: 100%;

    ${focus}
    > * {
        height: 100%;
    }
`;

const ReactRouterLink = styled(Link).attrs({ 'aria-label': 'Home' })`
    ${LinkStyles}
`;

const HtmlLink = styled.a.attrs({ 'aria-label': 'Home' })`
    ${LinkStyles}
`;

const StyledSkipLink = styled(SkipLink)<ComponentProps<typeof SkipLink> & { isMobile?: boolean }>`
    background-color: ${({ theme }) => theme.greys.white};
    transform: translateY(-50%);
    transition: top 0.2s cubic-bezier(0.5, 1, 0, 1);

    &:not(:focus) {
        clip: unset;
        height: auto;
        top: -100%;
        width: auto;
    }

    &:focus {
        top: 50%;
    }
`;

interface ApplicationMenuProps {
    /** Set the app name to get the proper logos */
    appName?: LogoName;
    /** Right-side content */
    children: ReactNode;
    className?: string;
    customLogo?: ReactNode;
    /**
     * Sets logo href
     * @default /
     */
    logoHref?: string;
    /** What will be displayed inside the mobile drawer */
    mobileDrawerContent?: ReactNode;
    skipLinkHref?: string;
    usesReactRouter?: boolean;
}

export function ApplicationMenu({
    appName = 'default',
    children,
    className,
    customLogo,
    logoHref = '/',
    mobileDrawerContent,
    skipLinkHref,
    usesReactRouter = true,
}: ApplicationMenuProps): ReactElement {
    const { device, isMobile } = useDeviceContext();
    const appLogo = customLogo ?? <Logo name={appName} mobile={isMobile} />;

    return (
        <Header className={className} device={device}>
            {skipLinkHref && (
                <StyledSkipLink data-testid="skip-link" href={skipLinkHref} />
            )}

            {usesReactRouter ? (
                <ReactRouterLink data-testid="logo-react-router-link" to={logoHref}>{appLogo}</ReactRouterLink>
            ) : (
                <HtmlLink data-testid="logo-html-link" href={logoHref}>{appLogo}</HtmlLink>
            )}

            <Content mobileDrawerContent={mobileDrawerContent}>
                {children}
            </Content>
        </Header>
    );
}
