import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';
import { Icon, IconName } from '../icon/icon';
import { StyledLink } from './styles/styled-link';

type Nav = typeof NavLink;

interface RouterLinkProps extends Nav {
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

export const Link = ({ disabled, exact, href, iconName, label, routerLink }: LinkProps): ReactElement => (
  <>
    {disabled ?
      <StyledLink
        disabled={disabled}
        aria-disabled="true"
        className={`navigation ${label ? '' : 'iconOnly'}`}
      >
        {iconName && <Icon name={iconName} size="16"/>}
        {label}
      </StyledLink>
      :
      <StyledLink
        {...{
            as: routerLink,
            className: `navigation ${label ? '' : 'iconOnly'}`,
            disabled: disabled,
            exact: exact,
            to: href,
            ...(routerLink.displayName === 'NavLink' && { activeClassName: 'active' }),
        }}
      >
        {iconName && <Icon name={iconName} size="16"/>}
        {label}
      </StyledLink>
    }
  </>
);
