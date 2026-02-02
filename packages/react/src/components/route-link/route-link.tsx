import { ComponentPropsWithoutRef, MouseEvent, VoidFunctionComponent } from 'react';
import { NavLink, Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';
import { StyledLink } from './styles/styled-link';

const Link = styled(StyledLink)`
    svg {
        height: 1rem;
        margin-right: ${({ $hasLabel }) => ($hasLabel ? 'var(--spacing-1x)' : '0')};
        width: 1rem;
    }

    &:visited {
        svg {
            ${({ disabled, theme }) => !disabled && `
                color: ${theme.component['route-link-visited-text-color']};
            `}
        }
    }

    &[disabled] {
        pointer-events: none;
    }
`;

type RouterLinkProps = Pick<
    ComponentPropsWithoutRef<typeof NavLink>,
    'end'
>;

interface LinkProps extends RouterLinkProps {
    className?: string;
    disabled?: boolean;
    href: string;
    iconName?: IconName;
    label?: string;
    routerLink: typeof NavLink | typeof ReactRouterLink;

    onClick?(event: MouseEvent<HTMLAnchorElement>): void;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases. Use Link instead.
 */
export const RouteLink: VoidFunctionComponent<LinkProps> = ({
    className,
    disabled,
    end,
    href,
    iconName,
    label,
    routerLink,
    onClick,
}) => {
    const { isMobile } = useDeviceContext();

    return (
        <Link
            aria-disabled={disabled}
            as={routerLink}
            className={className}
            disabled={disabled}
            end={end}
            $hasLabel={!!label}
            $isMobile={isMobile}
            tabIndex={disabled ? -1 : 0}
            to={href}
            onClick={onClick}
        >
            {iconName && <Icon aria-hidden="true" name={iconName} size="16" />}
            {label}
        </Link>
    );
};

RouteLink.displayName = 'RouteLink';
