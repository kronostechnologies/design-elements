import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';
import { Icon, IconName } from '../icon/icon';
import { StyledLink } from './styles/styled-link';

type Nav = typeof NavLink;

export interface RouterLinkProps extends Nav {
    displayName?: string;
}

interface LinkProps {
    disabled?: boolean;
    exact?: boolean;
    href: string;
    iconName?: IconName;
    label?: string;
    routerLink: RouterLinkProps;
}

export function RouteLink({ disabled, exact, href, iconName, label, routerLink }: LinkProps): ReactElement {
    return (
      <>
        {disabled ?
          <StyledLink
            disabled={disabled}
            aria-disabled="true"
            className={`navigation${label ? '' : ' iconOnly'}`}
          >
            {iconName && <Icon name={iconName} size="16"/>}
            {label}
          </StyledLink>
          :
          <StyledLink
            as={routerLink}
            className={`navigation${label ? '' : ' iconOnly'}`}
            disabled={disabled}
            exact={exact}
            to={href}
          >
            {iconName && <Icon name={iconName} size="16"/>}
            {label}
          </StyledLink>
        }
      </>
    );
}
