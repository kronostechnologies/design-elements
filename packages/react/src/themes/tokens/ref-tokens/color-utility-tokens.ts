export type ColorUtilityValue = string;

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

export type ColorUtilityTokenMap = {
    [Token in ColorUtilityTokens]: ColorUtilityValue;
};
