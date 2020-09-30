import { Theme } from '@design-elements/components/theme-wrapper/theme-wrapper';

const focus = ({ theme }: { theme: Theme }, selector?: string) => `
    ${ selector == null ?
        'border: 1px transparent solid;' :
        `&:focus {
            outline: none;
            border: none;
        }`
    }
    ${ selector == null ? '&:focus' : `${selector}`} {
        outline: none;
        box-shadow: ${theme.tokens['focus-box-shadow']};
        border: 1px solid ${theme.main['primary-1.1']};
    }
`;

export {
    focus,
};
