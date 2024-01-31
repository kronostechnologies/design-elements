import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../themes/theme';

export const focus = (
    { theme }: { theme: ResolvedTheme },
    hasBorder = false,
    selector: string | undefined = undefined,
    inset = false,
): string => {
    const focusBorder = `${theme.component['focus-border-color']}`;
    const focusBoxShadow = `0 0 0 2px ${theme.component['focus-box-shadow-color']}`;
    const focusBorderBoxShadow = `0 0 0 1px ${theme.component['focus-border-box-shadow-color-1']}, 0 0 0 3px ${theme.component['focus-border-box-shadow-color-2']}`;
    const focusBorderBoxShadowInset = `inset 0 0 0 2px ${theme.component['focus-border-box-shadow-inset-color-1']}, inset 0 0 0 3px ${theme.component['focus-border-box-shadow-inset-color-2']}`;

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
