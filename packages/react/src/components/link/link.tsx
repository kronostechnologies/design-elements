import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, IconName } from '../icon/icon';

interface LinkProps {
    disabled?: boolean;
    exact?: boolean;
    href: string;
    iconName?: IconName;
    label?: string;
    routerLink?: typeof NavLink;
}

interface ContainerProps {
    activeClassName?: string;
    disabled?: boolean;
    exact?: boolean;
    to?: string;
}

const Container = styled.a<ContainerProps>`
  align-items: center;
  display: inline-flex;
  text-decoration: none;

  svg {
    margin-right: 8px;
  }

  &.iconOnly svg {
    margin: 0;
  }

  &.external {
    color: ${props => props.disabled ? '#7fbfd2' : '#0080a5'};

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
            <Container
              disabled={disabled}
              href={disabled ? undefined : href}
              aria-disabled={disabled ? 'true' : 'false'}
              className={'external' + (label && label !== '' ? '' : ' iconOnly')}
            >
              {iconName && <Icon name={iconName} size="16"/>}
              {label}
            </Container>
        );
    } else {
        if (disabled) {
            return (
              <Container
                disabled={disabled}
                aria-disabled="true"
                className={'navigation' + (label && label !== '' ? '' : ' iconOnly')}
              >
                {iconName && <Icon name={iconName} size="16"/>}
                {label}
              </Container>
            );
        } else {
            return (
              <Container
                activeClassName="active"
                as={routerLink}
                className={'navigation' + (label && label !== '' ? '' : ' iconOnly')}
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
