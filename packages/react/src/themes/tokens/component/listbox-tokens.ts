import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ListboxTokens =
    | 'listbox-background-color'
    | 'listbox-border-color'
    | 'listbox-box-shadow-frame-color'
    | 'listbox-box-shadow-depth-color'
    | 'listbox-item-text-color'
    | 'listbox-item-disabled-text-color'
    | 'listbox-item-hover-background-color'
    | 'listbox-item-hover-disabled-background-color'
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
    'listbox-item-text-color': 'color-black',
    'listbox-item-caption-text-color': 'color-neutral-65',
    'listbox-item-hover-background-color': 'color-neutral-15',

    'listbox-item-disabled-background-color': 'color-white',
    'listbox-item-disabled-text-color': 'color-neutral-30',
    'listbox-item-caption-disabled-text-color': 'color-neutral-15',
    'listbox-item-caption-text-color': 'color-neutral-65',
    'listbox-item-hover-background-color': 'color-neutral-15',
    'listbox-item-hover-disabled-background-color': 'color-white',
    'listbox-item-selected-background-color': 'color-brand-50',
    'listbox-item-selected-border-color': 'color-brand-50',
    'listbox-item-selected-icon-color': 'color-white',
};
