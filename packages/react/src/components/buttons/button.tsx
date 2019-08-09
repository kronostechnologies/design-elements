import React from 'react';
import styled from 'styled-components';

import primaryStyle from './styles/primary';
import secondaryStyle from './styles/secondary';
import tertiaryStyle from './styles/tertiary';

import { AbstractButton, AbstractButtonProps } from './abstract-button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends AbstractButtonProps {
    buttonType: ButtonType;
}

const StyledButton = styled(AbstractButton)`
    ${(props: ButtonProps) => {
        if (props.buttonType === 'secondary') {
            return secondaryStyle;
        } else if (props.buttonType === 'tertiary') {
            return tertiaryStyle;
        }
        return primaryStyle;
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
