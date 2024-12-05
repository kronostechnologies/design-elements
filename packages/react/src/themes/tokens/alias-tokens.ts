import { ColorAliasToken, defaultColorAliasTokens } from './alias/color-tokens';

export type AliasToken =
    | ColorAliasToken;

export const defaultAliasTokens = {
    ...defaultColorAliasTokens,
};
