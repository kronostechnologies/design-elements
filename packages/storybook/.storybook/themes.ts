import { equisoftThemeCustomization, ThemeCustomization } from '@equisoft/design-elements-react';

export const themes: Record<string, { name: string, customization: ThemeCustomization }> = {
    'equisoft': {
        name: 'Equisoft Theme',
        customization: equisoftThemeCustomization,
    },
    'festive': {
        name: 'Festive Theme',
        customization: {
            ref: {
                'color-brand-05': '#e9e0f9',
                'color-brand-20': '#ad84ea',
                'color-brand-50': '#710096',
                'color-brand-70': '#36005a',
                'color-brand-80': '#230139',
                'color-accent-20': '#e9f9b2',
                'color-accent-50': '#c3ef3e',
                'color-accent-70': '#a7d414',
                'color-alert-02': '#fdfcf6',
                'color-alert-05': '#ffdaec',
                'color-alert-20': '#ffb6da',
                'color-alert-50': '#ff69b4',
                'color-alert-70': '#cf0068',
            },
            alias: {
                'text-heading-medium-font-size:mobile': 'font-size-600',
            },
        },
    },
};
