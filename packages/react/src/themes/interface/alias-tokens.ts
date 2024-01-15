import { PaletteKeys } from './palette';

export interface AliasTokens {
    // Allow either color tokens from the palette or other alias tokens
    [key: string]: PaletteKeys | keyof AliasTokens;
}
