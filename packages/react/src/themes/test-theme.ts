import { ThemeCustomization } from './interface/theme';

export const customTheme: ThemeCustomization = {
    ref: {
        'color-brand-50': '#00874E',
        'color-brand-20': '#9EDBC1',
        'color-brand-70': '#0B5E37',
        'color-brand-05': '#E5F3ED',
        'color-brand-80': '#00874E',
        'color-accent-50': '#00874E',
        'color-accent-20': '#CC9B0B',
        'color-accent-70': '#3F474C',
    },
    alias: {
        'button-color-secondary': 'color-brand-70',
        'interaction-color': 'color-accent-70',
    },
    component: {
        'button-primary-background-color': 'color-brand-50',
        'button-primary-inverted-background-color': 'color-white',
        'button-primary-border-color': 'color-brand-50',
        'button-primary-inverted-border-color': 'color-white',
        'button-primary-text-color': 'color-white',
        'button-primary-inverted-text-color': 'color-brand-50',
    },
};
