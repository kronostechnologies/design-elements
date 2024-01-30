import { ColorUtilityTokens, ColorUtilityValue, defaultColorUtilityTokens } from './ref/color-utility-tokens';
import { defaultPaletteTokens, PaletteTokens, PaletteValue } from './ref/palette-tokens';
import { defaultTextAttributeTokens, TextAttributeTokens, TextAttributeValue } from './ref/text-attributes-tokens';

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

export const defaultRefTokens: RefTokenMap = {
    ...defaultPaletteTokens,
    ...defaultColorUtilityTokens,
    ...defaultTextAttributeTokens,
};
