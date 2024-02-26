import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../themes/theme';

type FocusType = 'focus' | 'focus-visible' | 'focus-within';

export const focus = (
    { theme }: { theme: ResolvedTheme },
    hasBorder = false,
    selector: string | undefined = undefined,
    inset = true,
    inverted = false,
    clickResetFocus = false,
    focusTypeSelector: FocusType = 'focus',
): string => {
    const inversionSuffix = inverted ? '-inverted' : '';
    const focusBorderColor = theme.component[`focus${inversionSuffix}-border-color`];
    const boxShadowColor = theme.component[`focus${inversionSuffix}-box-shadow-color`];
    const boxShadow = `${inset ? 'inset ' : ''}0 0 0 ${hasBorder ? '1px' : '2px'} ${focusBorderColor}, 0 0 0 2px ${boxShadowColor};`;
    const outerOnlyBoxShadow = `0 0 0 2px ${boxShadowColor};`;
    const outlineWeight = hasBorder ? '1px' : '2px';
    const outlineOffset = hasBorder ? '-1px' : '-2px';
    const transition = 'all .25s ease-in-out;';
    const baseSelector = selector === undefined ? '' : `${selector}`;
    const clickResetSelector = clickResetFocus ? ', &:active:hover' : '';

    const notFocusStyle = `
        &:not(:${focusTypeSelector}) ${baseSelector} ${clickResetSelector} {
            transition: ${transition};
            box-shadow: none;
            border-color: ${hasBorder ? 'transparent' : ''};
            outline: ${outlineWeight} solid transparent;
            outline-offset: ${outlineOffset};
        }`;

    const focusStyle = `
        &:${focusTypeSelector} ${baseSelector} {
            transition: ${transition};
            box-shadow: ${hasBorder ? `${boxShadow}` : `${outerOnlyBoxShadow}`};
            border-color: ${hasBorder ? `${focusBorderColor}` : ''};
            outline: ${outlineWeight} solid ${focusBorderColor};
            outline-offset: ${outlineOffset};
        }`;

    return notFocusStyle + focusStyle;
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
