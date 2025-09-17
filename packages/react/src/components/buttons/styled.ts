import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../themes';
import { focus } from '../../utils/css-state';
import { Icon } from '../icon';
import { Spinner } from '../spinner';
import { AbstractButton } from './abstract';
import { type BaseButtonStyles, getBaseButtonStyles } from './abstract/styles';
import type { ButtonProps, ButtonType } from './button';

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
            pointer-events: none;
        }
    `;
}

interface ButtonStylesProps extends ButtonTypeStyles, BaseButtonStyles {}

export const getButtonStyles = ({
    buttonType, inverted, focusable, $size, $isMobile, theme,
}: ButtonStylesProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> => css`
    ${getBaseButtonStyles({
        $size,
        $isMobile,
        $focusable: focusable,
        $inverted: inverted,
    })};

    ${getButtonTypeStyles({
        buttonType, inverted, focusable, theme,
    })};
`;

export const StyledButton = styled(AbstractButton)<{ theme: ResolvedTheme } & ButtonProps>`
    ${getButtonTypeStyles}
`;

export const StyledSpinner = styled(Spinner)`
    margin-right: var(--spacing-1x);
`;

export const LeftIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

export const RightIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;
