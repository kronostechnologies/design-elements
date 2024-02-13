import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type MenuTokens =
    | 'menu-background-color'
    | 'menu-border-color'
    | 'menu-shadow-color'
    | 'menu-submenu-background-color'
    | 'menu-submenu-border-color'
    | 'menu-submenu-shadow-color'
    | 'menu-item-text-color'
    | 'menu-item-hover-background-color'
    | 'menu-item-focus-shadow-color-1'
    | 'menu-item-focus-shadow-color-2'
    | 'menu-item-disabled-text-color'
    | 'menu-item-disabled-fill-color'
    | 'menu-grouplabel-text-color';

export type MenuTokenValue = AliasTokens | RefTokens;

export type MenuTokenMap = {
    [Token in MenuTokens]: MenuTokenValue;
};

export const defaultMenuTokens: MenuTokenMap = {
    'menu-background-color': 'color-white',
    'menu-border-color': 'color-neutral-50',
    'menu-grouplabel-text-color': 'color-neutral-65',
    'menu-item-disabled-fill-color': 'color-neutral-30',
    'menu-item-disabled-text-color': 'color-neutral-30',
    'menu-item-focus-shadow-color-1': 'color-brand-20',
    'menu-item-focus-shadow-color-2': 'color-brand-50',
    'menu-item-hover-background-color': 'color-neutral-15',
    'menu-item-text-color': 'color-black',
    'menu-shadow-color': 'transparent-10',
    'menu-submenu-background-color': 'color-white',
    'menu-submenu-border-color': 'color-neutral-50',
    'menu-submenu-shadow-color': 'transparent-10',
};
