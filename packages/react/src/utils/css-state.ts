import { css, FlattenSimpleInterpolation } from 'styled-components';
import { ResolvedTheme } from '../themes';

type FocusType = 'focus' | 'focus-visible' | 'focus-within';

export interface FocusOptions {
    selector?: string;
    focusType?: FocusType;
    inverted?: boolean;
    insideOnly?: boolean;
}

export const focus = (
    { theme }: { theme: ResolvedTheme },
    options: FocusOptions = {},
): FlattenSimpleInterpolation => {
    const {
        selector,
        focusType = 'focus',
        inverted = false,
        insideOnly = false,
    } = options;

    const inversionSuffix = inverted ? '-inverted' : '';
    const insideFocusBorderColor = insideOnly ? theme.component[`focus${inversionSuffix}-outside-border-color`] : theme.component[`focus${inversionSuffix}-inside-border-color`];
    const outsideFocusBorderColor = insideOnly ? 'transparent' : theme.component[`focus${inversionSuffix}-outside-border-color`];
    const insideFocusBorderWeight = '2px';
    const insideFocusBorderOffset = '-2px';
    const outsideFocusBorderWeight = insideOnly ? '0' : '2px';
    const baseSelector = selector ?? '';

    return css`
        ${baseSelector} {
            outline: ${insideFocusBorderWeight} solid transparent;
            outline-offset: ${insideFocusBorderOffset};
        };

        &:${focusType} ${baseSelector} {
            box-shadow: 0 0 0 ${outsideFocusBorderWeight} ${outsideFocusBorderColor};
            outline: ${insideFocusBorderWeight} solid ${insideFocusBorderColor};
            outline-offset: ${insideFocusBorderOffset};
        }`;
};
