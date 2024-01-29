import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type FocusTokens =
    | 'focus-border-color'
    | 'focus-box-shadow-color'
    | 'focus-box-shadow-inset-color'
    | 'focus-border-box-shadow-color-1'
    | 'focus-border-box-shadow-color-2'
    | 'focus-border-box-shadow-inset-color-1'
    | 'focus-border-box-shadow-inset-color-2';

export type FocusTokenValue = AliasTokens | RefTokens;

export type FocusTokenMap = {
    [Token in FocusTokens]: FocusTokenValue;
};
