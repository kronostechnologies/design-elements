import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Theme } from '../themes';

export const focus = ({ theme }: { theme: Theme }, hasBorder = false, selector: string | undefined = undefined, inset = false): string => `
    ${selector === undefined ? '&:focus { outline: none; }' : ''}
    ${selector === undefined ? '&:focus' : `${selector}`} {
        outline: none;
        ${hasBorder ? `border-color: ${theme.component['focus-border']};` : ''}
        box-shadow: ${theme.component['focus-box-shadow']};
        ${!hasBorder ? `box-shadow: ${inset ? theme.component['focus-border-box-shadow-inset'] : theme.component['focus-border-box-shadow']};` : ''}
    }
`;

export const focusVisibleReset = (
    _props: { theme: Theme },
    hasBorder = false,
): FlattenInterpolation<ThemeProps<Theme>> => css`
    &:focus:not(:focus-visible) {
        ${hasBorder && 'border-color: inherit;'}

        box-shadow: none;
    }
`;
