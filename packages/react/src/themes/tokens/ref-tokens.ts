import {
    PaletteTokens,
    PaletteValue,
    ColorUtilityTokens,
    ColorUtilityValue,
    TextAttributeTokens,
    TextAttributeValue,
} from './ref';

export type RefTokenValue =
    | PaletteValue
    | TextAttributeValue
    | ColorUtilityValue;

export type RefTokens =
    | PaletteTokens
    | TextAttributeTokens
    | ColorUtilityTokens;

export type RefTokenMap = {
    [Token in RefTokens]: RefTokenValue;
}
