import { type FC, MouseEvent } from 'react';
import styled from 'styled-components';
import { Icon } from '../icon';
import { AbstractButton } from './abstract';

interface ButtonProps {
    className?: string;
    disabled?: boolean;

    onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

const StyledButton = styled(AbstractButton)`
    background: ${({ theme }) => theme.component['button-input-background-color']};
    border-color: ${({ theme }) => theme.component['button-input-border-color']};
    color: ${({ theme }) => theme.component['button-input-text-color']};
    height: 2rem;
    padding: 0 var(--spacing-1x);
    width: 2rem;

    &:hover {
        background-color: ${({ theme }) => theme.component['button-input-hover-background-color']};
        border-color: ${({ theme }) => theme.component['button-input-hover-border-color']};
        color: ${({ theme }) => theme.component['button-input-hover-text-color']};
    }

    &:disabled {
        &,
        &:focus,
        &:hover {
            background-color: ${({ theme }) => theme.component['button-input-disabled-background-color']};
            border-color: ${({ theme }) => theme.component['button-input-disabled-border-color']};
            color: ${({ theme }) => theme.component['button-input-disabled-text-color']};
        }
    }
`;

const SearchIcon = styled(Icon).attrs({ name: 'search' })`
    height: 16px;
    width: 16px;
`;

export const SearchButton: FC<ButtonProps> = ({
    className, disabled, onClick, ...rest
}) => (
    <StyledButton
        isMobile={false}
        className={className}
        disabled={disabled}
        onClick={onClick}
        {...rest /* eslint-disable-line react/jsx-props-no-spreading */}
    >
        <SearchIcon />
    </StyledButton>
);

SearchButton.displayName = 'SearchButton';
