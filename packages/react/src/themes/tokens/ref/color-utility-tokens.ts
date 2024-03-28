export type ColorUtilityTokens =
    | 'transparent-10'
    | 'transparent-20'
    | 'transparent-30'
    | 'transparent-40'
    | 'transparent-50'
    | 'transparent-60'
    | 'transparent-70'
    | 'transparent-80'
    | 'transparent-90'
    | 'transparent-100';

export type ColorUtilityValue = string;

export type ColorUtilityTokenMap = {
    [Token in ColorUtilityTokens]: ColorUtilityValue;
};

export const defaultColorUtilityTokens: ColorUtilityTokenMap = {
    'transparent-10': 'rgb(0 0 0 / 0.1)',
    'transparent-20': 'rgb(0 0 0 / 0.2)',
    'transparent-30': 'rgb(0 0 0 / 0.3)',
    'transparent-40': 'rgb(0 0 0 / 0.4)',
    'transparent-50': 'rgb(0 0 0 / 0.5)',
    'transparent-60': 'rgb(0 0 0 / 0.6)',
    'transparent-70': 'rgb(0 0 0 / 0.7)',
    'transparent-80': 'rgb(0 0 0 / 0.8)',
    'transparent-90': 'rgb(0 0 0 / 0.9)',
    'transparent-100': 'transparent',
};
