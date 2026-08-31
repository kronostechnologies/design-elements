import type { AliasToken } from './alias-tokens';
import type { RefToken } from './ref-tokens';

export type TokenName = string;
export type TokenValue = string;

export type TokenContextValue = 'desktop' | 'tablet' | 'mobile';
export type TokenContext = TokenContextValue[];

export type TokenMap<T extends TokenName, V extends TokenValue> = {
    [Name in T]: Exclude<V, Name>;
};

export type ContextualToken<T extends TokenName> = `${T}:${TokenContextValue}`;

export type ContextualTokenMap<T extends TokenName, V extends TokenValue> = TokenMap<T, V> & Partial<{
    [Name in T as ContextualToken<Name>]: V;
}>;

export type ResolvedTokenMap<T extends TokenName> = TokenMap<T, TokenValue>;

export type RefTokenMap<T extends TokenName> = ResolvedTokenMap<T>;
export type AliasTokenMap<T extends TokenName> = ContextualTokenMap<T, RefToken | AliasToken>;
export type ComponentTokenMap<T extends TokenName> = TokenMap<T, RefToken | AliasToken>;
