import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { AbstractButton } from './abstract-button';

interface ButtonProps {
    label?: string;
    children?: ReactNode;
    className: string;
    disabled?: boolean;

    onClick?(): void;
}

const StyledButton = styled(AbstractButton)`
    ${({ theme }) => `
        background: ${theme.greys.white};
        border-color: ${theme.greys['dark-grey']};
        color: ${theme.greys['dark-grey']};

        &:hover {
            background-color: ${theme.greys.grey};
            color: ${theme.greys.black};
        }

        &:disabled {
            &,
            &:focus,
            &:hover {
                background-color: ${theme.greys['light-grey']};
                border-color: ${theme.greys.grey};
                color: ${theme.greys['mid-grey']};
            }
        }`}
`;

export function SearchButton({
    children, label, className, disabled, onClick,
}: ButtonProps): ReactElement {
    return (
        <StyledButton isMobile={false} className={className} disabled={disabled} onClick={onClick}>
            {children}
            {label}
        </StyledButton>
    );
}
