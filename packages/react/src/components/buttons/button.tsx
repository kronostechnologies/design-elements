import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { AbstractButton } from './abstract-button';

import { equisoftTheme } from '../../themes/equisoft';

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     **/
    buttonType: 'primary' | 'secondary' | 'tertiary';
    label?: string;
    children?: ReactNode;
    disabled?: boolean;
    theme?: Theme | {};

    onClick?(): void;
}

const primaryStyle = (theme: Theme) => `
  background-color: ${theme.main['secondary-4.1']};
  border-color: ${theme.main['secondary-4.1']};
  color: white;

  &:hover {
    background-color: ${theme.main['secondary-4.3']};
    border-color: ${theme.main['secondary-4.3']};
  }

  &:disabled {
    &,
    &:focus,
    &:hover {
      background-color: ${theme.main['secondary-4.2']};
      border-color: ${theme.main['secondary-4.2']};
    }
  }
`;

const secondaryStyle = (theme: Theme) => `
  background-color: transparent;
  border-color: ${theme.main['secondary-4.1']};
  color: ${theme.main['secondary-4.1']};

  &:hover {
    background-color: ${theme.main['secondary-4.1']};
    border-color: ${theme.main['secondary-4.1']};
    color: white;
  }

  &:disabled {
      &,
      &:focus,
      &:hover {
        background-color: transparent;
        border-color: ${theme.main['secondary-4.2']};
        color: ${theme.main['secondary-4.2']};
      }
  }
`;

const tertiaryStyle = (theme: Theme) => `
  background-color: transparent;
  border-color: transparent;
  color: ${theme.greys['light-grey']};

  &:hover {
    color: ${theme.greys.black};
  }

  &:disabled {
    &,
    &:focus,
    &:hover {
      color: ${theme.greys['mid-grey']};
    }
  }
`;

const StyledButton = styled(AbstractButton)((props: ButtonProps) => {
    let { theme }: ButtonProps = props;

    if (theme) {
        if (Object.entries(theme).length === 0 && theme.constructor === Object) {
            theme = equisoftTheme;
        }

        if (props.buttonType === 'secondary') {
            return secondaryStyle(theme as Theme);
        } else if (props.buttonType === 'tertiary') {
            return tertiaryStyle(theme as Theme);
        }
        return primaryStyle(theme as Theme);
    }

    return '';
});

export function Button({ children, onClick, ...props }: ButtonProps): ReactElement {
    function handleClick(): void {
        onClick && onClick();
    }

    const label: string = props.label || '';
    return (
        <StyledButton onClick={handleClick} {...props}>
            {children}{label}
        </StyledButton>
    );
}
