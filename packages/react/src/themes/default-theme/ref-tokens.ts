import { RefTokenMap } from '../tokens';
import { colorUtilityTokens } from './default-ref/color-utility-tokens';
import { paletteTokens } from './default-ref/palette-tokens';
import { defaultTextAttributeTokens } from './default-ref/text-attributes-tokens';

export const refTokens: RefTokenMap = {
    ...paletteTokens,
    ...colorUtilityTokens,
    ...defaultTextAttributeTokens,
};
