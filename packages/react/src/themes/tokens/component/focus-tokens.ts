import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type FocusTokens =
    | 'focus-border-color'
    | 'focus-inverted-border-color'
    | 'focus-box-shadow-color'
    | 'focus-inverted-box-shadow-color';

export type FocusTokenValue = AliasTokens | RefTokens;

export type FocusTokenMap = {
    [Token in FocusTokens]: FocusTokenValue;
};

export const defaultFocusTokens: FocusTokenMap = {
    'focus-border-color': 'color-brand-20',
    'focus-inverted-border-color': 'color-brand-50',
    'focus-box-shadow-color': 'color-brand-50',
    'focus-inverted-box-shadow-color': 'color-brand-20',
};
