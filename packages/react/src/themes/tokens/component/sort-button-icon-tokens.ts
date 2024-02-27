import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SortButtonIconTokens =
    'sort-button-ascending-color' |
    'sort-button-descending-color' |
    'sort-button-default-color';

export type SortButtonTokensValue = AliasTokens | RefTokens;

export type SortButtonTokensMap = {
    [Token in SortButtonIconTokens]: SortButtonTokensValue;
}

export const defaultSortButtonTokens: SortButtonTokensMap = {
    'sort-button-ascending-color': 'color-neutral-65',
    'sort-button-descending-color': 'color-neutral-65',
    'sort-button-default-color': 'color-neutral-65'
}
