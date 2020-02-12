import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';
import { Icon, IconName } from '../icon/icon';
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
    iconOnly?: boolean;
    label: string;
    routerLink: RouterLinkProps;
}

export const RouteLink = ({
  disabled,
  exact,
  href,
  iconName,
  iconOnly = false,
  label,
  routerLink }: LinkProps): ReactElement => (
  <>
    {disabled ?
      <StyledLink
        aria-disabled="true"
        aria-label={label}
        disabled={disabled}
        className={`navigation${!iconOnly ? '' : ' iconOnly'}`}
      >
        {iconName && <Icon name={iconName} size="16"/>}
        {label}
      </StyledLink>
      :
      <StyledLink
        aria-label={label}
        as={routerLink}
        className={`navigation${!iconOnly ? '' : ' iconOnly'}`}
        disabled={disabled}
        exact={exact}
        to={href}
      >
        {iconName && <Icon name={iconName} size="16"/>}
        {!iconOnly && label}
      </StyledLink>
    }
  </>
);
