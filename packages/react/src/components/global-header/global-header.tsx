import { ComponentProps, FunctionComponent, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { focus } from '../../utils/css-state';
import { type DeviceType, useDeviceContext } from '../device-context-provider';
import { SkipLink, type SkipLinkProps } from '../skip-link';
import { GlobalHeaderContent } from './global-header-content';
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
    background: ${(props) => props.theme.component['global-header-background-color']};
    box-sizing: border-box;
    display: flex;
    height: ${({ device }) => (device === 'desktop' ? 'var(--size-3x)' : 'var(--size-3halfx)')};
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
    text-decoration: none;

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

const StyledSpan = styled.span`
    border-left: 1px solid ${({ theme }) => theme.component['global-header-logo-title-separator-color']};
    color: ${({ theme }) => theme.component['global-header-logo-content-text-color']};
    font-size: 1rem;
    font-weight: var(--font-normal);
    height: unset;
    line-height: 1.5rem;
    margin-left: var(--spacing-2x);
    padding-left: var(--spacing-2x);
    width: max-content;
`;

const StyledSkipLink = styled(SkipLink)<ComponentProps<typeof SkipLink> & { isMobile?: boolean }>`
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

export interface GlobalHeaderProps {
    /** Set the app name to get the proper logos */
    appName?: LogoName;
    /** Sets app title which appears next to logo on desktop */
    appTitleDesktop?: string;
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
    skipLink?: SkipLinkProps,
    usesReactRouter?: boolean;
}

export const GlobalHeader: FunctionComponent<PropsWithChildren<GlobalHeaderProps>> = ({
    appName = 'default',
    appTitleDesktop,
    children,
    className,
    customLogo,
    logoHref = '/',
    mobileDrawerContent,
    skipLink,
    usesReactRouter = true,
}) => {
    const { device, isMobile } = useDeviceContext();
    const appLogo = customLogo ?? <Logo name={appName} mobile={isMobile} />;

    function renderLogoContent(): ReactElement {
        return (
            <>
                {appLogo}
                {(!isMobile && appTitleDesktop) && (
                    <StyledSpan data-testid="app-title">{appTitleDesktop}</StyledSpan>
                )}
            </>
        );
    }

    return (
        <Header className={className} device={device}>
            {skipLink && (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <StyledSkipLink data-testid="skip-link" {...skipLink} />
            )}

            {usesReactRouter ? (
                <ReactRouterLink data-testid="logo-react-router-link" to={logoHref}>
                    {renderLogoContent()}
                </ReactRouterLink>
            ) : (
                <HtmlLink data-testid="logo-html-link" href={logoHref}>
                    {renderLogoContent()}
                </HtmlLink>
            )}

            <GlobalHeaderContent mobileDrawerContent={mobileDrawerContent}>
                {children}
            </GlobalHeaderContent>
        </Header>
    );
};

GlobalHeader.displayName = 'GlobalHeader';
