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
    'transparent-05': 'rgb(0 0 0 / 0.05)',
    'transparent-10': 'rgb(0 0 0 / 0.1)',
    'transparent-15': 'rgb(0 0 0 / 0.15)',
    'transparent-20': 'rgb(0 0 0 / 0.2)',
    'transparent-25': 'rgb(0 0 0 / 0.25)',
    'transparent-30': 'rgb(0 0 0 / 0.3)',
    'transparent-35': 'rgb(0 0 0 / 0.35)',
    'transparent-40': 'rgb(0 0 0 / 0.4)',
    'transparent-45': 'rgb(0 0 0 / 0.45)',
    'transparent-50': 'rgb(0 0 0 / 0.5)',
    'transparent-55': 'rgb(0 0 0 / 0.55)',
    'transparent-60': 'rgb(0 0 0 / 0.6)',
    'transparent-65': 'rgb(0 0 0 / 0.65)',
    'transparent-70': 'rgb(0 0 0 / 0.7)',
    'transparent-75': 'rgb(0 0 0 / 0.75)',
    'transparent-80': 'rgb(0 0 0 / 0.8)',
    'transparent-85': 'rgb(0 0 0 / 0.85)',
    'transparent-90': 'rgb(0 0 0 / 0.9)',
    'transparent-95': 'rgb(0 0 0 / 0.95)',
    'transparent-100': 'transparent',
};
