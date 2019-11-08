import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';
import { Icon, IconName } from '../icon/icon';
import { StyledLink } from './styles/styled-link';

interface LinkProps {
    disabled?: boolean;
    exact?: boolean;
    href: string;
    iconName?: IconName;
    label?: string;
    routerLink: typeof NavLink;
}

export function Link({ disabled, exact, href, iconName, label, routerLink }: LinkProps): ReactElement {
    if (disabled) {
        return (
          <StyledLink
            disabled={disabled}
            aria-disabled="true"
            className={'navigation' + (label && label !== '' ? '' : ' iconOnly')}
          >
            {iconName && <Icon name={iconName} size="16"/>}
            {label}
          </StyledLink>
        );
    } else {
        return (
          <StyledLink
            activeClassName="active"
            as={routerLink}
            className={'navigation' + (label && label !== '' ? '' : ' iconOnly')}
            disabled={disabled}
            exact={exact}
            to={href}
          >
            {iconName && <Icon name={iconName} size="16"/>}
            {label}
          </StyledLink>
        );
    }
}
