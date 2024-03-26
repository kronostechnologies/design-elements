import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type PaginationTokens =
    | 'pagination-page-background-color'
    | 'pagination-page-text-color'
    | 'pagination-page-hover-background-color'
    | 'pagination-page-selected-hover-background-color'
    | 'pagination-page-selected-background-color'
    | 'pagination-page-selected-border-color'
    | 'pagination-page-selected-text-color';

export type PaginationTokenValue = AliasTokens | RefTokens;

export type PaginationTokenMap = {
    [Token in PaginationTokens]: PaginationTokenValue;
};

export const defaultPaginationTokens: PaginationTokenMap = {
    'pagination-page-background-color': 'transparent-100',
    'pagination-page-text-color': 'color-content-subtle',
    'pagination-page-hover-background-color': 'color-bg-hover',
    'pagination-page-selected-hover-background-color': 'color-bg-selected',
    'pagination-page-selected-background-color': 'color-bg-selected',
    'pagination-page-selected-border-color': 'color-border-selected',
    'pagination-page-selected-text-color': 'color-content-selected',
};
