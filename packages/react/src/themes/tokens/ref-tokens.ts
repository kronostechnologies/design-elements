import { ColorUtilityTokens, ColorUtilityValue } from './ref-tokens/color-utility-tokens';
import { PaletteTokens, PaletteValue } from './ref-tokens/palette-tokens';
import { TextAttributeTokens, TextAttributeValue } from './ref-tokens/text-attributes-tokens';

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
