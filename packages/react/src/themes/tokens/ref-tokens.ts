import { defaultPaletteTokens, PaletteToken } from './ref/palette-tokens';
import { defaultUtilityTokens, UtilityToken } from './ref/utility-tokens';

export type RefToken =
    | PaletteToken
    | UtilityToken;

export const defaultRefTokens = {
    ...defaultPaletteTokens,
    ...defaultUtilityTokens,
};
