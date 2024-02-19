import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SearchInputTokens =
    | 'search-input-label-text-color'
    | 'search-input-icon-color'
    | 'search-input-disabled-icon-color'
    | 'search-input-reset-icon-background-color'
    | 'search-input-reset-icon-border-color';

export type SearchInputTokenValue = AliasTokens | RefTokens;

export type SearchInputTokenMap = {
    [Token in SearchInputTokens]: SearchInputTokenValue;
};

export const defaultSearchInputTokens: SearchInputTokenMap = {
    'search-input-disabled-icon-color': 'color-neutral-30',
    'search-input-icon-color': 'color-neutral-65',
    'search-input-reset-icon-background-color': 'transparent-100',
    'search-input-reset-icon-border-color': 'transparent-100',
    'search-input-label-text-color': 'color-neutral-65',
};
