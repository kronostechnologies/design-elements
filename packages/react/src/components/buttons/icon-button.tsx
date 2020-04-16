import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon//icon';
import { Theme } from '../theme-wrapper/theme-wrapper';
import { AbstractButton } from './abstract-button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';
type Type = 'submit' | 'button' | 'reset';

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     **/
    buttonType: ButtonType;
    /**
     * Disables button
     * @default false
     */
    disabled?: boolean;
    /**
     * Name of the desired icon (refer to icon library)
     */
    iconName: IconName;
    /**
     * Sets aria-label
     */
    label: string;
    /**
     * Sets button type
     * @default submit
     */
    type?: Type;

    onClick?(): void;
}

interface StyledButtonProps {
    isMobile: boolean;
    theme: Theme;
    buttonType: ButtonType;
}

const StyledButton = styled(AbstractButton)<StyledButtonProps>`
    height: ${({ isMobile }) => isMobile ? '48px' : '32px'};
    ${(props: { theme: Theme, buttonType: ButtonType }) => {
        switch (props.buttonType) {
            case 'primary':
                return `
                    background-color: ${props.theme.main['secondary-4.1']};
                    border: none;
                    color: ${props.theme.greys.white};

                    &:hover {
                      background-color: ${props.theme.main['secondary-4.3']};
                    }

                    &:disabled {
                      background-color: ${props.theme.main['secondary-4.2']};
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

                    &:disabled {
                      background-color: transparent;
                      border-color: ${props.theme.main['secondary-4.2']};
                      color: ${props.theme.main['secondary-4.2']};
                    }
                `;
            case 'tertiary':
                return `
                    background-color: transparent;
                    border: none;
                    color: ${props.theme.greys['dark-grey']};

                    &:hover {
                      color: ${props.theme.greys.black};
                    }

                    &:disabled {
                        color: ${props.theme.greys['mid-grey']};
                    }
                `;
        }
    }
    }
    padding: 0;
    width: ${({ isMobile }) => isMobile ? '48px' : '32px'};
`;

export const IconButton = ({
  iconName,
  label,
  onClick,
  type = 'submit',
  ...props
}: ButtonProps): ReactElement => {
    const { isMobile } = useDeviceContext();
    const handleClick = (): void => onClick && onClick();

    return (
        <StyledButton
          aria-label={label}
          onClick={handleClick}
          isMobile={isMobile}
          type={type}
          {...props}
        >
            <Icon name={iconName} size={isMobile ? '20' : '16'}/>
        </StyledButton>
    );
};
