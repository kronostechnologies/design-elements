import { Theme } from '@design-elements/themes/theme';

export const focus = ({ theme }: { theme: Theme }, hasBorder = false, selector?: string): string => `
    ${selector === undefined ? '&:focus { outline: none; }' : ''}
    ${selector === undefined ? '&:focus' : `${selector}`} {
        outline: none;
        ${hasBorder ? `border-color: ${theme.tokens['focus-border']};` : ''}
        box-shadow: ${theme.tokens['focus-box-shadow']};
        ${!hasBorder ? `box-shadow: ${theme.tokens['focus-border-box-shadow']};` : ''}
    }
`;
