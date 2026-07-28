import { forwardRef, MouseEvent, ReactElement, Ref } from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useTranslation } from '../../../i18n/use-translation';
import { focus } from '../../../utils/css-state';
import { useDeviceContext } from '../../device-context-provider';
import { type DeviceContextProps } from '../../device-context-provider/device-context-provider';
import { ExternalLink } from '../../external-link';
import { type IconName } from '../../icon';
import { ScreenReaderOnlyText } from '../../screen-reader-only-text';
import { ItemContent } from './item-content';

export interface NavItemProps {
    value: string;
    href: string;
    description?: string;
    iconName?: IconName;
    label?: string;
    lozenge?: string;
    end?: boolean;
    isExternalLink?: boolean;
    isHtmlLink?: boolean;
    disabled?: boolean;
    target?: string;
    onClick?(event: MouseEvent): void;
}

interface LinkProps {
    $hasIcon?: boolean;
    $device: DeviceContextProps;
    disabled?: boolean;
    onClick?(event: MouseEvent): void;
}

const NavItemStyle = css<LinkProps>`
    align-items: center;
    color: ${({ theme }) => theme.component['dropdown-menu-nav-item-text-color']};
    display: flex;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '1rem' : '0.875rem')};
    height: ${({ $hasIcon, $device: { isMobile, isTablet } }) => ((isTablet || isMobile || $hasIcon) ? 2.5 : 2)}rem;
    line-height: 2rem;
    padding: 0 var(--spacing-2x);
    text-decoration: none;
    white-space: nowrap;

    ${({ theme }) => focus({ theme }, { insideOnly: true })};

    &:hover {
        background-color: ${({ disabled, theme }) => (disabled ? theme.component['dropdown-menu-nav-item-disabled-background-color'] : theme.component['dropdown-menu-nav-item-hover-background-color'])};
    }

    &[disabled],
    &[disabled] * {
        color: ${({ theme }) => theme.component['dropdown-menu-nav-item-disabled-text-color']};
        cursor: default;
        fill: ${({ theme }) => theme.component['dropdown-menu-nav-item-disabled-icon-color']};
        pointer-events: none;
    }
`;

export const StyledNavItem = styled(NavLink)<LinkProps & NavLinkProps>`
    ${NavItemStyle}
`;

export const HtmlLink = styled.a<LinkProps>`
    ${NavItemStyle};
`;

export const StyledExternalLink = styled(ExternalLink)`
    ${NavItemStyle}

    &:visited {
        svg {
            color: ${({ theme }) => theme.component['dropdown-menu-nav-item-external-link-icon-color']};
        }
    }

    span {
        color: ${({ theme }) => theme.component['dropdown-menu-nav-item-external-link-text-color']};
        padding: 0 0 0 var(--spacing-half);
    }

    padding: 0 var(--spacing-2x);
`;

export const NavItem = forwardRef(({
    href,
    value,
    description,
    iconName,
    label,
    disabled,
    onClick,
    isExternalLink = false,
    isHtmlLink = false,
    lozenge,
    end,
    target,
}: NavItemProps, ref: Ref<HTMLAnchorElement>): ReactElement => {
    const device = useDeviceContext();
    const { t } = useTranslation('common');
    const opensInNewTab = target === '_blank';

    function renderScreenReaderOnlyText(): ReactElement {
        return (
            <ScreenReaderOnlyText data-testid="screen-reader-text" label={t('opensInNewTabScreenReader')} />
        );
    }

    function renderNavItem(): ReactElement {
        if (isExternalLink) {
            return (
                <StyledExternalLink
                    disabled={disabled}
                    href={href}
                    label={label}
                    onClick={onClick}
                    target={target}
                    $device={device}
                />
            );
        }

        if (isHtmlLink) {
            return (
                <HtmlLink
                    aria-disabled={disabled ? 'true' : 'false'}
                    ref={ref}
                    $hasIcon={!!iconName}
                    $device={device}
                    disabled={disabled}
                    href={href}
                    target={target}
                    onClick={disabled ? undefined : onClick}
                    tabIndex={disabled ? -1 : 0}
                >
                    <ItemContent
                        device={device}
                        label={label || value}
                        description={description}
                        iconName={iconName}
                        lozenge={lozenge}
                    />
                    {opensInNewTab && renderScreenReaderOnlyText()}
                </HtmlLink>
            );
        }

        return (
            <StyledNavItem
                aria-disabled={disabled ? 'true' : 'false'}
                tabIndex={disabled ? -1 : 0}
                ref={ref}
                to={href}
                $hasIcon={!!iconName}
                $device={device}
                data-testid={`listitem-${value}`}
                disabled={disabled}
                end={end}
                target={target}
                onClick={disabled ? undefined : onClick}
            >
                <ItemContent
                    device={device}
                    label={label || value}
                    description={description}
                    iconName={iconName}
                    lozenge={lozenge}
                />
                {opensInNewTab && renderScreenReaderOnlyText()}
            </StyledNavItem>
        );
    }

    return (
        <li>
            {renderNavItem()}
        </li>
    );
});

NavItem.displayName = 'NavItem';
