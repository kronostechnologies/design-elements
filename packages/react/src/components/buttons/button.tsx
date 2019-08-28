import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { AbstractButton, AbstractButtonProps } from './abstract-button';
import { primaryStyle } from './styles/primary';
import { secondaryStyle } from './styles/secondary';
import { tertiaryStyle } from './styles/tertiary';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends AbstractButtonProps {
    buttonType: ButtonType;
}

const StyledButton = styled(AbstractButton)((props: ButtonProps) => {
    if (props.buttonType === 'secondary') {
        return secondaryStyle;
    } else if (props.buttonType === 'tertiary') {
        return tertiaryStyle;
    }
    return primaryStyle;
});

export function Button({ children, onClick, ...props }: ButtonProps): ReactElement {
    function handleClick(): void {
        onClick && onClick();
    }

    return (
        <StyledButton onClick={handleClick} {...props}>
            {children}
        </StyledButton>
    );
}
