import { MouseEvent, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { AbstractButton } from './abstract-button';

interface ButtonProps {
    className: string;
    disabled?: boolean;

    onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

const StyledButton = styled(AbstractButton)`
    background: ${({ theme }) => theme.tokens['bt-search'].bg};
    border-color: ${({ theme }) => theme.tokens['bt-search'].border};
    color: ${({ theme }) => theme.tokens['bt-search'].color};
    height: 2rem;
    padding: 0 var(--spacing-1x);
    width: 2rem;

    &:hover {
        background-color: ${({ theme }) => theme.tokens['bt-search']['hover-bg']};
        color: ${({ theme }) => theme.tokens['bt-search']['hover-color']};
    }

    &:disabled {
        &,
        &:focus,
        &:hover {
            background-color: ${({ theme }) => theme.tokens['bt-search']['disabled-bg']};
            border-color: ${({ theme }) => theme.tokens['bt-search']['disabled-border']};
            color: ${({ theme }) => theme.tokens['bt-search']['disabled-color']};
        }
    }
`;

const SearchIcon = styled(Icon).attrs({ name: 'search' })`
    height: 16px;
    width: 16px;
`;

export const SearchButton: VoidFunctionComponent<ButtonProps> = ({
    className, disabled, onClick,
}) => (
    <StyledButton isMobile={false} className={className} disabled={disabled} onClick={onClick}>
        <SearchIcon />
    </StyledButton>
);
