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
    'nav-list-background-color': 'color-menu-background',
    'nav-list-border-color': 'color-menu-border',

    'nav-list-item-icon-color': 'color-menu-item-content',
    'nav-list-item-text-color': 'color-menu-item-content',

    'nav-list-item-hover-background-color': 'color-menu-item-background-hover',
    'nav-list-item-text-hover-color': 'color-menu-item-content-hover',
    'nav-list-item-icon-hover-color': 'color-menu-item-content-hover',

    'nav-list-item-disabled-text-color': 'color-menu-item-content-disabled',

    'nav-list-box-shadow-color': 'color-box-shadow',
};
