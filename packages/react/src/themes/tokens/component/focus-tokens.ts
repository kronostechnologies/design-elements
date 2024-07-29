import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type FocusTokens =
    | 'focus-inside-border-color'
    | 'focus-inverted-inside-border-color'
    | 'focus-outside-border-color'
    | 'focus-inverted-outside-border-color';

export type FocusTokenValue = AliasTokens | RefTokens;

export type FocusTokenMap = {
    [Token in FocusTokens]: FocusTokenValue;
};

export const defaultFocusTokens: FocusTokenMap = {
    'focus-inside-border-color': 'color-border-focus-inside',
    'focus-outside-border-color': 'color-border-focus-outside',
    'focus-inverted-inside-border-color': 'color-border-focus-inside-inverse',
    'focus-inverted-outside-border-color': 'color-border-focus-outside-inverse',
};
