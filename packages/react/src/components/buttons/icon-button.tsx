import { Theme } from '@design-elements/themes/theme';
import { focus } from '@design-elements/utils/css-state';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';
import { AbstractButton, AbstractButtonProps } from './abstract-button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';
type Type = 'submit' | 'button' | 'reset';

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     */
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

const StyledButton = styled(AbstractButton)<AbstractButtonProps & StyledButtonProps>`
    ${(props) => focus(props, true)};
    ${({ theme, buttonType }) => {
        switch (buttonType) {
            case 'primary':
                return `
                    background-color: ${theme.main['primary-1.1']};
                    border-color: ${theme.main['primary-1.1']};
                    color: ${theme.greys.white};

                    &:hover {
                        background-color: ${theme.main['primary-1.3']};
                    }

                    &:disabled {
                        background-color: ${theme.main['primary-1.2']};
                    }
                `;
            case 'secondary':
                return `
                    background-color: transparent;
                    border-color: ${theme.main['primary-1.1']};
                    color: ${theme.main['primary-1.1']};

                    &:hover {
                        border-color: ${theme.main['primary-1.3']};
                        color: ${theme.main['primary-1.3']};
                    }

                    &:disabled {
                        border-color: ${theme.main['primary-1.2']};
                        color: ${theme.main['primary-1.2']};
                    }
                `;
            case 'tertiary':
                return `
                    background-color: transparent;
                    border-color: transparent;
                    color: ${theme.greys['dark-grey']};

                    &:hover {
                        background-color: ${theme.greys.grey};
                        color: ${theme.greys.black};
                    }

                    &:disabled {
                        background-color: transparent;
                        color: ${theme.greys['mid-grey']};
                    }
                `;
        }
    }}

    padding: 0;
    width: ${({ isMobile }) => (isMobile ? '48px' : '32px')};
`;

export function IconButton({
    iconName,
    label,
    onClick,
    type = 'submit',
    buttonType,
    disabled,
    ...props
}: ButtonProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const handleClick = (): void => onClick?.();

    return (
        <StyledButton
            aria-label={label}
            onClick={handleClick}
            isMobile={isMobile}
            type={type}
            buttonType={buttonType}
            disabled={disabled}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            <Icon name={iconName} size={isMobile ? '20' : '16'} />
        </StyledButton>
    );
}
