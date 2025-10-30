import type { ComponentTokenMap } from '../tokens';

export type ComboboxToken =
    | 'combobox-arrow-button-background-color'
    | 'combobox-arrow-button-disabled-icon-color'
    | 'combobox-arrow-button-hover-background-color'
    | 'combobox-arrow-button-icon-color'
    | 'combobox-background-color'
    | 'combobox-border-color'
    | 'combobox-clear-button-border-right-color'
    | 'combobox-clear-button-disabled-icon-color'
    | 'combobox-clear-button-icon-color'
    | 'combobox-disabled-background-color'
    | 'combobox-disabled-border-color'
    | 'combobox-disabled-text-color'
    | 'combobox-error-border-color'
    | 'combobox-placeholder-text-color'
    | 'combobox-readonly-background-color'
    | 'combobox-readonly-border-color'
    | 'combobox-readonly-text-color'
    | 'combobox-text-color';

export const defaultComboboxTokens: ComponentTokenMap<ComboboxToken> = {
    'combobox-arrow-button-background-color': 'transparent-100',
    'combobox-arrow-button-disabled-icon-color': 'color-control-auxiliary-disabled',
    'combobox-arrow-button-hover-background-color': 'transparent-100',
    'combobox-arrow-button-icon-color': 'color-control-auxiliary',
    'combobox-background-color': 'color-control-background',
    'combobox-border-color': 'color-control-border',
    'combobox-clear-button-border-right-color': 'color-control-auxiliary',
    'combobox-clear-button-disabled-icon-color': 'color-control-auxiliary-disabled',
    'combobox-clear-button-icon-color': 'color-control-auxiliary',
    'combobox-disabled-background-color': 'color-control-background-disabled',
    'combobox-disabled-border-color': 'color-control-border-disabled',
    'combobox-disabled-text-color': 'color-control-auxiliary-disabled',
    'combobox-error-border-color': 'color-control-border-error',
    'combobox-placeholder-text-color': 'color-control-auxiliary',
    'combobox-readonly-background-color': 'color-control-background-readonly',
    'combobox-readonly-border-color': 'color-control-border-readonly',
    'combobox-readonly-text-color': 'color-control-value-readonly',
    'combobox-text-color': 'color-control-value',
};
