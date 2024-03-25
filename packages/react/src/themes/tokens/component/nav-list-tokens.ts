import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type NavListTokens =
    | 'nav-list-background-color'
    | 'nav-list-border-color'
    | 'nav-list-item-text-color'
    | 'nav-list-item-icon-text-color'
    | 'nav-list-item-hover-background-color'
    | 'nav-list-item-icon-hover-text-color'
    | 'nav-list-item-disabled-text-color';

export type NavListTokenValue = AliasTokens | RefTokens;

export type NavListTokenMap = {
    [Token in NavListTokens]: NavListTokenValue;
};

export const defaultNavListTokens: NavListTokenMap = {
    'nav-list-background-color': 'color-bg',
    'nav-list-border-color': 'color-overlay-border',
    'nav-list-item-text-color': 'color-text',
    'nav-list-item-icon-text-color': 'color-icon-alternate',
    'nav-list-item-hover-background-color': 'color-bg-hover',
    'nav-list-item-icon-hover-text-color': 'color-icon-hover',
    'nav-list-item-disabled-text-color': 'color-text-disabled',
};
