import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type DropdownMenuTokens =
    | 'dropdown-menu-border-color'
    | 'dropdown-menu-background-color'
    | 'dropdown-menu-text-color'
    | 'dropdown-menu-nav-item-text-color'
    | 'dropdown-menu-nav-item-hover-background-color'
    | 'dropdown-menu-nav-item-hover-disabled-background-color'
    | 'dropdown-menu-nav-item-disabled-text-color'
    | 'dropdown-menu-nav-item-disabled-icon-color'
    | 'dropdown-menu-nav-item-external-link-icon-color'
    | 'dropdown-menu-nav-item-external-link-text-color'
    | 'dropdown-menu-list-item-text-color'
    | 'dropdown-menu-external-item-text-color'
    | 'dropdown-menu-external-item-hover-background-color'
    | 'dropdown-menu-external-item-visited-text-color'
    | 'dropdown-menu-external-item-visited-fill-color'
    | 'dropdown-menu-external-item-svg-visited-text-color'
    | 'dropdown-menu-external-item-svg-visited-fill-color'
    | 'dropdown-menu-external-item-disabled-text-color'
    | 'dropdown-menu-external-item-disabled-fill-color'
    | 'dropdown-menu-group-item-border-color'
    | 'dropdown-menu-item-content-icon-background-color'
    | 'dropdown-menu-item-content-icon-border-color'
    | 'dropdown-menu-item-content-description-text-color';

export type DropdownMenuTokenValue = AliasTokens | RefTokens;

export type DropdownMenuTokenMap = {
    [Token in DropdownMenuTokens]: DropdownMenuTokenValue;
};

export const defaultDropdownMenuTokens: DropdownMenuTokenMap = {
    'dropdown-menu-border-color': 'color-neutral-65',
    'dropdown-menu-background-color': 'color-white',
    'dropdown-menu-text-color': 'color-black',
    'dropdown-menu-nav-item-text-color': 'color-black',
    'dropdown-menu-nav-item-hover-background-color': 'color-neutral-15',
    'dropdown-menu-nav-item-hover-disabled-background-color': 'transparent-100',
    'dropdown-menu-nav-item-disabled-text-color': 'color-neutral-30',
    'dropdown-menu-nav-item-disabled-icon-color': 'color-neutral-30',
    'dropdown-menu-nav-item-external-link-icon-color': 'color-black',
    'dropdown-menu-nav-item-external-link-text-color': 'color-black',
    'dropdown-menu-list-item-text-color': 'color-black',
    'dropdown-menu-external-item-text-color': 'color-black',
    'dropdown-menu-external-item-hover-background-color': 'color-neutral-15',
    'dropdown-menu-external-item-svg-visited-text-color': 'color-black',
    'dropdown-menu-external-item-svg-visited-fill-color': 'color-black',
    'dropdown-menu-external-item-visited-text-color': 'color-black',
    'dropdown-menu-external-item-visited-fill-color': 'color-black',
    'dropdown-menu-external-item-disabled-text-color': 'color-neutral-30',
    'dropdown-menu-external-item-disabled-fill-color': 'color-neutral-30',
    'dropdown-menu-group-item-border-color': 'color-brand-05',
    'dropdown-menu-item-content-icon-background-color': 'color-neutral-05',
    'dropdown-menu-item-content-icon-border-color': 'color-neutral-15',
    'dropdown-menu-item-content-description-text-color': 'color-neutral-65',
};
