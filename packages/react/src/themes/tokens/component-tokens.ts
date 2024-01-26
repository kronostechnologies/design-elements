import { ButtonTokens } from './component-tokens/button-tokens';
import { AliasTokens } from './alias-tokens';
import { RefTokens, RefTokenValue } from './ref-tokens';

export type ComponentTokens =
    | ButtonTokens;

export type ComponentTokenValue = AliasTokens | RefTokens;

export type ComponentTokenMap = {
    [Token in ComponentTokens]: ComponentTokenValue;
}

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}
