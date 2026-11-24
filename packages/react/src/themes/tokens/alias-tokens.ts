import { ColorAliasToken, defaultColorAliasTokens } from './alias/color-tokens';
import { ControlSizeAliasToken, defaultControlSizeAliasTokens } from './alias/control-size-tokens';
import { defaultTextAliasTokens, TextAliasToken } from './alias/text-tokens';

export type AliasToken =
    | ColorAliasToken
    | ControlSizeAliasToken
    | TextAliasToken;

export const defaultAliasTokens = {
    ...defaultColorAliasTokens,
    ...defaultControlSizeAliasTokens,
    ...defaultTextAliasTokens,
};
