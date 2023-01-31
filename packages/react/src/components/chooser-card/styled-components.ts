import styled from 'styled-components';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';

interface RadioInputProps {
    disabled?: boolean;
    isMobile: boolean;
}

export const RadioInput = styled.span<RadioInputProps>`
    background-color: ${({ disabled, theme }) => (disabled ? theme.greys['light-grey'] : theme.greys.white)};
    border: 1px solid ${({ disabled, theme }) => (disabled ? theme.greys.grey : theme.greys['dark-grey'])};
    border-radius: 50%;
    box-sizing: border-box;
    display: inline-block;
    height: ${({ isMobile }) => (isMobile ? 24 : 16)}px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: ${({ isMobile }) => (isMobile ? 24 : 16)}px;
`;

interface InputContainerProps {
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: Theme;
}

function getContentColor({ disabled, isChecked, theme }: InputContainerProps): string {
    if (disabled) {
        return theme.greys['mid-grey'];
    } if (isChecked) {
        return theme.main['primary-2'];
    }
    return theme.greys['dark-grey'];
}

export const InputContainer = styled.div<InputContainerProps>`
    color: ${getContentColor};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    font-size: ${({ isMobile }) => (isMobile ? 1.125 : 1)}rem;
    font-weight: var(--font-semi-bold);
    letter-spacing: initial;
    line-height: 1.5rem;
    margin-bottom: var(--spacing-2x);
    padding-left: ${({ isMobile }) => (isMobile ? 'var(--spacing-5x)' : 'var(--spacing-4x)')};
    position: relative;
    user-select: none;
`;

interface DescriptionProps {
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: Theme;
}

export const Description = styled.div<DescriptionProps>`
    color: ${getContentColor};
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    padding-left: ${({ isMobile }) => (isMobile ? 'var(--spacing-5x)' : 'var(--spacing-4x)')};
`;

interface LabelProps {
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: Theme;
}

function getLabelBorderColor({ disabled, isChecked, theme }: LabelProps): string {
    if (disabled) {
        return theme.greys.grey;
    } if (isChecked) {
        return theme.main['primary-2'];
    }
    return theme.greys['dark-grey'];
}

function getLabelBackgroundColor({ disabled, isChecked, theme }: LabelProps): string {
    if (disabled) {
        return theme.greys['light-grey'];
    } if (isChecked) {
        return theme.main['primary-1.4'];
    }
    return theme.greys.white;
}

export const Label = styled.label<LabelProps>`
    background-color: ${getLabelBackgroundColor};
    border: 1px solid ${getLabelBorderColor};
    border-radius: var(--border-radius-2x);
    box-sizing: border-box;
    display: block;
    padding: ${({ isMobile }) => (isMobile ? 'var(--spacing-3x) var(--spacing-2x)' : 'var(--spacing-2x)')};
    width: 100%;

    &:focus-within {
        ${({ theme }) => focus({ theme }, false, '&')}
    }

    &:hover:not([disabled]) {
        background-color: ${({ theme }) => theme.greys.grey};
        border-color: ${({ theme }) => theme.greys['dark-grey']};
        cursor: pointer;

        /* stylelint-disable-next-line declaration-block-semicolon-newline-after,rule-empty-line-before */
        ${Description},
        ${InputContainer} {
            color: ${({ theme }) => theme.greys.black};
        }
    }
`;

export const HiddenInput = styled.input<{ isMobile: boolean }>`
    height: ${({ isMobile }) => (isMobile ? 24 : 16)}px;
    left: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
    top: 2px;
    width: ${({ isMobile }) => (isMobile ? 24 : 16)}px;

    &:checked + ${RadioInput} {
        background-color: ${({ theme }) => theme.main['primary-1.1']};
        border: 1px solid ${({ theme }) => theme.main['primary-1.1']};

        &::after {
            background-color: ${({ theme }) => theme.greys.white};
            border-radius: 50%;
            content: "";
            height: 8px;
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 8px;
        }
    }
`;
