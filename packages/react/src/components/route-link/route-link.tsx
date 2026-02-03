import { ComponentPropsWithoutRef, type FC, MouseEvent } from 'react';
import { Link as ReactRouterLink, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider';
import { Icon, IconName } from '../icon';
import { StyledLink } from './styles';

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

export interface RouteLinkProps extends RouterLinkProps {
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
export const RouteLink: FC<RouteLinkProps> = ({
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
