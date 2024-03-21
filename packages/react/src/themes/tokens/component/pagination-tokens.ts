import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type PaginationTokens =
    | 'pagination-page-background-color'
    | 'pagination-page-text-color'
    | 'pagination-page-hover-background-color'
    | 'pagination-page-selected-hover-background-color'
    | 'pagination-page-selected-background-color'
    | 'pagination-page-selected-outline-color'
    | 'pagination-page-selected-text-color';

export type PaginationTokenValue = AliasTokens | RefTokens;

export type PaginationTokenMap = {
    [Token in PaginationTokens]: PaginationTokenValue;
};

export const defaultPaginationTokens: PaginationTokenMap = {
    'pagination-page-background-color': 'color-white',
    'pagination-page-text-color': 'color-neutral-65',
    'pagination-page-hover-background-color': 'color-neutral-15',
    'pagination-page-selected-hover-background-color': 'color-informative-05',
    'pagination-page-selected-background-color': 'color-informative-05',
    'pagination-page-selected-outline-color': 'color-informative-50',
    'pagination-page-selected-text-color': 'color-informative-70',
};
