import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SearchInputTokens =
    | 'search-input-label-text-color'
    | 'search-input-icon-color'
    | 'search-input-disabled-icon-color'
    | 'search-input-reset-button-background-color'
    | 'search-input-reset-button-border-color';

export type SearchInputTokenValue = AliasTokens | RefTokens;

export type SearchInputTokenMap = {
    [Token in SearchInputTokens]: SearchInputTokenValue;
};

export const defaultSearchInputTokens: SearchInputTokenMap = {
    'search-input-disabled-icon-color': 'color-control-content-disabled',
    'search-input-icon-color': 'color-control-content',
    'search-input-label-text-color': 'color-control-content',
    'search-input-reset-button-background-color': 'transparent-100',
    'search-input-reset-button-border-color': 'transparent-100',
};
