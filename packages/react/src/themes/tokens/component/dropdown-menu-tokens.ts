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
    | 'dropdown-menu-external-item-icon-visited-text-color'
    | 'dropdown-menu-external-item-icon-visited-fill-color'
    | 'dropdown-menu-external-item-disabled-text-color'
    | 'dropdown-menu-external-item-disabled-fill-color'
    | 'dropdown-menu-group-border-color'
    | 'dropdown-menu-item-content-icon-background-color'
    | 'dropdown-menu-item-content-icon-border-color'
    | 'dropdown-menu-item-content-description-text-color';

export type DropdownMenuTokenValue = AliasTokens | RefTokens;

export type DropdownMenuTokenMap = {
    [Token in DropdownMenuTokens]: DropdownMenuTokenValue;
};

export const defaultDropdownMenuTokens: DropdownMenuTokenMap = {
    'dropdown-menu-border-color': 'color-neutral-65',
    'dropdown-menu-background-color': 'color-bg',
    'dropdown-menu-text-color': 'color-content',
    'dropdown-menu-list-item-text-color': 'color-content',
    'dropdown-menu-item-content-icon-background-color': 'color-bg-neutral-subtle',
    'dropdown-menu-item-content-icon-border-color': 'color-border',
    'dropdown-menu-item-content-description-text-color': 'color-content-subtle',
    'dropdown-menu-nav-item-text-color': 'color-content',
    'dropdown-menu-nav-item-hover-background-color': 'color-bg-hover',
    'dropdown-menu-nav-item-hover-disabled-background-color': 'transparent-100',
    'dropdown-menu-nav-item-disabled-text-color': 'color-content-disabled',
    'dropdown-menu-nav-item-disabled-icon-color': 'color-content-disabled',
    'dropdown-menu-nav-item-external-link-icon-color': 'color-content',
    'dropdown-menu-nav-item-external-link-text-color': 'color-content',
    'dropdown-menu-external-item-text-color': 'color-content',
    'dropdown-menu-external-item-hover-background-color': 'color-bg-hover',
    'dropdown-menu-external-item-icon-visited-text-color': 'color-link-content-visited',
    'dropdown-menu-external-item-icon-visited-fill-color': 'color-link-content-visited',
    'dropdown-menu-external-item-visited-text-color': 'color-link-content-visited',
    'dropdown-menu-external-item-visited-fill-color': 'color-link-content-visited',
    'dropdown-menu-external-item-disabled-text-color': 'color-content-disabled',
    'dropdown-menu-external-item-disabled-fill-color': 'color-content-disabled',
    'dropdown-menu-group-border-color': 'color-border',
};
