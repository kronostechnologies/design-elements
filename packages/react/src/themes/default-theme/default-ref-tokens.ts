import { RefTokenMap } from '../tokens';
import { defaultColorUtilityTokens } from './default-ref-tokens/default-color-utility-tokens';
import { defaultPaletteTokens } from './default-ref-tokens/default-palette-tokens';
import { defaultTextAttributeTokens } from './default-ref-tokens/default-text-attributes-tokens';

export const defaultRefTokens: RefTokenMap = {
    ...defaultPaletteTokens,
    ...defaultColorUtilityTokens,
    ...defaultTextAttributeTokens,
};
