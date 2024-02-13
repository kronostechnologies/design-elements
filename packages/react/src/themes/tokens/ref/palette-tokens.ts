export type PaletteTokens =
    | 'color-brand-05'
    | 'color-brand-20'
    | 'color-brand-50'
    | 'color-brand-70'
    | 'color-brand-80'
    | 'color-accent-20'
    | 'color-accent-50'
    | 'color-accent-70'
    | 'color-white'
    | 'color-black'
    | 'color-neutral-02'
    | 'color-neutral-05'
    | 'color-neutral-15'
    | 'color-neutral-30'
    | 'color-neutral-50'
    | 'color-neutral-65'
    | 'color-neutral-90'
    | 'color-alert-02'
    | 'color-alert-03'
    | 'color-alert-05'
    | 'color-alert-20'
    | 'color-alert-50'
    | 'color-alert-70'
    | 'color-informative-02'
    | 'color-informative-03'
    | 'color-informative-05'
    | 'color-informative-20'
    | 'color-informative-50'
    | 'color-informative-70'
    | 'color-success-02'
    | 'color-success-03'
    | 'color-success-05'
    | 'color-success-20'
    | 'color-success-50'
    | 'color-success-70'
    | 'color-warning-02'
    | 'color-warning-05'
    | 'color-warning-20'
    | 'color-warning-50'
    | 'color-warning-70'
    | 'color-warning-80'
    | 'color-discovery-02'
    | 'color-discovery-05'
    | 'color-discovery-20'
    | 'color-discovery-50'
    | 'color-discovery-70';

export type PaletteValue = string;

export type PaletteTokenMap = {
    [Token in PaletteTokens]: PaletteValue;
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
    'color-alert-03': '#FDF6F7',
    'color-alert-05': '#FAEAE9',
    'color-alert-20': '#F99D99',
    'color-alert-50': '#CD2C23',
    'color-alert-70': '#7B1A15',
    'color-informative-02': '#F9F7FB',
    'color-informative-03': '#F3F9FD',
    'color-informative-05': '#E0F0F9',
    'color-informative-20': '#84C6EA',
    'color-informative-50': '#006296',
    'color-informative-70': '#003A5A',
    'color-success-02': '#F6FCF8',
    'color-success-03': '#F6FBF8',
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
