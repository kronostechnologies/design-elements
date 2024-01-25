import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Theme } from '../themes/tokens/theme';

export const focus = (
    { theme }: { theme: Theme },
    hasBorder = false,
    selector: string | undefined = undefined,
    inset = false,
): string => {
    const focusBorder = `${theme.component['focus-border']}`;
    const focusBoxShadow = `0 0 0 2px ${theme.component['focus-box-shadow']}`;
    const focusBorderBoxShadow = `0 0 0 1px ${theme.component['focus-border-box-shadow-1']}, 0 0 0 3px ${theme.component['focus-border-box-shadow-2']}`;
    const focusBorderBoxShadowInset = `inset 0 0 0 2px ${theme.component['focus-border-box-shadow-inset-1']}, inset 0 0 0 3px ${theme.component['focus-border-box-shadow-inset-2']}`;

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
    _props: { theme: Theme },
    hasBorder = false,
): FlattenInterpolation<ThemeProps<Theme>> => css`
    &:focus:not(:focus-visible) {
        ${hasBorder && 'border-color: inherit;'}

        box-shadow: none;
    }
`;
