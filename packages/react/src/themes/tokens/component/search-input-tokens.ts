import type { ComponentTokenMap } from '../tokens';

export type SearchInputToken =
    | 'search-input-label-text-color'
    | 'search-input-icon-color'
    | 'search-input-disabled-icon-color'
    | 'search-input-reset-button-background-color'
    | 'search-input-reset-button-border-color';

export const defaultSearchInputTokens: ComponentTokenMap<SearchInputToken> = {
    'search-input-disabled-icon-color': 'color-control-auxiliary-disabled',
    'search-input-icon-color': 'color-control-auxiliary',
    'search-input-label-text-color': 'color-control-auxiliary',
    'search-input-reset-button-background-color': 'transparent-100',
    'search-input-reset-button-border-color': 'transparent-100',
};
