import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../themes/tokens/theme';

export type FocusableComponent =
    | 'button';

export const focus = (
    { theme }: { theme: ResolvedTheme },
    hasBorder = false,
    selector: string | undefined = undefined,
    inset = false,
    component: FocusableComponent | undefined = undefined,
): string => {
    const focusBorder = component
        ? `${theme.component[`${component}-focus-border-color`]}`
        : `${theme.tokens['focus-border']}`;
    const focusBoxShadow = component
        ? `0 0 0 2px ${theme.component[`${component}-focus-box-shadow-color`]}`
        : `${theme.tokens['focus-box-shadow']}`;
    const focusBorderBoxShadow = component
        ? `0 0 0 1px ${theme.component[`${component}-focus-border-box-shadow-color-1`]}, 0 0 0 3px ${theme.component[`${component}-focus-border-box-shadow-color-2`]}`
        : `${theme.tokens['focus-border-box-shadow']}`;
    const focusBorderBoxShadowInset = component
        ? `inset 0 0 0 2px ${theme.component[`${component}-focus-border-box-shadow-inset-color-1`]}, inset 0 0 0 3px ${theme.component[`${component}-focus-border-box-shadow-inset-color-2`]}`
        : `${theme.tokens['focus-border-box-shadow-inset']}`;

    return `
        ${selector === undefined ? '&:focus { outline: none; }' : ''}
        ${selector === undefined ? '&:focus' : `${selector}`} {
            outline: none;
            ${hasBorder ? `border-color: ${focusBorder};` : ''}
            box-shadow: ${focusBoxShadow};
            ${!hasBorder ? `box-shadow: ${inset ? focusBorderBoxShadowInset : focusBorderBoxShadow};` : ''}
        }
    `;
};

export const focusVisibleReset = (
    _props: { theme: ResolvedTheme },
    hasBorder = false,
): FlattenInterpolation<ThemeProps<ResolvedTheme>> => css`
    &:focus:not(:focus-visible) {
        ${hasBorder && 'border-color: inherit;'}

        box-shadow: none;
    }
`;
