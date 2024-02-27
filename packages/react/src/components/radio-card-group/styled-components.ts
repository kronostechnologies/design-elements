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
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: ResolvedTheme;
}

interface CardProps {
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: ResolvedTheme;
}

export const RadioInput = styled.span<CardProps>`
    background-color: ${({ disabled, theme }) => (disabled ? theme.component['radio-button-disabled-background-color'] : theme.component['radio-button-background-color'])};
    border: 1px solid ${({ disabled, theme }) => (disabled ? theme.component['radio-button-disabled-border-color'] : theme.component['radio-button-border-color'])};
    border-radius: 50%;
    box-sizing: border-box;
    display: inline-block;
    height: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
    margin-right: var(--spacing-2x);
    vertical-align: middle;
    width: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
`;

function getContentColor({ disabled, theme }: InputContainerProps): string {
    if (disabled) {
        return theme.component['radio-card-disabled-text-color'];
    }
    return theme.component['radio-card-text-color'];
}

function getLabelBackgroundColor({ disabled, isChecked, theme }: CardProps): string {
    if (disabled) {
        return theme.component['radio-card-disabled-background-color'];
    }
    if (isChecked) {
        return theme.component['radio-card-checked-background-color'];
    }
    return theme.component['radio-card-background-color'];
}

function getLabelBorderColor({ disabled, isChecked, theme }: CardProps): string {
    if (disabled) {
        return theme.component['radio-card-disabled-border-color'];
    }
    if (isChecked) {
        return theme.component['radio-card-checked-border-color'];
    }
    return theme.component['radio-card-border-color'];
}

export const Legend = styled.legend<{ isMobile: boolean }>`
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    margin-bottom: var(--spacing-1x);
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.span<CardProps>`
    align-items: center;
    display: flex;
    flex-direction: row;
    font-weight: var(--font-semi-bold);
    letter-spacing: 0.24px;
    line-height: 1.5rem;
    margin-bottom: var(--spacing-half);
`;

export const Description = styled.span<DescriptionProps>`
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    line-height: 1.5rem;
    padding-left: var(--spacing-4x);
`;

export const Card = styled.div<CardProps>`
    background-color: ${getLabelBackgroundColor};
    border: 1px solid ${getLabelBorderColor};
    border-radius: var(--border-radius-2x);
    box-sizing: border-box;
    color: ${getContentColor};
    padding: var(--spacing-2x) var(--spacing-3x);
    width: 100%;

    ${({ theme }) => focus({ theme }, { focusTypeSelector: 'focus-within' })};

    &:hover:not([disabled]) {
        background-color: ${({ theme }) => theme.component['radio-card-hover-background-color']};
        border-color: ${({ theme }) => theme.component['radio-card-hover-border-color']};

        ${Description},
        ${Title} {
            color: ${({ theme }) => theme.component['radio-card-hover-text-color']};
        }
    }
`;

export const Fieldset = styled.fieldset<{ horizontal?: boolean }>`
    border: none;
    display: flex;
    flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
    margin: 0;
    padding: 0;

    ${Card}:not(:last-child) {
        ${({ horizontal }) => (horizontal ? 'margin-right: var(--spacing-1x)' : 'margin-bottom: var(--spacing-1x)')};
    }
`;

export const HiddenInput = styled.input<{ isMobile: boolean }>`
    height: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
    left: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
    top: 0.125rem;
    width: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};

    &:checked + ${Label} > ${Title} > ${RadioInput} {
        border: 2px solid ${({ theme }) => theme.component['radio-card-hidden-input-checked-border-color']};

        &::after {
            background-color: ${({ theme }) => theme.component['radio-card-hidden-input-checked-background-color']};
            border-radius: 50%;
            content: '';
            height: var(--size-half);
            margin: 6px;
            position: absolute;
            transform: translate(-50%, -50%);
            width: var(--size-half);
        }
    }
`;
