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
    background: ${({ theme }) => theme.greys.white};
    border-color: ${({ theme }) => theme.greys['neutral-65']};
    color: ${({ theme }) => theme.greys['neutral-65']};
    height: 2rem;
    padding: 0 var(--spacing-1x);
    width: 2rem;

    &:hover {
        background-color: ${({ theme }) => theme.greys['neutral-15']};
        color: ${({ theme }) => theme.greys.black};
    }

    &:disabled {
        &,
        &:focus,
        &:hover {
            background-color: ${({ theme }) => theme.greys['neutral-05']};
            border-color: ${({ theme }) => theme.greys['neutral-15']};
            color: ${({ theme }) => theme.greys['neutral-30']};
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
