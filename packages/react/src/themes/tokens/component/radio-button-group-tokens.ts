import type { ComponentTokenMap } from '../tokens';

export type RadioButtonGroupToken =
    | 'radio-button-group-legend-text-color'
    | 'radio-button-background-color'
    | 'radio-button-border-color'
    | 'radio-button-checked-border-color'
    | 'radio-button-checked-background-color'
    | 'radio-button-disabled-background-color'
    | 'radio-button-disabled-border-color'
    | 'radio-button-hover-border-color'
    | 'radio-button-disabled-hover-border-color'
    | 'radio-button-disabled-label-color'
    | 'radio-button-checked-dot-color'
    | 'radio-button-disabled-checked-dot-color';

export const defaultRadioButtonGroupTokens: ComponentTokenMap<RadioButtonGroupToken> = {
    'radio-button-background-color': 'color-control-background',
    'radio-button-border-color': 'color-control-border',
    'radio-button-group-legend-text-color': 'color-content',
    'radio-button-hover-border-color': 'color-control-border-hover',
    'radio-button-disabled-background-color': 'color-control-background-disabled',
    'radio-button-disabled-border-color': 'color-control-border-disabled',
    'radio-button-disabled-hover-border-color': 'color-control-border-disabled',
    'radio-button-disabled-label-color': 'color-content-disabled',
    'radio-button-checked-background-color': 'color-control-background-checked',
    'radio-button-checked-border-color': 'color-control-border-checked',
    'radio-button-checked-dot-color': 'color-control-background-checked',
    'radio-button-disabled-checked-dot-color': 'color-control-auxiliary-disabled',
};
