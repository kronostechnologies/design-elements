import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TableTokens =
    | 'table-color'
    | 'table-background-color'
    | 'table-util-column-color';

export type TableRowTokenValue = AliasTokens | RefTokens;

export type TableTokenMap = {
    [Token in TableTokens]: TableRowTokenValue;
};

export const defaultTableTokens: TableTokenMap = {
    'table-color': 'color-neutral-90',
    'table-background-color': 'color-white',
    'table-util-column-color': 'color-neutral-65',
};
