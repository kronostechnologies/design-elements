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
    | 'listbox-item-disabled-background-color'
    | 'listbox-item-focus-outline-color'
    | 'listbox-item-disabled-focus-outline-color'
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

    'listbox-box-shadow-frame-color': 'color-neutral-15',
    'listbox-box-shadow-depth-color': 'transparent-20',

    'listbox-item-disabled-focus-outline-color': 'transparent-100',
    'listbox-item-focus-outline-color': 'color-brand-50',
};
