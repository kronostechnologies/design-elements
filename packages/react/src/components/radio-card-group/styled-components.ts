import styled from 'styled-components';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';

interface InputContainerProps {
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: Theme;
}

interface DescriptionProps {
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: Theme;
}

interface CardProps {
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: Theme;
}

export const RadioInput = styled.span<CardProps>`
    background-color: ${({ disabled, theme }) => (disabled ? theme.ref['color-neutral-05'] : theme.ref['color-white'])};
    border: 1px solid ${({ disabled, theme }) => (disabled ? theme.ref['color-neutral-15'] : theme.ref['color-neutral-65'])};
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
        return theme.ref['color-neutral-30'];
    }
    // TODO: This should be changed to whatever #1B1C1E is with new colors
    return theme.ref['color-black'];
}

function getLabelBackgroundColor({ disabled, isChecked, theme }: CardProps): string {
    if (disabled) {
        return theme.ref['color-neutral-05'];
    }
    if (isChecked) {
        return theme.ref['color-brand-05'];
    }
    return theme.ref['color-white'];
}

function getLabelBorderColor({ disabled, isChecked, theme }: CardProps): string {
    if (disabled) {
        return theme.ref['color-neutral-15'];
    }
    if (isChecked) {
        return theme.ref['color-brand-50'];
    }
    // TODO: This should be changed to whatever #1B1C1E is with new colors
    return theme.ref['color-black'];
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

    &:focus-within {
        ${({ theme }) => focus({ theme }, false, '&')}
    }

    &:hover:not([disabled]) {
        background-color: ${({ theme }) => theme.ref['color-neutral-15']};
        border-color: ${({ theme }) => theme.ref['color-black']};
        cursor: pointer;

        /* stylelint-disable-next-line declaration-block-semicolon-newline-after,rule-empty-line-before */

        ${Description},
        ${Title} {
            color: ${({ theme }) => theme.ref['color-black']};
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
        border: 2px solid ${({ theme }) => theme.ref['color-brand-50']};

        &::after {
            background-color: ${({ theme }) => theme.ref['color-brand-50']};
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
