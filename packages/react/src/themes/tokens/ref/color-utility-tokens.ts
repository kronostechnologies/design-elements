export type ColorUtilityTokens =
    | 'transparent-dark-5'
    | 'transparent-light-5'
    | 'transparent-dark-10'
    | 'transparent-light-10'
    | 'transparent-dark-15'
    | 'transparent-light-15'
    | 'transparent-dark-20'
    | 'transparent-light-20'
    | 'transparent-dark-25'
    | 'transparent-light-25'
    | 'transparent-dark-30'
    | 'transparent-light-30'
    | 'transparent-dark-35'
    | 'transparent-light-35'
    | 'transparent-dark-40'
    | 'transparent-light-40'
    | 'transparent-dark-45'
    | 'transparent-light-45'
    | 'transparent-dark-50'
    | 'transparent-light-50'
    | 'transparent-dark-55'
    | 'transparent-light-55'
    | 'transparent-dark-60'
    | 'transparent-light-60'
    | 'transparent-dark-65'
    | 'transparent-light-65'
    | 'transparent-dark-70'
    | 'transparent-light-70'
    | 'transparent-dark-75'
    | 'transparent-light-75'
    | 'transparent-dark-80'
    | 'transparent-light-80'
    | 'transparent-dark-85'
    | 'transparent-light-85'
    | 'transparent-dark-90'
    | 'transparent-light-90'
    | 'transparent-dark-95'
    | 'transparent-light-95'
    | 'transparent-100';

export type ColorUtilityValue = string;

export type ColorUtilityTokenMap = {
    [Token in ColorUtilityTokens]: ColorUtilityValue;
};

export const defaultColorUtilityTokens: ColorUtilityTokenMap = {
    'transparent-dark-5': 'rgb(0 0 0 / 0.05)',
    'transparent-light-5': 'rgb(255 255 255 / 0.05)',
    'transparent-dark-10': 'rgb(0 0 0 / 0.1)',
    'transparent-light-10': 'rgb(255 255 255 / 0.1)',
    'transparent-dark-15': 'rgb(0 0 0 / 0.15)',
    'transparent-light-15': 'rgb(255 255 255 / 0.15)',
    'transparent-dark-20': 'rgb(0 0 0 / 0.2)',
    'transparent-light-20': 'rgb(255 255 255 / 0.2)',
    'transparent-dark-25': 'rgb(0 0 0 / 0.25)',
    'transparent-light-25': 'rgb(255 255 255 / 0.25)',
    'transparent-dark-30': 'rgb(0 0 0 / 0.3)',
    'transparent-light-30': 'rgb(255 255 255 / 0.3)',
    'transparent-dark-35': 'rgb(0 0 0 / 0.35)',
    'transparent-light-35': 'rgb(255 255 255 / 0.35)',
    'transparent-dark-40': 'rgb(0 0 0 / 0.4)',
    'transparent-light-40': 'rgb(255 255 255 / 0.4)',
    'transparent-dark-45': 'rgb(0 0 0 / 0.45)',
    'transparent-light-45': 'rgb(255 255 255 / 0.45)',
    'transparent-dark-50': 'rgb(0 0 0 / 0.5)',
    'transparent-light-50': 'rgb(255 255 255 / 0.5)',
    'transparent-dark-55': 'rgb(0 0 0 / 0.55)',
    'transparent-light-55': 'rgb(255 255 255 / 0.55)',
    'transparent-dark-60': 'rgb(0 0 0 / 0.6)',
    'transparent-light-60': 'rgb(255 255 255 / 0.6)',
    'transparent-dark-65': 'rgb(0 0 0 / 0.65)',
    'transparent-light-65': 'rgb(255 255 255 / 0.65)',
    'transparent-dark-70': 'rgb(0 0 0 / 0.7)',
    'transparent-light-70': 'rgb(255 255 255 / 0.7)',
    'transparent-dark-75': 'rgb(0 0 0 / 0.75)',
    'transparent-light-75': 'rgb(255 255 255 / 0.75)',
    'transparent-dark-80': 'rgb(0 0 0 / 0.8)',
    'transparent-light-80': 'rgb(255 255 255 / 0.8)',
    'transparent-dark-85': 'rgb(0 0 0 / 0.85)',
    'transparent-light-85': 'rgb(255 255 255 / 0.85)',
    'transparent-dark-90': 'rgb(0 0 0 / 0.9)',
    'transparent-light-90': 'rgb(255 255 255 / 0.9)',
    'transparent-dark-95': 'rgb(0 0 0 / 0.95)',
    'transparent-light-95': 'rgb(255 255 255 / 0.95)',
    'transparent-100': 'transparent',
};
