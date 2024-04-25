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
    | 'menu-item-hover-text-color'
    | 'menu-item-icon-color'
    | 'menu-item-hover-icon-color'
    | 'menu-item-hover-background-color'
    | 'menu-item-disabled-text-color'
    | 'menu-group-text-color';

export type MenuTokenValue = AliasTokens | RefTokens;

export type MenuTokenMap = {
    [Token in MenuTokens]: MenuTokenValue;
};

export const defaultMenuTokens: MenuTokenMap = {
    'menu-background-color': 'color-white',
    'menu-border-color': 'color-neutral-50',
    'menu-group-text-color': 'color-neutral-65',
    'menu-item-disabled-text-color': 'color-neutral-30',
    'menu-item-hover-background-color': 'color-neutral-15',
    'menu-item-text-color': 'color-neutral-90',
    'menu-item-hover-text-color': 'color-black',
    'menu-item-icon-color': 'color-neutral-90',
    'menu-item-hover-icon-color': 'color-black',
    'menu-submenu-background-color': 'color-white',
    'menu-submenu-border-color': 'color-neutral-50',
    'menu-box-shadow-color': 'transparent-dark-20',
    'menu-submenu-box-shadow-color': 'transparent-dark-20',
};
