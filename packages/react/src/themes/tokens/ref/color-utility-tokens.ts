export type ColorUtilityTokens =
    | 'transparent-05'
    | 'transparent-10'
    | 'transparent-15'
    | 'transparent-20'
    | 'transparent-25'
    | 'transparent-30'
    | 'transparent-35'
    | 'transparent-40'
    | 'transparent-45'
    | 'transparent-50'
    | 'transparent-55'
    | 'transparent-60'
    | 'transparent-65'
    | 'transparent-70'
    | 'transparent-75'
    | 'transparent-80'
    | 'transparent-85'
    | 'transparent-90'
    | 'transparent-95'
    | 'transparent-100';

export type ColorUtilityValue = string;

export type ColorUtilityTokenMap = {
    [Token in ColorUtilityTokens]: ColorUtilityValue;
};

export const defaultColorUtilityTokens: ColorUtilityTokenMap = {
    'transparent-05': 'rgba(0, 0, 0, 0.05)',
    'transparent-10': 'rgba(0, 0, 0, 0.1)',
    'transparent-15': 'rgba(0, 0, 0, 0.15)',
    'transparent-20': 'rgba(0, 0, 0, 0.2)',
    'transparent-25': 'rgba(0, 0, 0, 0.25)',
    'transparent-30': 'rgba(0, 0, 0, 0.3)',
    'transparent-35': 'rgba(0, 0, 0, 0.35)',
    'transparent-40': 'rgba(0, 0, 0, 0.4)',
    'transparent-45': 'rgba(0, 0, 0, 0.45)',
    'transparent-50': 'rgba(0, 0, 0, 0.5)',
    'transparent-55': 'rgba(0, 0, 0, 0.55)',
    'transparent-60': 'rgba(0, 0, 0, 0.6)',
    'transparent-65': 'rgba(0, 0, 0, 0.65)',
    'transparent-70': 'rgba(0, 0, 0, 0.7)',
    'transparent-75': 'rgba(0, 0, 0, 0.75)',
    'transparent-80': 'rgba(0, 0, 0, 0.8)',
    'transparent-85': 'rgba(0, 0, 0, 0.85)',
    'transparent-90': 'rgba(0, 0, 0, 0.9)',
    'transparent-95': 'rgba(0, 0, 0, 0.95)',
    'transparent-100': 'transparent',
};
