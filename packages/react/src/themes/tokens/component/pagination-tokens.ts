import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type PaginationTokens =
    | 'pagination-background-color'
    | 'pagination-text-color'
    | 'pagination-hover-background-color'
    | 'pagination-selected-hover-background-color'
    | 'pagination-selected-background-color'
    | 'pagination-selected-outline-color'
    | 'pagination-selected-text-color'

export type PaginationTokenValue = AliasTokens | RefTokens;

export type PaginationTokenMap = {
    [Token in PaginationTokens]: PaginationTokenValue;
};

export const defaultPaginationTokens: PaginationTokenMap = {
    'pagination-background-color': 'color-white',
    'pagination-text-color': 'color-neutral-65',
    'pagination-hover-background-color': 'color-neutral-15',
    'pagination-selected-hover-background-color': 'color-informative-05',
    'pagination-selected-background-color': 'color-informative-05',
    'pagination-selected-outline-color': 'color-informative-50',
    'pagination-selected-text-color': 'color-informative-70',
};
