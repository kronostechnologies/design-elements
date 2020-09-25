import React, { ReactElement } from 'react';

import styled from 'styled-components';
import { Theme } from '../theme-wrapper/theme-wrapper';
import { AbstractButton, AbstractButtonProps } from './abstract-button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

type Type = 'submit' | 'button' | 'reset';

interface ButtonProps extends AbstractButtonProps {
    /**
     * Visual style
     * @default primary
     **/
    buttonType: ButtonType;
    /**
     * Sets button type
     * @default submit
     */
    type?: Type;
}

const StyledButton = styled(AbstractButton)<ButtonProps>`
    ${(props: { theme: Theme, buttonType: ButtonType }) => {
        switch (props.buttonType) {
            case 'primary':
                return `
                    background-color: ${props.theme.main['primary-1.1']};
                    border-color: ${props.theme.main['primary-1.1']};
                    color: ${props.theme.greys.white};

                    &:hover {
                        background-color: ${props.theme.main['primary-1.3']};
                        border-color: ${props.theme.main['primary-1.3']};
                    }
                    &:focus {
                        box-shadow: 0 0 0 2px rgba(0, 128, 165, 0.4);
                    }

                    &:disabled {
                        &,
                        &:focus,
                        &:hover {
                            background-color: ${props.theme.main['primary-1.2']};
                            border-color: ${props.theme.main['primary-1.2']};
                        }
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
                    &:focus {
                        box-shadow: 0 0 0 2px rgba(0, 128, 165, 0.4);
                    }

                    &:disabled {
                        &,
                        &:focus,
                        &:hover {
                            border-color: ${props.theme.main['primary-1.2']};
                            color: ${props.theme.main['primary-1.2']};
                        }
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
                    &:focus {
                        border-color: ${props.theme.main['primary-1.1']};
                        box-shadow: 0 0 0 2px rgba(0, 128, 165, 0.4);
                    }

                    &:disabled {
                        &,
                        &:focus,
                        &:hover {
                            background-color: transparent;
                            color: ${props.theme.greys['mid-grey']};
                        }
                    }
                `;
        }
    }
}
`;

export function Button({ children, onClick, type = 'submit', ...props }: ButtonProps): ReactElement {
    function handleClick(): void {
        onClick && onClick();
    }

    const label: string = props.label || '';
    return (
        <StyledButton onClick={handleClick} type={type} {...props}>
            {children}{label}
        </StyledButton>
    );
}
