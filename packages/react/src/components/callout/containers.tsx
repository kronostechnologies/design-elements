import { FunctionComponent, PropsWithChildren } from 'react';
import styled, { css, ThemedCssFunction } from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';

type MobileDeviceContext = { $isMobile: boolean };
type Role = 'status' | 'alert';

interface AbstractContainerProps extends MobileDeviceContext {
    className?: string;
    role: Role;
    tabIndex?: number;
}

function getLayout({ $isMobile }: AbstractContainerProps): ReturnType<ThemedCssFunction<ResolvedTheme>> {
    if ($isMobile) {
        return css`
            display: grid;
            grid-template-areas:
                'icon content'
                'button button';
            grid-template-columns: auto 1fr;
        `;
    }
    return css`
        display: flex;
    `;
}

function abstractContainer(
    bgColor: keyof ResolvedTheme['component'],
    borderColor: keyof ResolvedTheme['component'],
    iconColor: keyof ResolvedTheme['component'],
): FunctionComponent<PropsWithChildren<AbstractContainerProps>> {
    return styled.section<AbstractContainerProps>`
        background-color: ${(props) => props.theme.component[bgColor]};
        border: 1px solid ${(props) => props.theme.component[borderColor]};
        border-radius: var(--border-radius-2x);
        box-sizing: border-box;
        line-height: ${({ $isMobile }) => getLineHeight($isMobile)}px;
        padding: ${(props) => (props.$isMobile ? 'var(--spacing-3x) var(--spacing-2x)' : 'var(--spacing-2x) var(--spacing-3x)')};
        position: relative;
        width: 100%;

        ${getLayout};

        ${focus};

        ${BannerIcon} {
            color: ${(props) => (props.theme.component[iconColor])};
            flex: 0 0 auto;
            height: 1rem;
            width: 1rem;
        }
    `;
}

export const NeutralContainer = abstractContainer(
    'sectional-banner-neutral-background-color',
    'sectional-banner-neutral-border-color',
    'sectional-banner-neutral-icon-color',
);
export const InfoContainer = abstractContainer(
    'sectional-banner-info-background-color',
    'sectional-banner-info-border-color',
    'sectional-banner-info-icon-color',
);
export const DiscoveryContainer = abstractContainer(
    'sectional-banner-discovery-background-color',
    'sectional-banner-discovery-border-color',
    'sectional-banner-discovery-icon-color',
);
export const SuccessContainer = abstractContainer(
    'sectional-banner-success-background-color',
    'sectional-banner-success-border-color',
    'sectional-banner-success-icon-color',
);
export const WarningContainer = abstractContainer(
    'sectional-banner-warning-background-color',
    'sectional-banner-warning-border-color',
    'sectional-banner-warning-icon-color',
);
export const AlertContainer = abstractContainer(
    'sectional-banner-alert-background-color',
    'sectional-banner-alert-border-color',
    'sectional-banner-alert-icon-color',
);
