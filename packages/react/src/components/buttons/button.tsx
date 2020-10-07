import { focus } from '@design-elements/utils/state';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
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
    ${focus}
    ${({ theme, buttonType }: { theme: Theme, buttonType: ButtonType }) => {
        switch (buttonType) {
            case 'primary':
                return `
                    background-color: ${theme.main['primary-1.1']};
                    color: ${theme.greys.white};

                    &:hover {
                        background-color: ${theme.main['primary-1.3']};
                        border-color: ${theme.main['primary-1.3']};
                    }

                    &:disabled {
                        &,
                        &:focus,
                        &:hover {
                            background-color: ${theme.main['primary-1.2']};
                            border-color: ${theme.main['primary-1.2']};
                        }
                    }
                  `;
            case 'secondary':
                return `
                    background-color: transparent;
                    border-color: ${theme.main['primary-1.1']};
                    color: ${theme.main['primary-1.1']};

                    &:hover {
                        background-color: ${theme.main['primary-1.1']};
                        color: ${theme.greys.white};
                    }

                    &:disabled {
                        &,
                        &:focus,
                        &:hover {
                            border-color: ${theme.main['primary-1.2']};
                            color: ${theme.main['primary-1.2']};
                        }
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
                        &,
                        &:focus,
                        &:hover {
                            background-color: transparent;
                            color: ${theme.greys['mid-grey']};
                        }
                    }
                `;
        }
    }
}
`;

export function Button({ children, label, type = 'submit', ...props }: ButtonProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return (
        <StyledButton isMobile={isMobile} type={type} {...props}>
            {children}{label}
        </StyledButton>
    );
}
