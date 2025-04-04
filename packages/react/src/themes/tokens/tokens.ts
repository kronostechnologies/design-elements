import type { RefToken } from './ref-tokens';
import type { AliasToken } from './alias-tokens';

export type TokenName = string;
export type TokenValue = string;

export type TokenMap<T extends TokenName, V extends TokenValue> = {
    [Name in T]: Exclude<V, Name>;
};

export type ResolvedTokenMap<T extends TokenName> = TokenMap<T, TokenValue>;

export type RefTokenMap<T extends TokenName> = ResolvedTokenMap<T>;
export type AliasTokenMap<T extends TokenName> = TokenMap<T, RefToken | AliasToken>;
export type ComponentTokenMap<T extends TokenName> = TokenMap<T, RefToken | AliasToken>;
