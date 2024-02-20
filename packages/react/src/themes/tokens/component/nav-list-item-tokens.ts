import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type NavListItemTokens =
    | 'nav-list-item-text-color'
    | 'nav-list-item-icon-text-color'
    | 'nav-list-item-hover-background-color'
    | 'nav-list-item-icon-hover-text-color'
    | 'nav-list-item-disabled-text-color'

export type NavListItemTokenValue = AliasTokens | RefTokens;

export type NavListItemTokenMap = {
    [Token in NavListItemTokens]: NavListItemTokenValue;
};

export const defaultNavListItemTokens: NavListItemTokenMap = {
    'nav-list-item-text-color': 'color-black',
    'nav-list-item-icon-text-color': 'color-neutral-65',
    'nav-list-item-hover-background-color': 'color-neutral-15',
    'nav-list-item-icon-hover-text-color': 'color-black',
    'nav-list-item-disabled-text-color': 'color-neutral-30',
};
