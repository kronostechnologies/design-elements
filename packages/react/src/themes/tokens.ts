import { Theme } from '@design-elements/components/theme-wrapper/theme-wrapper';
import { main } from './main';

export const tokens: Theme['tokens'] = {
    'focus-box-shadow': `0 0 0 2px ${main['primary-1.1']}66`,
    'focus-border-box-shadow': `0 0 0 3px ${main['primary-1.1']}66, 0 0 0 1px ${main['primary-1.1']}`,
    'focus-border': `${main['primary-1.1']}`,
};
