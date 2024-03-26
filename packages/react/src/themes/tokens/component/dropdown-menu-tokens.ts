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
    'dropdown-menu-text-color': 'color-text',
    'dropdown-menu-list-item-text-color': 'color-text',
    'dropdown-menu-item-content-icon-background-color': 'color-bg-alternate-subtle',
    'dropdown-menu-item-content-icon-border-color': 'color-border',
    'dropdown-menu-item-content-description-text-color': 'color-text-alternate',
    'dropdown-menu-nav-item-text-color': 'color-text',
    'dropdown-menu-nav-item-hover-background-color': 'color-bg-hover',
    'dropdown-menu-nav-item-hover-disabled-background-color': 'transparent-100',
    'dropdown-menu-nav-item-disabled-text-color': 'color-text-disabled',
    'dropdown-menu-nav-item-disabled-icon-color': 'color-icon-disabled',
    'dropdown-menu-nav-item-external-link-icon-color': 'color-icon',
    'dropdown-menu-nav-item-external-link-text-color': 'color-text',
    'dropdown-menu-external-item-text-color': 'color-text',
    'dropdown-menu-external-item-hover-background-color': 'color-bg-hover',
    'dropdown-menu-external-item-icon-visited-text-color': 'color-link-text-visited',
    'dropdown-menu-external-item-icon-visited-fill-color': 'color-link-icon-visited',
    'dropdown-menu-external-item-visited-text-color': 'color-link-text-visited',
    'dropdown-menu-external-item-visited-fill-color': 'color-link-icon-visited',
    'dropdown-menu-external-item-disabled-text-color': 'color-text-disabled',
    'dropdown-menu-external-item-disabled-fill-color': 'color-icon-disabled',
    'dropdown-menu-group-border-color': 'color-border',
};
