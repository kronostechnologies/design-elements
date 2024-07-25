import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { Icon } from '../icon/icon';
import { AbstractButton } from './abstract/abstract-button';
import { getBaseButtonStyles } from './abstract/styled';
import { ButtonProps, ButtonType } from './types';
import { focus } from '../../utils/css-state';

export interface ButtonTypeStyles {
    buttonType: ButtonType;
    focusable?: boolean;
    inverted?: boolean;
    theme: ResolvedTheme;
}

export const getButtonTypeStyles: (props: ButtonTypeStyles) => FlattenInterpolation<ThemeProps<ResolvedTheme>> = ({
    focusable,
    inverted,
    buttonType,
    theme,
}) => {
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
};

// export const getButtonStyles = ({
//     buttonType, inverted, focusable, size,
// }: ButtonProps, $isMobile: boolean, theme: ResolvedTheme): FlattenInterpolation<ThemeProps<ResolvedTheme>> => css`
//     align-items: center;
//     appearance: none;
//     border: 1px solid;
//     border-radius: 1.5rem;
//     box-sizing: border-box;
//     display: inline-flex;
//     flex-direction: row;
//     gap: var(--spacing-1x);
//     font-family: inherit;
//     font-size: ${$isMobile ? 0.875 : 0.75}rem;
//     font-weight: var(--font-bold);
//     justify-content: center;
//     letter-spacing: ${$isMobile ? 0.033125 : 0.025}rem;
//     line-height: ${$isMobile ? 1.5 : 1}rem;
//     min-height: ${getButtonMinHeight({ $isMobile, size })};
//     min-width: 2rem;
//     outline: none;
//     padding: ${getButtonPadding({ $isMobile, size })};
//     text-transform: uppercase;
//     user-select: none;
//
//     > svg {
//         color: inherit;
//         height: ${$isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)'};
//         width: ${$isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)'};
//     }
//
//     ${focusable !== false && focus({ theme }, { inverted })};
//
//     background-color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-background-color`]};
//     border-color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-border-color`]};
//     color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-text-color`]};
//
//     &:hover,
//     &[aria-expanded='true'] {
//         background-color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-hover-background-color`]};
//         border-color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-hover-border-color`]};
//         color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-hover-text-color`]};
//     }
//
//     &[aria-disabled='true'] {
//         background-color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-disabled-background-color`]};
//         border-color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-disabled-border-color`]};
//         color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-disabled-text-color`]};
//         cursor: not-allowed;
//         ${buttonType === 'destructive-primary' && css`
//             &,
//             ${focusable !== false && '&:focus,'}
//             &:hover {
//                 background-color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-disabled-background-color`]};
//                 border-color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-disabled-border-color`]};
//                 color: ${theme.component[`button-${buttonType}${inverted ? '-inverted' : ''}-disabled-text-color`]};
//             }
//         `}
//     }
// `;

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

export const StyledButton = styled(AbstractButton)<{ theme: ResolvedTheme } & ButtonProps>`
    ${getButtonTypeStyles}
`;
