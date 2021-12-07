import { MouseEvent, ReactElement } from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { Icon, IconName } from '../icon/icon';
import { StyledLink } from './styles/styled-link';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const Link = styled(StyledLink)<{ $isMobile: boolean, $hasLabel: boolean }>`
    color: ${({ disabled, theme }) => (disabled ? theme.main['primary-1.2'] : theme.main['primary-1.1'])};
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};

    svg {
        margin-right: ${({ $hasLabel }) => ($hasLabel ? 'var(--spacing-1x)' : '0')};
    }

    &:hover {
        ${({ disabled, theme }) => (disabled ? '' : `color: ${theme.main['primary-1.3']};`)};
    }

    &:visited {
        ${({ disabled }) => (disabled ? '' : 'color: #62a;')};

        svg {
            ${({ disabled }) => (disabled ? '' : 'color: #62a;')}
        }
    }

    &[disabled] {
        pointer-events: none;
    }
`;

type Nav = typeof NavLink;

export interface RouterLinkProps extends Nav {
    displayName?: string;
}

interface LinkProps {
    className?: string;
    disabled?: boolean;
    exact?: boolean;
    href: string;
    iconName?: IconName;
    label?: string;
    routerLink: RouterLinkProps;

    onClick?(event: MouseEvent<HTMLAnchorElement>): void;
}

export function RouteLink({
    className,
    disabled,
    exact,
    href,
    iconName,
    label,
    routerLink,
    onClick,
}: LinkProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return (
        <Link
            aria-disabled={disabled}
            as={routerLink}
            className={className}
            disabled={disabled}
            exact={exact}
            $hasLabel={!!label}
            $isMobile={isMobile}
            tabIndex={disabled ? -1 : 0}
            to={href}
            type="route"
            onClick={onClick}
        >
            {iconName && <Icon aria-hidden="true" name={iconName} size="16" />}
            {label}
        </Link>
    );
}
