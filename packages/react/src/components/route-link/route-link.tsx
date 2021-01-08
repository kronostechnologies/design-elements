import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { Icon, IconName } from '../icon/icon';
import { StyledLink } from './styles/styled-link';

const Link = styled(StyledLink)`
    color: ${({ disabled, theme }) => (disabled ? theme.greys['mid-grey'] : theme.greys['dark-grey'])};

    &:hover {
        ${({ disabled, theme }) => (disabled ? '' : `color: ${theme.greys.black};`)}
    }

    &.active {
        ${({ disabled, theme }) => (disabled ? '' : `color: ${theme.main['primary-1.1']};`)}
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
}

export function RouteLink({
    className, disabled, exact, href, iconName, label, routerLink,
}: LinkProps): ReactElement {
    return (
        <Link
            aria-disabled={disabled}
            as={routerLink}
            className={className}
            disabled={disabled}
            exact={exact}
            $hasLabel={!!label}
            tabIndex={disabled ? -1 : 0}
            to={href}
            type="route"
        >
            {iconName && <Icon name={iconName} size="16" />}
            {label}
        </Link>
    );
}
