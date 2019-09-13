import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { AbstractButton, AbstractButtonProps } from './abstract-button';
import { primaryStyle } from './styles/primary';
import { secondaryStyle } from './styles/secondary';
import { tertiaryStyle } from './styles/tertiary';

export interface ButtonProps extends AbstractButtonProps {
    buttonType: 'primary' | 'secondary' | 'tertiary';
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

    const label: string = props.label || '';
    return (
        <StyledButton onClick={handleClick} {...props}>
            {children}{label}
        </StyledButton>
    );
}
