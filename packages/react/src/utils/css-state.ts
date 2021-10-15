import { Theme } from '../themes';

export const focus = ({ theme }: { theme: Theme }, hasBorder = false, selector?: string, inset = false): string => `
    ${selector === undefined ? '&:focus { outline: none; }' : ''}
    ${selector === undefined ? '&:focus' : `${selector}`} {
        outline: none;
        ${hasBorder ? `border-color: ${theme.tokens['focus-border']};` : ''}
        box-shadow: ${theme.tokens['focus-box-shadow']};
        ${!hasBorder ? `box-shadow: ${inset ? theme.tokens['focus-border-box-shadow-inset'] : theme.tokens['focus-border-box-shadow']};` : ''}
    }
`;
