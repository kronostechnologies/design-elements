import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TableTokens =
    | 'table-text-color'
    | 'table-background-color'
    | 'table-util-column-color'
    | 'table-row-selected-background-color'
    | 'table-row-error-background-color'
    | 'table-row-cell-hover-background-color'
    | 'table-row-border-top-color'
    | 'table-row-odd-background-color'
    | 'table-error-row-border-color';

export type TableRowTokenValue = AliasTokens | RefTokens;

export type TableTokenMap = {
    [Token in TableTokens]: TableRowTokenValue;
};

export const defaultTableTokens: TableTokenMap = {
    'table-text-color': 'color-neutral-90',
    'table-background-color': 'color-white',
    'table-util-column-color': 'color-neutral-65',
    'table-row-selected-background-color': 'color-brand-05',
    'table-row-error-background-color': 'color-alert-05',
    'table-row-cell-hover-background-color': 'color-neutral-15',
    'table-row-border-top-color': 'color-neutral-15',
    'table-row-odd-background-color': 'color-neutral-02',
    'table-error-row-border-color': 'color-alert-50',
};
