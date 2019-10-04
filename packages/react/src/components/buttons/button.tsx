import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { AbstractButton } from './abstract-button';

// @ts-ignore
import equisoftTheme from '../../themes/equisoft';

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     **/
    buttonType: 'primary' | 'secondary' | 'tertiary';
    label?: string;
    children?: ReactNode;
    disabled?: boolean;

    onClick?(): void;
}

// @ts-ignore
const primaryStyle = (theme) => `
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

// @ts-ignore
const secondaryStyle = (theme) => `
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

// @ts-ignore
const tertiaryStyle = (theme) => `
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
    // @ts-ignore
    const { theme } = props;

    if (props.buttonType === 'secondary') {
        // @ts-ignore
        return secondaryStyle(theme);
    } else if (props.buttonType === 'tertiary') {
        // @ts-ignore
        return tertiaryStyle(theme);
    }
    // @ts-ignore
    return primaryStyle(theme);
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
