import { Theme } from '@design-elements/components/theme-wrapper/theme-wrapper';

export const focus = ({ theme }: { theme: Theme }, hasBorder: boolean = false, selector?: string) => `
    ${ selector === undefined ? '&:focus { outline: none; }' : '' }
    ${ selector === undefined ? '&:focus' : `${selector}`} {
        outline: none;
        ${ hasBorder ? `border-color: ${theme.tokens['focus-border']};` : '' }
        box-shadow: ${theme.tokens['focus-box-shadow']};
        ${ !hasBorder ? `box-shadow: ${theme.tokens['focus-border-box-shadow']};` : '' }
    }
`;
