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
    'radio-button-background-color': 'color-control-background',
    'radio-button-border-color': 'color-control-border',
    'radio-button-group-legend-text-color': 'color-content',
    'radio-button-hover-border-color': 'color-control-border-hover',

    'radio-button-disabled-background-color': 'color-control-background-disabled',
    'radio-button-disabled-border-color': 'color-control-border-disabled',
    'radio-button-disabled-hover-border-color': 'color-control-border-disabled',

    'radio-button-checked-background-color': 'color-control-background-checked',
    'radio-button-checked-border-color': 'color-control-border-checked',
};
