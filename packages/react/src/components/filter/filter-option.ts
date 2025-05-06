import styled, { css } from 'styled-components';
import { Button } from '../buttons/button';

interface OptionProps {
    focusable: boolean;
    disabled?: boolean;
    isMobile: boolean;
    $selected: boolean;
}

export const Option = styled(Button)<OptionProps>`
    border: 0;
    border-radius: 0;
    color: ${({ disabled, theme }) => (disabled ? theme.component['filter-option-disabled-text-color'] : theme.component['filter-option-text-color'])};
    display: block;
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
    font-weight: ${({ $selected }) => ($selected ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: var(--size-1halfx);
    min-height: var(--size-1halfx);
    padding: var(--spacing-half) var(--spacing-2x);
    position: relative;
    text-align: left;
    text-transform: none;
    width: 100%;

    &:hover {
        background-color: ${({ theme, disabled }) => (disabled ? theme.component['filter-option-disabled-background-color'] : theme.component['filter-option-hover-background-color'])};
    }

    ${({ $selected }) => $selected && css`
        &::before {
            background-color: ${({ theme }) => theme.component['filter-option-indicator-selected-background-color']};
            content: '';
            display: block;
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 4px;
        }
    `}
`;
