import styled from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';

interface InputContainerProps {
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: ResolvedTheme;
}

interface DescriptionProps {
    isMobile: boolean;
    theme: ResolvedTheme;
}

interface CardProps {
    isDisabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: ResolvedTheme;
}

function getContentColor({disabled, theme }: InputContainerProps): string {
    if (disabled) {
        return theme.component['radio-card-disabled-text-color'];
    }
    return theme.component['radio-card-text-color'];
}

function getLabelBackgroundColor({ isDisabled, isChecked, theme }: CardProps): string {
    if (isDisabled) {
        return theme.component['radio-card-disabled-background-color'];
    }
    if (isChecked) {
        return theme.component['radio-card-selected-background-color'];
    }
    return theme.component['radio-card-background-color'];
}

function getLabelBorderColor({ isDisabled, isChecked, theme }: CardProps): string {
    if (isDisabled) {
        return theme.component['radio-card-disabled-border-color'];
    }
    if (isChecked) {
        return theme.component['radio-card-selected-border-color'];
    }
    return theme.component['radio-card-border-color'];
}

export const Legend = styled.legend<{ isMobile: boolean }>`
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    margin-bottom: var(--spacing-1x);
`;

export const CardContent = styled.span`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.span<CardProps>`
    font-size: 1rem;
    font-weight: var(--font-semi-bold);
    line-height: 1.5rem;
    margin-bottom: var(--spacing-1x);
`;

export const Description = styled.span<DescriptionProps>`
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    line-height: 1.25rem;
`;

export const Label = styled.label<CardProps>`
    background-color: ${getLabelBackgroundColor};
    border: 1px solid ${getLabelBorderColor};
    border-radius: var(--border-radius-2x);
    color: ${getContentColor};
    display: flex;
    gap: var(--spacing-2x);
    padding: var(--spacing-2x) var(--spacing-3x);
    width: 100%;

    ${({ theme }) => focus({ theme }, { focusType: 'focus-within' })};

    &:hover {
        background-color: ${({ isDisabled, theme }) => (isDisabled ? theme.component['radio-card-disabled-background-color'] : theme.component['radio-card-hover-background-color'])};
        border-color: ${({ isDisabled, theme }) => (isDisabled ? theme.component['radio-card-disabled-border-color'] : theme.component['radio-card-hover-border-color'])};
        color: ${({ isDisabled, theme }) => (isDisabled ? theme.component['radio-card-disabled-text-color'] : theme.component['radio-card-hover-text-color'])};
    }
`;

export const Fieldset = styled.fieldset<{ horizontal?: boolean }>`
    border: none;
    display: flex;
    flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
    margin: 0;
    padding: 0;

    ${Label}:not(:last-child) {
        ${({ horizontal }) => (horizontal ? 'margin-right: var(--spacing-1x)' : 'margin-bottom: var(--spacing-1x)')};
    }
`;
