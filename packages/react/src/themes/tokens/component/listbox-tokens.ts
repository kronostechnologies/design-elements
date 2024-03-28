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
    | 'listbox-item-focus-outline-color'
    | 'listbox-item-disabled-focus-outline-color'
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
    'listbox-background-color': 'color-white', // 'color-bg-overlay'
    'listbox-border-color': 'color-neutral-50', // 'color-border-overlay'
    'listbox-checkbox-background-color': 'color-white', // 'color-input-bg'
    'listbox-checkbox-disabled-background-color': 'color-neutral-05', // 'color-input-bg-disabled'
    'listbox-checkbox-border-color': 'color-neutral-65', // 'color-input-border'
    'listbox-checkbox-disabled-border-color': 'color-neutral-15', // 'color-input-border-disabled'
    'listbox-checkbox-hover-border-color': 'color-brand-50', // 'color-input-border-hover'
    'listbox-checkbox-disabled-hover-border-color': 'color-neutral-15', // 'color-input-border-hover-disabled'

    'listbox-item-selected-background-color': 'color-brand-50', // 'color-input-bg-checked'??
    'listbox-item-selected-border-color': 'color-brand-50', // 'color-input-bg-checked'??
    'listbox-item-selected-icon-color': 'color-white', // 'color-input-content-checked'??

    'listbox-item-text-color': 'color-black', // 'color-content'
    'listbox-item-disabled-text-color': 'color-neutral-30', // 'color-content-disabled'
    'listbox-item-caption-disabled-text-color': 'color-neutral-15', // 'color-content-disabled-subtle'?
    'listbox-item-caption-text-color': 'color-neutral-65', // 'color-content-subtle'
    'listbox-item-hover-background-color': 'color-neutral-15', // 'color-bg-hover'
    'listbox-item-hover-disabled-background-color': 'color-white', // 'color-bg-disabled'??

    'listbox-box-shadow-frame-color': 'color-neutral-15',
    'listbox-box-shadow-depth-color': 'transparent-20',

    'listbox-item-disabled-focus-outline-color': 'transparent-100',
    'listbox-item-focus-outline-color': 'color-brand-50',
};
