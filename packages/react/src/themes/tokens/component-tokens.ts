import { ButtonTokens } from './component/button-tokens';
import { AliasTokens } from './alias-tokens';
import { FocusTokens } from './component/focus-tokens';
import { HeadingTokens } from './component/heading-tokens';
import { LabelTokens } from './component/label-tokens';
import { RefTokens, RefTokenValue } from './ref-tokens';

export type ComponentTokens =
    | ButtonTokens
    | HeadingTokens
    | LabelTokens
    | FocusTokens;

export type ComponentTokenValue = AliasTokens | RefTokens;

export type ComponentTokenMap = {
    [Token in ComponentTokens]: ComponentTokenValue;
}

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}
