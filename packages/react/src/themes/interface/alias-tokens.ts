import { RefTokens } from './ref-tokens';

export interface AliasTokens {
    'button-color-secondary': keyof AliasTokens | keyof RefTokens;
    'interaction-color': keyof AliasTokens | keyof RefTokens;
}

export type AliasTokenKeys = keyof AliasTokens;
