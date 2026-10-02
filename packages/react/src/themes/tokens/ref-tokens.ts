import { defaultPaletteTokens, PaletteToken } from './ref/palette-tokens';
import { defaultSizeTokens, SizeToken } from './ref/size-tokens';
import { defaultSpacingTokens, SpacingToken } from './ref/spacing-tokens';
import { defaultTextTokens, TextToken } from './ref/text-tokens';
import { defaultUtilityTokens, UtilityToken } from './ref/utility-tokens';

export type RefToken =
    | PaletteToken
    | SizeToken
    | SpacingToken
    | TextToken
    | UtilityToken;

export const defaultRefTokens = {
    ...defaultPaletteTokens,
    ...defaultSizeTokens,
    ...defaultSpacingTokens,
    ...defaultTextTokens,
    ...defaultUtilityTokens,
};
