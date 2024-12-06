import { ColorAliasToken, defaultColorAliasTokens } from './alias/color-tokens';
import { defaultTextAliasTokens, TextAliasToken } from './alias/text-tokens';

export type AliasToken =
    | ColorAliasToken
    | TextAliasToken;

export const defaultAliasTokens = {
    ...defaultColorAliasTokens,
    ...defaultTextAliasTokens,
};
