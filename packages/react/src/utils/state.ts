import { Theme } from '@design-elements/components/theme-wrapper/theme-wrapper';

const focus = ({ theme }: { theme: Theme }, selector?: string) => `
    ${ !selector ?
        `&:focus {
            outline: none;
        }` : ''
    }

    ${ selector == null ?
    '&:focus' : `${selector}`}
    {
        outline: none;
        box-shadow: ${theme.tokens['focus-box-shadow']};
    }
`;

export {
    focus,
};
