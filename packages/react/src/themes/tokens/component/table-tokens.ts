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
    'table-background-color': 'transparent-100',
    'table-text-color': 'color-content',

    'table-header-background-color': 'color-bg',
    'table-header-border-color': 'color-border',
    'table-body-background-color': 'transparent-100',
    'table-footer-background-color': 'color-bg',
    'table-footer-border-color': 'color-border',

    'table-cell-hover-background-color': 'color-bg-hover',
    'table-cell-number-text-color': 'color-content-subtle',

    'table-row-border-color': 'color-border',
    'table-row-odd-background-color': 'color-bg-isolated',
    'table-row-selected-background-color': 'color-bg-selected',
    'table-row-error-background-color': 'color-feedback-bg-alert-subtle',
    'table-row-error-border-color': 'color-feedback-border-alert',

    'table-sort-button-ascending-icon-color': 'color-content-subtle',
    'table-sort-button-descending-icon-color': 'color-content-subtle',
    'table-sort-button-default-icon-color': 'color-content-subtle',

    'table-group-border-color': 'color-neutral-15',
};
