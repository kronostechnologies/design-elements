import { css, FlattenSimpleInterpolation } from 'styled-components';
import { ResolvedTheme } from '../../../themes/theme';
import { focus } from '../../../utils/css-state';
import { DeviceContextProps } from '../../device-context-provider/device-context-provider';

export interface InputStyleOptions {
    theme: ResolvedTheme,
    isMobile?: boolean;
    isFocusable?: boolean;
    isValid?: boolean;
}

export const inputsStyle = ({
    theme,
    isMobile = false,
    isFocusable = true,
    isValid = true,
}: InputStyleOptions): FlattenSimpleInterpolation => css`
    background: ${theme.component['text-input-background-color']};
    border: 1px solid ${isValid ? theme.component['text-input-border-color'] : theme.component['text-input-error-border-color']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${theme.component['text-input-text-color']};
    font-family: inherit;
    font-size: ${isMobile ? '1rem' : '0.875rem'};
    letter-spacing: ${isMobile ? '0.02875rem' : '0.015rem'};
    line-height: 1.5rem;
    margin: 0;
    min-height: var(--size-2x);
    outline: none;
    padding: 0 var(--spacing-1x);
    width: 100%;

    &::placeholder {
        color: ${theme.component['text-input-placeholder-text-color']};
    }

    &:disabled {
        background-color: ${theme.component['text-input-disabled-background-color']};
        border-color: ${theme.component['text-input-disabled-border-color']};
        color: ${theme.component['text-input-disabled-text-color']};

        &,
        &::placeholder {
            color: ${theme.component['text-input-placeholder-disabled-text-color']};
        }
    }

    ${isFocusable && focus({ theme })};
`;

interface ResponsiveInputsStyles {
    theme: ResolvedTheme;
    device: DeviceContextProps;
}

export const responsiveInputsStyle = ({ theme, device: { isMobile } }: ResponsiveInputsStyles): FlattenSimpleInterpolation => css`
    background: ${theme.component['text-input-background-color']};
    border: 1px solid ${theme.component['text-input-border-color']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${theme.component['text-input-text-color']};
    font-family: inherit;
    font-size: ${isMobile ? 1 : 0.875}rem;
    letter-spacing: ${isMobile ? 0.02875 : 0.015}rem;
    line-height: 1.5rem;
    margin: 0;
    outline: none;
    padding: ${isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half) var(--spacing-1x)'};
    width: 100%;

    &::placeholder {
        color: ${theme.component['text-input-placeholder-text-color']};
    }

    &:disabled {
        background-color: ${theme.component['text-input-disabled-background-color']};
        border-color: ${theme.component['text-input-disabled-border-color']};
        color: ${theme.component['text-input-disabled-text-color']};

        &,
        &::placeholder {
            color: ${theme.component['text-input-placeholder-disabled-text-color']};
        }
    }

    ${focus({ theme })};
`;
