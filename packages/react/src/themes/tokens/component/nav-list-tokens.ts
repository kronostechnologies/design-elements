import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type NavListTokens =
    | 'nav-list-background-color'
    | 'nav-list-border-color'
    | 'nav-list-item-text-color'
    | 'nav-list-item-icon-color'
    | 'nav-list-item-hover-background-color'
    | 'nav-list-item-text-hover-color'
    | 'nav-list-item-icon-hover-color'
    | 'nav-list-item-disabled-text-color'
    | 'nav-list-box-shadow-color';

export type NavListTokenValue = AliasTokens | RefTokens;

export type NavListTokenMap = {
    [Token in NavListTokens]: NavListTokenValue;
};

export const defaultNavListTokens: NavListTokenMap = {
    'nav-list-background-color': 'color-white',
    'nav-list-border-color': 'color-neutral-65',

    'nav-list-item-icon-color': 'color-neutral-90',
    'nav-list-item-text-color': 'color-neutral-90',

    'nav-list-item-hover-background-color': 'color-neutral-15',
    'nav-list-item-text-hover-color': 'color-black',
    'nav-list-item-icon-hover-color': 'color-black',

    'nav-list-item-disabled-text-color': 'color-neutral-30',

    'nav-list-box-shadow-color': 'transparent-dark-20',
};
