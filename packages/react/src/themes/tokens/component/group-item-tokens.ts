import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type GroupItemTokens =
    | 'group-item-border-color';

export type GroupItemTokenValue = AliasTokens | RefTokens;

export type GroupItemTokenMap = {
    [Token in GroupItemTokens]: GroupItemTokenValue;
};

export const defaultGroupItemTokens: GroupItemTokenMap = {
    'group-item-border-color': 'color-brand-05',
};
