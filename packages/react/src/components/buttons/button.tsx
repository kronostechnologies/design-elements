import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { AbstractButton, AbstractButtonProps } from './abstract-button';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'destructive';

type Type = 'submit' | 'button' | 'reset';

interface ButtonProps extends AbstractButtonProps {
    /**
     * Visual style
     * @default primary
     */
    buttonType: ButtonType;
    /**
     * Sets button type
     * @default submit
     */
    type?: Type;
    inversed?: boolean;
}

const StyledButton = styled(AbstractButton)<{ theme: Theme } & ButtonProps>`
    ${(props) => focus(props, true)};
    ${({ theme, buttonType, inversed }) => {
        switch (buttonType) {
            case 'primary':
                return `
                    background-color: ${theme.main['primary-1.1']};
                    border-color: ${theme.main['primary-1.1']};
                    color: ${theme.greys.white};

                    &:hover {
                        background-color: ${theme.main['primary-1.3']};
                        border-color: ${theme.main['primary-1.3']};
                    }

                    &:disabled {
                        background-color: ${theme.main['primary-1.2']};
                        border-color: ${theme.main['primary-1.2']};
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
            case 'destructive':
                // TODO change colors when updating thematization
                return `
                    background-color: ${inversed ? theme.greys.white : theme.notifications['error-2.1']};
                    border-color: ${inversed ? theme.greys.white : theme.notifications['error-2.1']};
                    color: ${inversed ? theme.notifications['error-2.1'] : theme.greys.white};

                    &:hover {
                        background-color: ${inversed ? theme.greys.white : '#62071b'};
                        color: ${inversed ? '#62071b' : theme.greys.white};
                    }

                    &:disabled {
                        &,
                        &:focus,
                        &:hover {
                            background-color: ${inversed ? theme.greys.white : '#ea8da3'};
                            border-color: ${inversed ? theme.greys.white : '#ea8da3'};
                            color: ${inversed ? '#ea8da3' : theme.greys.white};
                        }
                    }
                `;
        }
    }}
`;

export function Button({
    children, label, type = 'submit', buttonType, disabled, onClick, ...props
}: ButtonProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return (
        <StyledButton
            isMobile={isMobile}
            type={type}
            buttonType={buttonType}
            disabled={disabled}
            onClick={onClick}
            {...props /* eslint-disable-line react/jsx-props-no-spreading *//* To spread aria-* and data-* */}
        >
            {children}
            {label}
        </StyledButton>
    );
}
