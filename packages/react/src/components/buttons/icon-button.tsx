import { focus } from '@design-elements/utils/state';
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
    ${focus}
    ${(props: { theme: Theme, buttonType: ButtonType }) => {
        switch (props.buttonType) {
            case 'primary':
                return `
                    background-color: ${props.theme.main['primary-1.1']};
                    border-color: ${props.theme.main['primary-1.1']};
                    color: ${props.theme.greys.white};

                    &:hover {
                      background-color: ${props.theme.main['primary-1.3']};
                    }

                    &:disabled {
                      background-color: ${props.theme.main['primary-1.2']};
                    }
                  `;
            case 'secondary':
                return `
                    background-color: transparent;
                    border-color: ${props.theme.main['primary-1.1']};
                    color: ${props.theme.main['primary-1.1']};

                    &:hover {
                      border-color: ${props.theme.main['primary-1.3']};
                      color: ${props.theme.main['primary-1.3']};
                    }

                    &:disabled {
                      border-color: ${props.theme.main['primary-1.2']};
                      color: ${props.theme.main['primary-1.2']};
                    }
                `;
            case 'tertiary':
                return `
                    background-color: transparent;
                    border-color: transparent;
                    color: ${props.theme.greys['dark-grey']};

                    &:hover {
                      background-color: ${props.theme.greys.grey};
                      color: ${props.theme.greys.black};
                    }

                    &:disabled {
                        background-color: transparent;
                        color: ${props.theme.greys['mid-grey']};
                    }
                `;
        }
    }
    }
    padding: 0;
    width: ${({ isMobile }) => isMobile ? '48px' : '32px'};
`;

export function IconButton({
  iconName,
  label,
  onClick,
  type = 'submit',
  ...props
}: ButtonProps): ReactElement {
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
}
