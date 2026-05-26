import styled, { css, FlattenInterpolation, type SimpleInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../themes';
import { focus } from '../../utils/css-state';
import { Icon, type IconProps } from '../icon';
import { buttonTypesToDarkenEquisoftLogo, darkenOnComponentHover } from '../icon/equisoft-logo';
import { ProgressIndicator } from '../progress-indicator';
import { AbstractButton } from './abstract';
import { type BaseButtonStyles, getBaseButtonStyles } from './abstract/styles';
import type { ButtonProps, ButtonType } from './button';

interface ButtonTypeStyles {
    buttonType: ButtonType;
    inverted?: boolean;
    theme: ResolvedTheme;
}

export function getButtonTypeStyles({
    inverted,
    buttonType,
    theme,
}: ButtonTypeStyles): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    const inversionSuffix = inverted ? '-inverted' : '';

    return css`
        ${focus({ theme }, { inverted })};

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
                &:focus,
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

interface ButtonStylesProps extends ButtonTypeStyles, BaseButtonStyles {
}

export const getButtonStyles = ({
    buttonType, inverted, $size, $isMobile, theme,
}: ButtonStylesProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> => css`
    ${getBaseButtonStyles({
        $size,
        $isMobile,
        $inverted: inverted,
    })};

    ${getButtonTypeStyles({
        buttonType, inverted, theme,
    })};
`;

export const StyledButton = styled(AbstractButton)<{ theme: ResolvedTheme } & ButtonProps>`
    ${getButtonTypeStyles}
`;

export const StyledSpinner = styled(ProgressIndicator)`
    margin-right: var(--spacing-1x);
`;

interface SideIconProps extends IconProps {
    $buttonType: ButtonProps['buttonType'];
}

function getSideIconStyle({ $buttonType, name }: SideIconProps): readonly SimpleInterpolation[] | null {
    if (buttonTypesToDarkenEquisoftLogo.includes($buttonType) && name === 'equisoft') {
        return darkenOnComponentHover(StyledButton);
    }
    return null;
}

export const LeftIcon = styled(Icon)<SideIconProps>`
    margin-right: var(--spacing-1x);

    ${getSideIconStyle};
`;

export const RightIcon = styled(Icon)<SideIconProps>`
    margin-left: var(--spacing-1x);

    ${getSideIconStyle};
`;
