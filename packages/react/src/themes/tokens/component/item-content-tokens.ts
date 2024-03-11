import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ItemContentTokens =
    | 'item-content-icon-background-color'
    | 'item-content-icon-border-color'
    | 'item-content-description-color';

export type ItemContentTokenValue = AliasTokens | RefTokens;

export type ItemContentTokenMap = {
    [Token in ItemContentTokens]: ItemContentTokenValue;
};

export const defaultItemContentTokens: ItemContentTokenMap = {
    'item-content-icon-background-color': 'color-neutral-05',
    'item-content-icon-border-color': 'color-neutral-15',
    'item-content-description-color': 'color-neutral-65',
};
