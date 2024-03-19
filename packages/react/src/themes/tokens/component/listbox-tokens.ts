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
    | 'listbox-item-text-color'
    | 'listbox-item-disabled-text-color'
    | 'listbox-item-hover-background-color'
    | 'listbox-item-hover-disabled-background-color'
    | 'listbox-item-focused-outline-color'
    | 'listbox-item-focused-disabled-outline-color'
    | 'listbox-item-selected-background-color'
    | 'listbox-item-selected-border-color'
    | 'listbox-item-selected-icon-color'
    | 'listbox-item-caption-text-color'
    | 'listbox-item-caption-disabled-text-color';

export type ListboxTokenValue = AliasTokens | RefTokens;

export type ListboxTokenMap = {
    [Token in ListboxTokens]: ListboxTokenValue;
};

export const defaultListboxTokens: ListboxTokenMap = {
    'listbox-background-color': 'color-white',
    'listbox-border-color': 'color-neutral-50',
    'listbox-box-shadow-frame-color': 'color-neutral-15',
    'listbox-box-shadow-depth-color': 'transparent-20',
    'listbox-checkbox-background-color': 'color-white',
    'listbox-checkbox-disabled-background-color': 'color-neutral-05',
    'listbox-checkbox-border-color': 'color-neutral-65',
    'listbox-checkbox-disabled-border-color': 'color-neutral-15',
    'listbox-checkbox-hover-border-color': 'color-brand-50',
    'listbox-checkbox-disabled-hover-border-color': 'color-neutral-15',
    'listbox-item-text-color': 'color-black',
    'listbox-item-disabled-text-color': 'color-neutral-30',
    'listbox-item-caption-disabled-text-color': 'color-neutral-15',
    'listbox-item-caption-text-color': 'color-neutral-65',
    'listbox-item-focused-disabled-outline-color': 'transparent-100',
    'listbox-item-focused-outline-color': 'color-brand-50',
    'listbox-item-hover-background-color': 'color-neutral-15',
    'listbox-item-hover-disabled-background-color': 'color-white',
    'listbox-item-selected-background-color': 'color-brand-50',
    'listbox-item-selected-border-color': 'color-brand-50',
    'listbox-item-selected-icon-color': 'color-white',
};
