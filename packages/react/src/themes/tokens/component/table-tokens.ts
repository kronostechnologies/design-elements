import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TableTokens =
    | 'table-text-color'
    | 'table-background-color'
    | 'table-header-background-color'
    | 'table-body-background-color'
    | 'table-footer-background-color'
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
    'table-text-color': 'color-text',
    'table-background-color': 'transparent-100',
    'table-header-background-color': 'color-bg',
    'table-body-background-color': 'transparent-100',
    'table-footer-background-color': 'color-bg',
    'table-cell-hover-background-color': 'color-bg-hover',
    'table-cell-number-text-color': 'color-text-alternate',
    'table-row-selected-background-color': 'color-bg-selected',
    'table-row-error-background-color': 'color-feedback-bg-alert-subtle',
    'table-row-border-color': 'color-border',
    'table-row-odd-background-color': 'color-bg-alternate-subtlest',
    'table-row-error-border-color': 'color-interactive-border-error',
    'table-sort-button-ascending-icon-color': 'color-icon-alternate',
    'table-sort-button-descending-icon-color': 'color-icon-alternate',
    'table-sort-button-default-icon-color': 'color-icon-alternate',
};
