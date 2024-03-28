import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ListboxTokens =
    | 'listbox-background-color'
    | 'listbox-border-color'
    | 'listbox-box-shadow-frame-color'
    | 'listbox-box-shadow-depth-color'
    | 'listbox-checkbox-background-color'
    | 'listbox-checkbox-disabled-background-color'
    | 'listbox-checkbox-border-color'
    | 'listbox-checkbox-disabled-border-color'
    | 'listbox-checkbox-hover-border-color'
    | 'listbox-checkbox-disabled-hover-border-color'
    | 'listbox-checkbox-checked-background-color'
    | 'listbox-checkbox-checked-border-color'
    | 'listbox-checkbox-checked-icon-color'
    | 'listbox-item-text-color'
    | 'listbox-item-disabled-text-color'
    | 'listbox-item-hover-background-color'
    | 'listbox-item-hover-disabled-background-color'
    | 'listbox-item-focus-outline-color'
    | 'listbox-item-disabled-focus-outline-color'
    | 'listbox-item-caption-text-color'
    | 'listbox-item-caption-disabled-text-color';

export type ListboxTokenValue = AliasTokens | RefTokens;

export type ListboxTokenMap = {
    [Token in ListboxTokens]: ListboxTokenValue;
};

export const defaultListboxTokens: ListboxTokenMap = {
    'listbox-background-color': 'color-menu-bg',
    'listbox-border-color': 'color-menu-border',

    'listbox-item-text-color': 'color-menu-item-content',
    'listbox-item-caption-text-color': 'color-menu-item-subcontent',
    'listbox-item-hover-background-color': 'color-menu-item-bg-hover',

    'listbox-item-hover-disabled-background-color': 'color-menu-item-bg',
    'listbox-item-disabled-text-color': 'color-menu-item-content-disabled',
    'listbox-item-caption-disabled-text-color': 'color-menu-item-content-disabled',

    'listbox-checkbox-background-color': 'color-input-bg',
    'listbox-checkbox-border-color': 'color-input-border',
    'listbox-checkbox-hover-border-color': 'color-input-border-hover',
    'listbox-checkbox-checked-background-color': 'color-input-bg-checked',
    'listbox-checkbox-checked-border-color': 'color-input-border-checked',
    'listbox-checkbox-checked-icon-color': 'color-input-content-checked',
    'listbox-checkbox-disabled-background-color': 'color-input-bg-disabled',
    'listbox-checkbox-disabled-border-color': 'color-input-border-disabled',
    'listbox-checkbox-disabled-hover-border-color': 'color-input-border-disabled',

    'listbox-box-shadow-frame-color': 'color-neutral-15',
    'listbox-box-shadow-depth-color': 'color-box-shadow',

    'listbox-item-disabled-focus-outline-color': 'transparent-100',
    'listbox-item-focus-outline-color': 'color-brand-50',
};
