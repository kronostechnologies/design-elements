import React, { ReactElement, ReactNode } from 'react';

import styled from 'styled-components';
import { equisoftTheme } from '../../themes/equisoft';
import { Theme } from '../theme-wrapper/theme-wrapper';
import { AbstractButton } from './abstract-button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     **/
    buttonType: ButtonType;
    label?: string;
    children?: ReactNode;
    disabled?: boolean;

    onClick?(): void;
}
const StyledButton = styled(AbstractButton)`
  ${(props: {theme: Theme, buttonType: ButtonType}) => {
      const theme = Object.entries(props.theme).length === 0 ? equisoftTheme : props.theme;
      switch (props.buttonType) {
          case 'primary':
              return `
                background-color: ${theme.main['secondary-4.1']};
                border-color: ${theme.main['secondary-4.1']};
                color: ${theme.greys.white};

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
          case 'secondary':
              return `
                background-color: transparent;
                border-color: ${theme.main['secondary-4.1']};
                color: ${theme.main['secondary-4.1']};

                &:hover {
                  background-color: ${theme.main['secondary-4.1']};
                  border-color: ${theme.main['secondary-4.1']};
                  color: ${theme.greys.white};
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
          case 'tertiary':
              return `
                background-color: transparent;
                border-color: transparent;
                color: ${theme.greys['dark-grey']};

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
      }
  }}
`;

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
