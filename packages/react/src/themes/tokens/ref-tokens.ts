import { ColorUtilityTokens, ColorUtilityValue } from './ref/color-utility-tokens';
import { PaletteTokens, PaletteValue } from './ref/palette-tokens';
import { TextAttributeTokens, TextAttributeValue } from './ref/text-attributes-tokens';

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
