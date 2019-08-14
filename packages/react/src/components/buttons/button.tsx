import React from 'react';
import styled from 'styled-components';

import { primaryStyles } from './styles/primary';
import { secondaryStyles } from './styles/secondary';
import { tertiaryStyles } from './styles/tertiary';

import { AbstractButton, AbstractButtonProps } from './abstract-button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends AbstractButtonProps {
    buttonType: ButtonType;
}

const StyledButton = styled(AbstractButton)`
    ${(props: ButtonProps) => {
        if (props.buttonType === 'secondary') {
            return secondaryStyles;
        } else if (props.buttonType === 'tertiary') {
            return tertiaryStyles;
        }
        return primaryStyles;
    }}
`;

export const Button = ({ children, disabled, onClick, buttonType }: ButtonProps) => {
    const handleClick = () => { onClick && onClick(); };

    return (
        <StyledButton disabled={disabled} onClick={handleClick} buttonType={buttonType}>
            {children}
        </StyledButton>
    );
};
