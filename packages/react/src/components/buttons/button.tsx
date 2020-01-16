import React, { ReactElement } from 'react';

import styled from 'styled-components';
import { Theme } from '../theme-wrapper/theme-wrapper';
import { AbstractButton, AbstractButtonProps } from './abstract-button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends AbstractButtonProps {
    /**
     * Visual style
     * @default primary
     **/
    buttonType: ButtonType;
}

const StyledButton = styled(AbstractButton)<ButtonProps>`
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

                    &:disabled {
                        &,
                        &:focus,
                        &:hover {
                            background-color: ${props.theme.main['secondary-4.2']};
                            border-color: ${props.theme.main['secondary-4.2']};
                        }
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
                        &,
                        &:focus,
                        &:hover {
                            background-color: transparent;
                            border-color: ${props.theme.main['secondary-4.2']};
                            color: ${props.theme.main['secondary-4.2']};
                        }
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

                    &:disabled {
                        &,
                        &:focus,
                        &:hover {
                            color: ${props.theme.greys['mid-grey']};
                        }
                    }
                `;
        }
    }
}
`;

export function Button({ children, onClick, ...props }: ButtonProps): ReactElement {
    function handleClick(): void {
        onClick && onClick();
    }

    const label: string = props.label || '';
    return (
        <StyledButton onClick={handleClick} {...props}>
            {children}{label}
        </StyledButton>
    );
}
