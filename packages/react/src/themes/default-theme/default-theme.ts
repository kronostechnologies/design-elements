import { Theme, ThemeCustomization } from '../tokens/theme';
import {
    AliasTokenMap,
    TextAttributeTokenMap,
    PaletteTokenMap, RefTokenMap,
} from '../tokens';
import { defaultComponentTokens } from './default-component-tokens';

export const defaultMain: Theme['main'] = {
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

export const defaultGreys: Theme['greys'] = {
    white: '#FFFFFF',
    'neutral-90': '#1B1C1E',
    'colored-white': '#FAFAFA',
    'light-grey': '#F1F2F2',
    grey: '#DBDEE1',
    'mid-grey': '#B7BBC2',
    'dark-grey': '#60666E',
    black: '#000000',
};

export const defaultNotifications: Theme['notifications'] = {
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

export const defaultTokens: Theme['tokens'] = {
    'focus-box-shadow': `0 0 0 2px ${defaultMain['primary-1.2']}`,
    'focus-box-shadow-inset': `inset 0 0 0 2px ${defaultMain['primary-1.2']}`,
    'focus-border-box-shadow': ` 0 0 0 1px ${defaultMain['primary-1.1']}, 0 0 0 3px ${defaultMain['primary-1.2']}`,
    'focus-border-box-shadow-inset': `inset 0 0 0 2px ${defaultMain['primary-1.2']}, inset 0 0 0 3px ${defaultMain['primary-1.1']}`,
    'focus-border': `${defaultMain['primary-1.1']}`,
    'modal-overlay-background-color': 'rgba(0, 0, 0, 0.75)',
    'overlay-box-shadow': '0 10px 20px 0 rgba(0, 0, 0, 0.19)',
};

export const defaultPaletteTokens: PaletteTokenMap = {
    'color-brand-05': '#E0F0F9',
    'color-brand-20': '#84C6EA',
    'color-brand-50': '#006296',
    'color-brand-70': '#003A5A',
    'color-brand-80': '#012639',
    'color-accent-20': '#F9B6B2',
    'color-accent-50': '#EF483E',
    'color-accent-70': '#D41F14',
    'color-white': '#FFFFFF',
    'color-black': '#000000',
    'color-neutral-02': '#FAFAFA',
    'color-neutral-05': '#F1F2F2',
    'color-neutral-15': '#DBDEE1',
    'color-neutral-30': '#B7BBC2',
    'color-neutral-50': '#878F9A',
    'color-neutral-65': '#60666E',
    'color-neutral-90': '#1B1C1E',
    'color-alert-02': '#FDF7F6',
    'color-alert-05': '#FAEAE9',
    'color-alert-20': '#F99D99',
    'color-alert-50': '#CD2C23',
    'color-alert-70': '#7B1A15',
    'color-informative-02': '#F9F7FB',
    'color-informative-05': '#E0F0F9',
    'color-informative-20': '#84C6EA',
    'color-informative-50': '#006296',
    'color-informative-70': '#003A5A',
    'color-success-02': '#F6FCF8',
    'color-success-05': '#E1F7EA',
    'color-success-20': '#8ADDA9',
    'color-success-50': '#008533',
    'color-success-70': '#004F1E',
    'color-warning-02': '#FFFBF5',
    'color-warning-05': '#FFF7E5',
    'color-warning-20': '#FFDD99',
    'color-warning-50': '#F5A200',
    'color-warning-70': '#9E6900',
    'color-warning-80': '#664400',
    'color-discovery-02': '#F9F7FB',
    'color-discovery-05': '#EFEAF6',
    'color-discovery-20': '#CFC1E3',
    'color-discovery-50': '#602FA0',
    'color-discovery-70': '#3A1C60',
};

export const defaultTextAttributeTokens: TextAttributeTokenMap = {
    'font-weight-bold': 'bold',
    transparent: 'transparent',
};

export const defaultRefTokens: RefTokenMap = {
    ...defaultPaletteTokens,
    ...defaultTextAttributeTokens,
};

export const defaultAliasTokens: AliasTokenMap = {
    'button-color-secondary': 'color-brand-05',
    'interaction-color': 'color-brand-50',
};

export const defaultTheme: ThemeCustomization = {
    ref: defaultRefTokens,
    alias: defaultAliasTokens,
    component: defaultComponentTokens,
};
