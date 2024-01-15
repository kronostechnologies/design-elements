import { RefTokens } from './ref-tokens';

export interface AliasTokens {
    // Allow either color tokens from the palette or other alias tokens
    [key: string]: keyof RefTokens | keyof AliasTokens;
}
