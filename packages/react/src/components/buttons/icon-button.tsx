import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Icon, IconName } from '../icon//icon';
import { Theme } from '../theme-wrapper/theme-wrapper';
import { AbstractButton } from './abstract-button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     **/
    buttonType: ButtonType;
    /**
     * Applies styles and sizes according to the device
     * @default desktop
     */
    device?: 'mobile' | 'desktop';
    /**
     * Disables button
     * @default false
     */
    disabled?: boolean;
    /**
     * Name of the desired icon (refer to icon library)
     */
    iconName: IconName;

    onClick?(): void;
}

const StyledButton = styled(AbstractButton)<ButtonProps>`
  height: ${props => props.device === 'mobile' ? '48px' : '32px'};
  ${(props: { theme: Theme, buttonType: ButtonType }) => {
      switch (props.buttonType) {
          case 'primary':
              return `
                  background-color: ${props.theme.main['secondary-4.1']};
                  border-color: ${props.theme.main['secondary-4.1']};
                  color: ${props.theme.greys.white};

                  &:hover {
                    background-color: ${props.theme.main['secondary-4.3']};
                    border-color: ${props.theme.main['secondary-4.3']};
                  }

                  &:disabled,
                  &:disabled:focus,
                  &:disabled:hover {
                    background-color: ${props.theme.main['secondary-4.2']};
                    border-color: ${props.theme.main['secondary-4.2']};
                  }
                `;
          case 'secondary':
              return `
                  background-color: transparent;
                  border-color: ${props.theme.main['secondary-4.1']};
                  color: ${props.theme.main['secondary-4.1']};

                  &:hover {
                    background-color: ${props.theme.main['secondary-4.1']};
                    border-color: ${props.theme.main['secondary-4.1']};
                    color: ${props.theme.greys.white};
                  }

                  &:disabled,
                  &:disabled:focus,
                  &:disabled:hover {
                    background-color: transparent;
                    border-color: ${props.theme.main['secondary-4.2']};
                    color: ${props.theme.main['secondary-4.2']};
                  }
              `;
          case 'tertiary':
              return `
                  background-color: transparent;
                  border-color: transparent;
                  color: ${props.theme.greys['dark-grey']};

                  &:hover {
                    color: ${props.theme.greys.black};
                  }

                  &:disabled,
                  &:disabled:focus,
                  &:disabled:hover {
                      color: ${props.theme.greys['mid-grey']};
                  }
              `;
      }
  }
  }
  padding: 0;
  width: ${props => props.device === 'mobile' ? '48px' : '32px'};
`;

export const IconButton = ({
  device = 'desktop',
  iconName,
  onClick,
  ...props
}: ButtonProps): ReactElement => {
    const handleClick = (): void => onClick && onClick();

    return (
        <StyledButton iconName={iconName} onClick={handleClick} device={device} {...props}>
            <Icon name={iconName} size={device === 'mobile' ? '20' : '16'}/>
        </StyledButton>
    );
};
