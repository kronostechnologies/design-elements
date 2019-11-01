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

const SearchButton = ({ children, className, disabled, label, onClick }: ButtonProps) => {
    const handleClick = () => { onClick && onClick(); };

    return (
        <StyledButton className={className} disabled={disabled} onClick={handleClick}>
            {children}{label}
        </StyledButton>
    );
};

export { SearchButton };
