import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type RadioButtonGroupTokens =
    | 'radio-button-group-legend-text-color'
    | 'radio-button-background-color'
    | 'radio-button-border-color'
    | 'radio-button-checked-border-color'
    | 'radio-button-checked-background-color'
    | 'radio-button-disabled-background-color'
    | 'radio-button-disabled-border-color'
    | 'radio-button-hover-border-color'
    | 'radio-button-disabled-hover-border-color';

export type RadioButtonGroupTokenValue = AliasTokens | RefTokens;

export type RadioButtonGroupTokenMap = {
    [Token in RadioButtonGroupTokens]: RadioButtonGroupTokenValue;
};

export const defaultRadioButtonGroupTokens: RadioButtonGroupTokenMap = {
    'radio-button-background-color': 'color-white', // 'color-input-bg'
    'radio-button-border-color': 'color-neutral-65', // 'color-input-border'
    'radio-button-disabled-background-color': 'color-neutral-05', // 'color-input-bg-disabled'
    'radio-button-disabled-border-color': 'color-neutral-15', // 'color-input-border-disabled'
    'radio-button-hover-border-color': 'color-brand-50', // 'color-input-border-hover'
    'radio-button-disabled-hover-border-color': 'color-neutral-15', // 'color-input-border-disabled'
    'radio-button-checked-background-color': 'color-brand-50', // 'color-input-bg-checked'
    'radio-button-checked-border-color': 'color-brand-50', // 'color-input-bg-checked'
    'radio-button-group-legend-text-color': 'color-black', // 'color-content'
};
