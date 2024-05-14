import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TableTokens =
    | 'table-text-color'
    | 'table-background-color'
    | 'table-header-background-color'
    | 'table-header-border-color'
    | 'table-body-background-color'
    | 'table-footer-background-color'
    | 'table-footer-border-color'
    | 'table-group-border-color'
    | 'table-cell-hover-background-color'
    | 'table-cell-number-text-color'
    | 'table-row-selected-background-color'
    | 'table-row-error-background-color'
    | 'table-row-border-color'
    | 'table-row-odd-background-color'
    | 'table-row-error-border-color'
    | 'table-sort-button-ascending-icon-color'
    | 'table-sort-button-descending-icon-color'
    | 'table-sort-button-default-icon-color';

export type TableRowTokenValue = AliasTokens | RefTokens;

export type TableTokenMap = {
    [Token in TableTokens]: TableRowTokenValue;
};

export const defaultTableTokens: TableTokenMap = {
    'table-text-color': 'color-neutral-90',
    'table-background-color': 'color-white',

    'table-header-background-color': 'color-white',
    'table-header-border-color': 'color-neutral-15',
    'table-body-background-color': 'transparent-100',
    'table-footer-border-color': 'color-neutral-15',
    'table-footer-background-color': 'color-white',

    'table-cell-hover-background-color': 'color-neutral-15',
    'table-cell-number-text-color': 'color-neutral-65',

    'table-group-border-color': 'color-neutral-15',
    'table-row-border-color': 'color-neutral-15',
    'table-row-odd-background-color': 'color-neutral-02',
    'table-row-selected-background-color': 'color-brand-05',
    'table-row-error-background-color': 'color-alert-05',
    'table-row-error-border-color': 'color-alert-50',
    'table-sort-button-ascending-icon-color': 'color-neutral-65',
    'table-sort-button-descending-icon-color': 'color-neutral-65',
    'table-sort-button-default-icon-color': 'color-neutral-65',
};
