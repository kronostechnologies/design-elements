import React from 'react';
import styled from 'styled-components';

import { AbstractButton, AbstractButtonProps } from './abstract-button';

interface SearchButtonProps extends AbstractButtonProps {
    className: string;
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

const SearchButton = ({ children, className, disabled, onClick }: SearchButtonProps) => {
    const handleClick = () => { onClick && onClick(); };

    return (
        <StyledButton className={className} disabled={disabled} onClick={handleClick}>
            {children}
        </StyledButton>
    );
};

export { SearchButton };
