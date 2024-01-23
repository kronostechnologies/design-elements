import { PaletteTokens, PaletteValue } from './palette';
import { TextAttributeTokens, TextAttributeValue } from './text-attributes';

export type RefTokenValue = PaletteValue | TextAttributeValue;

export type RefTokens = PaletteTokens | TextAttributeTokens;

export type RefTokenMap = {
    [Token in RefTokens]: RefTokenValue;
}
