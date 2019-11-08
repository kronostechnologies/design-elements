import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, IconName } from '../icon/icon';

interface LinkProps {
    disabled?: boolean;
    exact?: boolean;
    href: string;
    iconName?: IconName;
    label: string;
    routerLink?: typeof NavLink;
}

const Container = styled.a`
  align-items: center;
  display: inline-flex;
  text-decoration: none;

  svg {
    margin-right: 8px;
  }

  &.external {
    color:
      ${(props: {
          activeClassName?: string,
          disabled?: boolean,
          exact?: boolean,
          to?: string,
      }) => props.disabled ? '#7fbfd2' : '#0080a5'};

    &:hover {
      ${props => props.disabled ? '' : 'text-decoration: underline'};
    }

    &:visited {
      color: #094c6c;

      svg {
        color: #094c6c;
      }
    }
  }

  &.navigation {
    color: ${props => props.disabled ? '#9ca7b4' : '#57666e'};

    &:hover {
      ${props => props.disabled ? '' : 'color: #000;'}
    }

    ${props => props.disabled ? '' : `
      &.active {
        color: #0080a5;
      }
    `}
  }
`;

export function Link({ disabled, exact, href, iconName, label, routerLink }: LinkProps): ReactElement {
    if (!routerLink) {
        return (
            <Container disabled={disabled} href={disabled ? undefined : href} className="external">
              {iconName && <Icon name={iconName} size="16"/>}
              {label}
            </Container>
        );
    } else {
        if (disabled) {
            return (
              <Container disabled={disabled} className="navigation">
                {iconName && <Icon name={iconName} size="16"/>}
                {label}
              </Container>
            );
        } else {
            return (
              <Container
                activeClassName="active"
                as={routerLink}
                className="navigation"
                disabled={disabled}
                exact={exact}
                to={href}
              >
                {iconName && <Icon name={iconName} size="16"/>}
                {label}
              </Container>
            );
        }
    }
}
