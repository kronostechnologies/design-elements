import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type MenuTokens =
    | 'menu-background-color'
    | 'menu-border-color'
    | 'menu-box-shadow-color'
    | 'menu-submenu-background-color'
    | 'menu-submenu-border-color'
    | 'menu-submenu-box-shadow-color'
    | 'menu-item-text-color'
    | 'menu-item-hover-background-color'
    | 'menu-item-focus-outline-color'
    | 'menu-item-disabled-text-color'
    | 'menu-group-text-color';

export type MenuTokenValue = AliasTokens | RefTokens;

export type MenuTokenMap = {
    [Token in MenuTokens]: MenuTokenValue;
};

export const defaultMenuTokens: MenuTokenMap = {
    'menu-background-color': 'color-bg-overlay',
    'menu-border-color': 'color-border-overlay',
    'menu-submenu-background-color': 'color-bg-overlay',
    'menu-submenu-border-color': 'color-border-overlay',

    'menu-group-text-color': 'color-content-subtle',
    'menu-item-disabled-text-color': 'color-content-disabled',
    'menu-item-hover-background-color': 'color-bg-hover',
    'menu-item-text-color': 'color-content',

    'menu-submenu-box-shadow-color': 'transparent-dark-10',
    'menu-box-shadow-color': 'transparent-dark-10',

    'menu-item-focus-outline-color': 'color-brand-50',
};
