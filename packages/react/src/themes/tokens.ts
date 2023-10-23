import { main } from './main';
import { Theme } from './theme';

export const tokens: Theme['tokens'] = {
    'focus-box-shadow': `0 0 0 2px ${main['primary-1.2']}`,
    'focus-box-shadow-inset': `inset 0 0 0 2px ${main['primary-1.2']}`,
    'focus-border-box-shadow': ` 0 0 0 1px ${main['primary-1.1']}, 0 0 0 3px ${main['primary-1.2']}`,
    'focus-border-box-shadow-inset': `inset 0 0 0 2px ${main['primary-1.2']}, inset 0 0 0 3px ${main['primary-1.1']}`,
    'focus-border': `${main['primary-1.1']}`,
    'modal-overlay-background-color': 'rgba(0, 0, 0, 0.75)',
    'overlay-box-shadow': '0 10px 20px 0 rgba(0, 0, 0, 0.19)',
};
