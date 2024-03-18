import { ResolvedTheme } from '../theme';

export const defaultMain: ResolvedTheme['main'] = {
    'primary-1.1': '#006296',
    'primary-1.2': '#84C6EA',
    'primary-1.3': '#003A5A',
    'primary-1.4': '#E0F0F9',
    'primary-2': '#012639',
    'primary-3': '#004E78',
    'secondary-4.1': '#EF483E',
    'secondary-4.2': '#F9B6B2',
    'secondary-4.3': '#D41F14',
};

export const defaultGreys: ResolvedTheme['greys'] = {
    white: '#FFFFFF',
    'neutral-90': '#1B1C1E',
    'colored-white': '#FAFAFA',
    'light-grey': '#F1F2F2',
    grey: '#DBDEE1',
    'mid-grey': '#B7BBC2',
    'dark-grey': '#60666E',
    black: '#000000',
};

export const defaultNotifications: ResolvedTheme['notifications'] = {
    'info-1.1': '#006296',
    'discovery-1.1': '#602FA0',
    'neutral-1.1': '#878F9A',
    'success-1.1': '#008533',
    'success-1.2': '#F6FCF8',
    'success-1.3': '#8ADDA9',
    'alert-2.1': '#CD2C23',
    'alert-2.2': '#FFFAFB',
    'warning-3.1': '#F5A200',
    'warning-3.2': '#FFF9F5',
    'warning-3.3': '#FFB302',
    'warning-3.4': '#A36D00',
};

export const defaultTokens: ResolvedTheme['tokens'] = {
    'focus-box-shadow': `0 0 0 2px ${defaultMain['primary-1.2']}`,
    'focus-box-shadow-inset': `inset 0 0 0 2px ${defaultMain['primary-1.2']}`,
    'focus-border-box-shadow': ` 0 0 0 1px ${defaultMain['primary-1.1']}, 0 0 0 3px ${defaultMain['primary-1.2']}`,
    'focus-border-box-shadow-inset': `inset 0 0 0 2px ${defaultMain['primary-1.2']}, inset 0 0 0 3px ${defaultMain['primary-1.1']}`,
    'focus-border': `${defaultMain['primary-1.1']}`,
    'modal-overlay-background-color': 'rgb(0 0 0 / 0.75)',
    'overlay-box-shadow': '0 10px 20px 0 rgb(0 0 0 / 0.19)',
};
