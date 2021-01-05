import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, IconName } from '../icon/icon';
import { StyledLink } from './styles/styled-link';

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
    const getClassNames = (): string => ['navigation', className, !label && 'iconOnly'].filter(Boolean).join(' ');

    return disabled ? (
        <StyledLink
            disabled={disabled}
            aria-disabled="true"
            className={getClassNames()}
        >
            {iconName && <Icon name={iconName} size="16" />}
            {label}
        </StyledLink>
    ) : (
        <StyledLink
            as={routerLink}
            className={getClassNames()}
            disabled={disabled}
            exact={exact}
            to={href}
        >
            {iconName && <Icon name={iconName} size="16" />}
            {label}
        </StyledLink>
    );
}
