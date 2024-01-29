import { RefTokenMap } from '../tokens';
import {
    defaultPaletteTokens,
    defaultTextAttributeTokens,
    defaultColorUtilityTokens,
} from './default-ref';

export const defaultRefTokens: RefTokenMap = {
    ...defaultPaletteTokens,
    ...defaultColorUtilityTokens,
    ...defaultTextAttributeTokens,
};
