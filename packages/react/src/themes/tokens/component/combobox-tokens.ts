import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ComboboxTokens =
    | 'combobox-background-color'
    | 'combobox-disabled-background-color'
    | 'combobox-border-color'
    | 'combobox-disabled-border-color'
    | 'combobox-error-border-color'
    | 'combobox-disabled-text-color'
    | 'combobox-placeholder-text-color'
    | 'combobox-clear-button-icon-color'
    | 'combobox-clear-button-disabled-icon-color'
    | 'combobox-clear-button-border-right-color'
    | 'combobox-arrow-button-background-color'
    | 'combobox-arrow-button-hover-background-color'
    | 'combobox-arrow-button-icon-color'
    | 'combobox-arrow-button-disabled-icon-color';

export type ComboboxTokenValue = AliasTokens | RefTokens;

export type ComboboxTokenMap = {
    [Token in ComboboxTokens]: ComboboxTokenValue;
};

export const defaultComboboxTokens: ComboboxTokenMap = {
    'combobox-clear-button-border-right-color': 'color-input-content',
    'combobox-clear-button-disabled-icon-color': 'color-input-content-disabled',
    'combobox-clear-button-icon-color': 'color-input-content',
    'combobox-arrow-button-background-color': 'transparent-100',
    'combobox-arrow-button-hover-background-color': 'transparent-100',
    'combobox-arrow-button-disabled-icon-color': 'color-input-content-disabled',
    'combobox-arrow-button-icon-color': 'color-input-content',
    'combobox-border-color': 'color-input-border',
    'combobox-disabled-background-color': 'color-input-background-disabled',
    'combobox-disabled-border-color': 'color-input-border-disabled',
    'combobox-disabled-text-color': 'color-input-content-disabled',
    'combobox-error-border-color': 'color-input-border-error',
    'combobox-background-color': 'color-input-background',
    'combobox-placeholder-text-color': 'color-input-content',
};
