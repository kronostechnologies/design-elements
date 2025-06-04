import type { ComponentTokenMap } from '../tokens';

export type PaginationToken =
    | 'pagination-page-background-color'
    | 'pagination-page-text-color'
    | 'pagination-page-hover-background-color'
    | 'pagination-page-hover-text-color'
    | 'pagination-page-selected-hover-background-color'
    | 'pagination-page-selected-background-color'
    | 'pagination-page-selected-border-color'
    | 'pagination-page-selected-text-color'

export const defaultPaginationTokens: ComponentTokenMap<PaginationToken> = {
    'pagination-page-background-color': 'transparent-100',
    'pagination-page-text-color': 'color-content-subtle',
    'pagination-page-hover-background-color': 'color-background-hover',
    'pagination-page-hover-text-color': 'color-content',
    'pagination-page-selected-hover-background-color': 'color-background-selected',
    'pagination-page-selected-background-color': 'color-background-selected',
    'pagination-page-selected-border-color': 'color-border-selected',
    'pagination-page-selected-text-color': 'color-content-selected',
};
