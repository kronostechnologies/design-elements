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
    'menu-background-color': 'color-menu-bg',
    'menu-border-color': 'color-menu-border',
    'menu-submenu-background-color': 'color-menu-bg',
    'menu-submenu-border-color': 'color-menu-border',

    'menu-item-hover-background-color': 'color-menu-item-bg-hover',
    'menu-group-text-color': 'color-menu-item-subcontent',

    'menu-item-text-color': 'color-menu-item-content',
    'menu-item-disabled-text-color': 'color-menu-item-content-disabled',

    'menu-submenu-box-shadow-color': 'color-box-shadow',
    'menu-box-shadow-color': 'color-box-shadow',

    'menu-item-focus-outline-color': 'color-brand-50',
};
