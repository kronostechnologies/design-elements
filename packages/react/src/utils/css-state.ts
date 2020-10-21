import { Theme } from '@design-elements/components/theme-wrapper/theme-wrapper';

export const focus = ({ theme }: { theme: Theme }, selector?: string) => `
    ${ !selector ? `&:focus { outline: none; }` : '' }

    ${ selector == null ? '&:focus' : `${selector}`} {
        outline: none;
        border-color: ${theme.tokens['focus-border']};
        box-shadow: ${theme.tokens['focus-box-shadow']};
    }

    &:not(input):not(textarea):not(button):focus {
        box-shadow: ${theme.tokens['focus-border-box-shadow']};
    }
`;
