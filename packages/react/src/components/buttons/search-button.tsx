import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { LegacyAbstractButton } from './abstract-button';

interface ButtonProps {
    label?: string;
    children?: ReactNode;
    className: string;
    disabled?: boolean;

    onClick?(): void;
}

const StyledButton = styled(LegacyAbstractButton)`
    ${props => `
        background: ${props.theme.greys.white};
        border-color: ${props.theme.greys.grey};
        color: ${props.theme.greys['mid-grey']};

        &:disabled {
            &,
            &:focus,
            &:hover {
                background-color: ${props.theme.greys.grey};
                border-color: ${props.theme.greys.grey};
                color: ${props.theme.greys['mid-grey']};
            }

            &:disabled {
                &,
                &:focus,
                &:hover {
                    background-color: ${props.theme.greys['light-grey']};
                    border-color: ${props.theme.greys.grey};
                    color: ${props.theme.greys['mid-grey']};
                }
            }
        }`}
`;

export function SearchButton({ children, label, ...props }: ButtonProps): ReactElement {
    return (
        <StyledButton {...props}>
            {children}{label}
        </StyledButton>
    );
}
