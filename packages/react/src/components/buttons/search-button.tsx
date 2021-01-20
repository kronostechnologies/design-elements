import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { AbstractButton } from './abstract-button';

interface ButtonProps {
    className: string;
    disabled?: boolean;

    onClick?(): void;
}

const StyledButton = styled(AbstractButton)`
    background: ${({ theme }) => theme.greys.white};
    border-color: ${({ theme }) => theme.greys['dark-grey']};
    color: ${({ theme }) => theme.greys['dark-grey']};
    height: 2rem;
    padding: 0 var(--spacing-1x);
    width: 2rem;

    &:hover {
        background-color: ${({ theme }) => theme.greys.grey};
        color: ${({ theme }) => theme.greys.black};
    }

    &:disabled {
        &,
        &:focus,
        &:hover {
            background-color: ${({ theme }) => theme.greys['light-grey']};
            border-color: ${({ theme }) => theme.greys.grey};
            color: ${({ theme }) => theme.greys['mid-grey']};
        }
    }
`;

const SearchIcon = styled(Icon).attrs({ name: 'search' })`
    height: 16px;
    width: 16px;
`;

export function SearchButton({
    className, disabled, onClick,
}: ButtonProps): ReactElement {
    return (
        <StyledButton isMobile={false} className={className} disabled={disabled} onClick={onClick}>
            <SearchIcon />
        </StyledButton>
    );
}
