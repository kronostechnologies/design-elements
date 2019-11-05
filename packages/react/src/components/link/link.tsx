import React, { ReactElement } from 'react';

import { BrowserRouter, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, IconName } from '../icon/icon';

interface LinkProps {
    type?: 'nav' | 'ext';
    href: string;
    iconName?: IconName;
    label: string;
    disabled?: boolean;
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;

  .link {
    font-size: 0.875rem;
    font-weight: 400;
    margin: ${(props: {disabled?: boolean, icon: boolean}) => props.icon ? '0 0 0 8px' : '0'};
    ${props => props.disabled ? 'cursor: default' : ''};
    text-decoration: none;
  }

  &.external {
    color: ${props => props.disabled ? '#7fbfd2 !important' : '#0080a5'};

    .link {
      color: ${props => props.disabled ? '#7fbfd2 !important' : '#0080a5'};

      &:hover {
        ${props => props.disabled ? '' : 'text-decoration: underline'};
      }

      &:visited {
        color: #094c6c;
      }
    }
  }

  &.navigation {
    color: ${props => props.disabled ? '#9ca7b4 !important' : '#57666e'};

    /* stylelint-disable */
    .link {
    /* stylelint-enable */
      color: ${props => props.disabled ? '#9ca7b4 !important' : '#57666e'};

      &:hover {
        color: #000;

        ~ svg {
          ${props => props.disabled ? '' : 'color: #000'};
        }
      }

      ${props => props.disabled ? '' : `
        &:active {
          color: #0080a5;
          font-weight: 600;

          ~ svg {
            color: #0080a5;
          }
        }
      `}
    }
  }
`;

export function Link({ disabled, href, iconName, label, type }: LinkProps): ReactElement {
    if (type === 'ext') {
        return (
            <Container disabled={disabled} className="external" icon={iconName ? true : false}>
                {disabled ?
                    <p className="link">
                        {label}
                    </p> :
                    <a href={href} className="link">
                        {label}
                    </a>
                }
                {iconName && <Icon name={iconName} size="16"/>}
            </Container>
        );
    } else {
        return (
            <BrowserRouter>
                <Container disabled={disabled} className="navigation" icon={iconName ? true : false}>
                    {disabled ?
                        <p className="link">
                            {label}
                        </p> :
                        <NavLink to={href} className="link">
                            {label}
                        </NavLink>
                    }
                    {iconName && <Icon name={iconName} size="16"/>}
                </Container>
            </BrowserRouter>
        );
    }
}
