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
    'menu-background-color': 'color-white', // 'color-bg-overlay'
    'menu-border-color': 'color-neutral-50', // 'color-border-overlay'
    'menu-submenu-background-color': 'color-white', // 'color-bg-overlay'
    'menu-submenu-border-color': 'color-neutral-50', // 'color-border-overlay'

    'menu-group-text-color': 'color-neutral-65', // 'color-content-subtle'
    'menu-item-disabled-text-color': 'color-neutral-30', // 'color-content-disabled'
    'menu-item-hover-background-color': 'color-neutral-15', // 'color-bg-hover'
    'menu-item-text-color': 'color-black', // 'color-content'

    'menu-submenu-box-shadow-color': 'transparent-10',
    'menu-box-shadow-color': 'transparent-10',

    'menu-item-focus-outline-color': 'color-brand-50',
};
