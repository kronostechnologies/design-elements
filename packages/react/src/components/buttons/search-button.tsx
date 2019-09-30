import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { AbstractButton } from './abstract-button';

interface ButtonProps {
    label?: string;
    children?: ReactNode;
    className: string;
    disabled?: boolean;

    onClick?(): void;
}

const StyledButton = styled(AbstractButton)`
    background: rgb(255, 255, 255);
    border-color: rgb(217, 221, 226);
    color: rgb(99, 114, 130);

    &:hover {
        background-color: rgb(217, 221, 226);
        border-color: rgb(217, 221, 226);
        color: rgb(99, 114, 130);
    }

    &:disabled {
        &,
        &:focus,
        &:hover {
            background-color: rgb(242, 243, 249);
            border-color: rgb(217, 221, 226);
            color: rgb(156, 167, 180);
        }
    }
`;

const SearchButton = ({ children, className, disabled, label, onClick }: ButtonProps) => {
    const handleClick = () => { onClick && onClick(); };

    return (
        <StyledButton className={className} disabled={disabled} onClick={handleClick}>
            {children}{label}
        </StyledButton>
    );
};

export { SearchButton };
