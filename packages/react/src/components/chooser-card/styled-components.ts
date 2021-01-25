import styled from 'styled-components';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';

interface RadioInputProps {
    disabled?: boolean;
    isMobile: boolean;
}

export const RadioInput = styled.span<RadioInputProps>`
    background-color: ${({ disabled, theme }) => (disabled ? theme.greys['light-grey'] : theme.greys.white)};

    /* TODO fix with next thematization */
    border: 1px solid ${({ disabled }) => (disabled ? '#dbdee1' : '#60666e')};
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

interface LabelProps {
    disabled?: boolean;
    isMobile: boolean;
    isSelected?: boolean;
    theme: Theme;
}

function getContentColor({ disabled, isSelected, theme }: LabelProps): string {
    if (disabled) {
        // TODO fix with next thematization
        return '#b7bbc2';
    } if (isSelected) {
        return theme.main['primary-2'];
    }
    // TODO fix with next thematization
    return '#60666e';
}

export const Label = styled.label<LabelProps>`
    color: ${getContentColor};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    display: block;
    font-size: ${({ isMobile }) => (isMobile ? 1.125 : 1)}rem;
    font-weight: var(--font-semi-bold);
    letter-spacing: initial;
    line-height: 1.5rem;
    margin-bottom: var(--spacing-2x);
    padding-left: ${({ isMobile }) => (isMobile ? 'var(--spacing-5x)' : 'var(--spacing-4x)')};
    position: relative;
    user-select: none;

    &:not(:first-of-type) {
        margin-top: var(--spacing-1x);
    }
`;

interface DescriptionProps {
    disabled?: boolean;
    isMobile: boolean;
    isSelected?: boolean;
    theme: Theme;
}

export const Description = styled.div<DescriptionProps>`
    color: ${getContentColor};
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    padding-left: ${({ isMobile }) => (isMobile ? 'var(--spacing-5x)' : 'var(--spacing-4x)')};
`;

interface ContainerProps {
    disabled?: boolean;
    isFocused: boolean;
    isMobile: boolean;
    isSelected?: boolean;
    theme: Theme;
}

function getContainerBorderColor({ disabled, isSelected, theme }: ContainerProps): string {
    if (disabled) {
        /* TODO fix with next thematization */
        return '#dbdee1';
    } if (isSelected) {
        return theme.main['primary-2'];
    }
    /* TODO fix with next thematization */
    return '#60666e';
}

function getContainerBackgroundColor({ disabled, isSelected, theme }: ContainerProps): string {
    if (disabled) {
        return theme.greys['light-grey'];
    } if (isSelected) {
        /* TODO fix with next thematization */
        return '#e0f0f9';
    }
    return theme.greys.white;
}

export const Container = styled.div<ContainerProps>`
    background-color: ${getContainerBackgroundColor};
    border: 1px solid ${getContainerBorderColor};
    border-radius: var(--border-radius-2x);
    box-sizing: border-box;
    padding: ${({ isMobile }) => (isMobile ? 'var(--spacing-3x) var(--spacing-2x)' : 'var(--spacing-2x)')};
    width: ${({ isMobile }) => (isMobile ? 328 : 352)}px;

    &:hover:not([disabled]) {
        /* TODO fix with next thematization */
        background-color: #dbdee1;

        /* TODO fix with next thematization */
        border-color: '#60666e';
        cursor: pointer;

        ${Description},
        ${Label} {
            color: ${({ theme }) => theme.greys.black};
        }
    }

    ${({ theme, isFocused }) => isFocused && focus({ theme }, false, '&')}
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
        /* TODO fix with next thematization */
        background-color: #006296;

        /* TODO fix with next thematization */
        border: 1px solid #006296;

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
