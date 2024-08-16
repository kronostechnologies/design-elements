import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { Icon } from '../icon/icon';
import { getBaseButtonStyles } from './abstract/styled';
import { ButtonProps, ButtonType } from './types';
import { focus } from '../../utils/css-state';

interface ButtonTypeStyles {
    buttonType: ButtonType;
    focusable?: boolean;
    inverted?: boolean;
    theme: ResolvedTheme;
}

export function getButtonTypeStyles({
    focusable,
    inverted,
    buttonType,
    theme,
}: ButtonTypeStyles): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    const inversionSuffix = inverted ? '-inverted' : '';

    return css`
        ${focusable !== false && focus({ theme }, { inverted })};

        background-color: ${theme.component[`button-${buttonType}${inversionSuffix}-background-color`]};
        border-color: ${theme.component[`button-${buttonType}${inversionSuffix}-border-color`]};
        color: ${theme.component[`button-${buttonType}${inversionSuffix}-text-color`]};

        &:hover,
        &[aria-expanded='true'] {
            background-color: ${theme.component[`button-${buttonType}${inversionSuffix}-hover-background-color`]};
            border-color: ${theme.component[`button-${buttonType}${inversionSuffix}-hover-border-color`]};
            color: ${theme.component[`button-${buttonType}${inversionSuffix}-hover-text-color`]};
        }

        &[aria-disabled='true'] {
            background-color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-background-color`]};
            border-color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-border-color`]};
            color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-text-color`]};
            cursor: not-allowed;
            ${buttonType === 'destructive-primary' && css`
                &,
                ${focusable !== false && '&:focus,'}
                &:hover {
                    background-color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-background-color`]};
                    border-color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-border-color`]};
                    color: ${theme.component[`button-${buttonType}${inversionSuffix}-disabled-text-color`]};
                }
            `}
        }
    `;
}

export const getButtonStyles = ({
    buttonType, inverted, focusable, size,
}: ButtonProps, $isMobile: boolean, theme: ResolvedTheme): FlattenInterpolation<ThemeProps<ResolvedTheme>> => css`
    ${getBaseButtonStyles({
        $size: size,
        $isMobile,
        $focusable: focusable,
        $inverted: inverted,
    })};

    ${getButtonTypeStyles({
        buttonType, inverted, focusable, theme,
    })};
`;

export const LeftIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

export const RightIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;
