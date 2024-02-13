import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ComboboxTokens =
    | 'combobox-background-color'
    | 'combobox-disabled-background-color'
    | 'combobox-border-color'
    | 'combobox-disabled-border-color'
    | 'combobox-invalid-border-color'
    | 'combobox-disabled-text-color'
    | 'combobox-arrow-button-background-color'
    | 'combobox-arrow-button-hover-background-color'
    | 'combobox-arrow-button-icon-color'
    | 'combobox-arrow-button-disabled-icon-color';

export type ComboboxTokenValue = AliasTokens | RefTokens;

export type ComboboxTokenMap = {
    [Token in ComboboxTokens]: ComboboxTokenValue;
};

export const defaultComboboxTokens: ComboboxTokenMap = {
    'combobox-arrow-button-background-color': 'transparent-100',
    'combobox-arrow-button-hover-background-color': 'transparent-100',
    'combobox-arrow-button-disabled-icon-color': 'color-neutral-30',
    'combobox-arrow-button-icon-color': 'color-neutral-65',
    'combobox-border-color': 'color-neutral-65',
    'combobox-disabled-background-color': 'color-neutral-05',
    'combobox-disabled-border-color': 'color-neutral-30',
    'combobox-disabled-text-color': 'color-neutral-30',
    'combobox-invalid-border-color': 'color-alert-50',
    'combobox-background-color': 'color-white',
};
