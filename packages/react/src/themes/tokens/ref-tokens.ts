import { defaultPaletteTokens, PaletteToken } from './ref/palette-tokens';
import { defaultTextTokens, TextToken } from './ref/text-tokens';
import { defaultUtilityTokens, UtilityToken } from './ref/utility-tokens';

export type RefToken =
    | PaletteToken
    | TextToken
    | UtilityToken;

export const defaultRefTokens = {
    ...defaultPaletteTokens,
    ...defaultTextTokens,
    ...defaultUtilityTokens,
};
