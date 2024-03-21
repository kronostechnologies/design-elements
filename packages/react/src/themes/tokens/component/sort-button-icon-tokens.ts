import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SortButtonIconTokens =
    'sort-button-ascending-icon-color' |
    'sort-button-descending-icon-color' |
    'sort-button-default-icon-color';

export type SortButtonTokensValue = AliasTokens | RefTokens;

export type SortButtonTokensMap = {
    [Token in SortButtonIconTokens]: SortButtonTokensValue;
}

export const defaultSortButtonTokens: SortButtonTokensMap = {
    'sort-button-ascending-icon-color': 'color-neutral-65',
    'sort-button-descending-icon-color': 'color-neutral-65',
    'sort-button-default-icon-color': 'color-neutral-65',
};
