import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TableRowTokens =
    | 'table-row-selected-background-color'
    | 'table-row-error-background-color'
    | 'table-row-cell-hover-background-color'
    | 'table-row-border-top-color'
    | 'table-row-odd-background-color'
    | 'table-row-shadow-color';

export type TableRowTokenValue = AliasTokens | RefTokens;

export type TableRowTokenMap = {
    [Token in TableRowTokens]: TableRowTokenValue;
};

export const defaultTableRowTokens: TableRowTokenMap = {
    'table-row-selected-background-color': 'color-brand-05',
    'table-row-error-background-color': 'color-alert-05',
    'table-row-cell-hover-background-color': 'color-neutral-15',
    'table-row-border-top-color': 'color-neutral-15',
    'table-row-odd-background-color': 'color-neutral-02',
    'table-row-shadow-color': 'color-alert-50',
};
