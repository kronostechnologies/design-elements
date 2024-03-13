import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type DropdownMenuTokens =
    | 'dropdown-menu-border-color'
    | 'dropdown-menu-background-color'
    | 'dropdown-menu-text-color'
    | 'nav-item-color'
    | 'nav-item-hover-background-color'
    | 'nav-item-hover-disabled-background-color'
    | 'nav-item-disabled-color'
    | 'nav-item-disabled-fill'
    | 'nav-item-external-link-svg-color'
    | 'nav-item-external-link-text-color'
    | 'label-item-color'
    | 'external-item-color'
    | 'external-item-hover-background-color'
    | 'external-item-visited-text-color'
    | 'external-item-visited-fill-color'
    | 'external-item-svg-visited-text-color'
    | 'external-item-svg-visited-fill-color'
    | 'external-item-disabled-color'
    | 'external-item-disabled-fill-color'
    | 'group-item-border-color'
    | 'item-content-icon-background-color'
    | 'item-content-icon-border-color'
    | 'item-content-description-color';

export type DropdownMenuTokenValue = AliasTokens | RefTokens;

export type DropdownMenuTokenMap = {
    [Token in DropdownMenuTokens]: DropdownMenuTokenValue;
};

export const defaultDropdownMenuTokens: DropdownMenuTokenMap = {
    'dropdown-menu-border-color': 'color-neutral-65',
    'dropdown-menu-background-color': 'color-white',
    'dropdown-menu-text-color': 'color-black',
    'nav-item-color': 'color-black',
    'nav-item-hover-background-color': 'color-neutral-15',
    'nav-item-hover-disabled-background-color': 'transparent-100',
    'nav-item-disabled-color': 'color-neutral-30',
    'nav-item-disabled-fill': 'color-neutral-30',
    'nav-item-external-link-svg-color': 'color-black',
    'nav-item-external-link-text-color': 'color-black',
    'label-item-color': 'color-black',
    'external-item-color': 'color-black',
    'external-item-hover-background-color': 'color-neutral-15',
    'external-item-svg-visited-text-color': 'color-black',
    'external-item-svg-visited-fill-color': 'color-black',
    'external-item-visited-text-color': 'color-black',
    'external-item-visited-fill-color': 'color-black',
    'external-item-disabled-color': 'color-neutral-30',
    'external-item-disabled-fill-color': 'color-neutral-30',
    'group-item-border-color': 'color-brand-05',
    'item-content-icon-background-color': 'color-neutral-05',
    'item-content-icon-border-color': 'color-neutral-15',
    'item-content-description-color': 'color-neutral-65',
};
