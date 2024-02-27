import { css, FlattenSimpleInterpolation } from 'styled-components';
import { ResolvedTheme } from '../../../themes/theme';
import { focus } from '../../../utils/css-state';
import { DeviceContextProps } from '../../device-context-provider/device-context-provider';

export const inputsStyle: (
    theme: ResolvedTheme,
    isMobile?: boolean,
    isFocusable?: boolean
) => FlattenSimpleInterpolation = (
    theme: ResolvedTheme,
    isMobile = false,
    isFocusable = true,
) => css`
    background: ${theme.component['inputs-background-color']};
    border: 1px solid ${theme.component['inputs-border-color']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${theme.component['inputs-text-color']};
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
        color: ${theme.component['inputs-placeholder-text-color']};
    }

    &:disabled {
        background-color: ${theme.component['inputs-disabled-background-color']};
        border-color: ${theme.component['inputs-disabled-border-color']};
        color: ${theme.component['inputs-disabled-text-color']};

        &,
        &::placeholder {
            color: ${theme.component['inputs-disabled-placeholder-text-color']};
        }
    }

    ${isFocusable && focus({ theme })};
`;

interface ResponsiveInputsStyles {
    theme: ResolvedTheme;
    device: DeviceContextProps;
}

export const responsiveInputsStyle = ({ theme, device: { isMobile } }: ResponsiveInputsStyles): FlattenSimpleInterpolation => css`
    background: ${theme.component['inputs-background-color']};
    border: 1px solid ${theme.component['inputs-border-color']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${theme.component['inputs-text-color']};
    font-family: inherit;
    font-size: ${isMobile ? 1 : 0.875}rem;
    letter-spacing: ${isMobile ? 0.02875 : 0.015}rem;
    line-height: 1.5rem;
    margin: 0;
    outline: none;
    padding: ${isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half) var(--spacing-1x)'};
    width: 100%;

    &::placeholder {
        color: ${theme.component['inputs-placeholder-text-color']};
    }

    &:disabled {
        background-color: ${theme.component['inputs-disabled-background-color']};
        border-color: ${theme.component['inputs-disabled-border-color']};
        color: ${theme.component['inputs-disabled-text-color']};

        &,
        &::placeholder {
            color: ${theme.component['inputs-disabled-placeholder-text-color']};
        }
    }

    ${focus({ theme })};
`;
