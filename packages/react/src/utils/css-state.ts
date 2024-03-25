import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../themes/theme';

type FocusType = 'focus' | 'focus-visible' | 'focus-within';

export interface FocusOptions {
    selector?: string;
    focusTypeSelector?: FocusType;
    inverted?: boolean;
    insideOnly?: boolean;
}

export const focus = (
    { theme }: { theme: ResolvedTheme },
    options: FocusOptions = {},
): string => {
    const {
        selector,
        focusTypeSelector = 'focus',
        inverted = false,
        insideOnly = false,
    } = options;

    const inversionSuffix = inverted ? '-inverted' : '';
    const insideFocusBorderColor = insideOnly ? theme.component[`focus${inversionSuffix}-outside-border-color`] : theme.component[`focus${inversionSuffix}-inside-border-color`];
    const outsideFocusBorderColor = insideOnly ? 'transparent' : theme.component[`focus${inversionSuffix}-outside-border-color`];
    const insideFocusBorderWeight = '2px';
    const insideFocusBorderOffset = '-2px';
    const outsideFocusBorderWeight = insideOnly ? '0' : '2px';
    const transition = 'all .25s ease-in-out;';
    const baseSelector = selector === undefined ? '' : `${selector}`;

    const notFocusStyle = `
        &:not(:${focusTypeSelector}) ${baseSelector} {
            transition: ${transition};
            outline: ${insideFocusBorderWeight} solid transparent;
            outline-offset: ${insideFocusBorderOffset};
        }`;

    const focusStyle = `
        &:${focusTypeSelector} ${baseSelector} {
            transition: ${transition};
            box-shadow: 0 0 0 ${outsideFocusBorderWeight} ${outsideFocusBorderColor};
            outline: ${insideFocusBorderWeight} solid ${insideFocusBorderColor};
            outline-offset: ${insideFocusBorderOffset};
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
