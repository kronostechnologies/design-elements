import type { ComponentTokenMap } from '../tokens';

export type StepperToken =
    | 'stepper-button-background-color'
    | 'stepper-button-border-color'
    | 'stepper-button-text-color'
    | 'stepper-button-hover-background-color'
    | 'stepper-button-disabled-background-color'
    | 'stepper-button-disabled-border-color'
    | 'stepper-button-disabled-text-color'
    | 'stepper-segment-height'
    | 'stepper-button-size'
    | 'stepper-value-segment-width'
    | 'stepper-icon-size'
    | 'stepper-value-font-size'
    | 'stepper-value-letter-spacing'
    | 'stepper-value-line-height'
    | 'stepper-button-padding'
    | 'stepper-value-padding-inline';

export const defaultStepperTokens: ComponentTokenMap<StepperToken> = {
    'stepper-button-background-color': 'color-control-background',
    'stepper-button-border-color': 'color-control-border',
    'stepper-button-text-color': 'color-control-auxiliary',
    'stepper-button-hover-background-color': 'color-control-background-hover',
    'stepper-button-disabled-background-color': 'color-control-background-disabled',
    'stepper-button-disabled-border-color': 'color-control-border-disabled',
    'stepper-button-disabled-text-color': 'color-control-auxiliary-disabled',
    'stepper-segment-height': 'size-touch-target',
    'stepper-button-size': 'size-touch-target',
    'stepper-value-segment-width': 'size-stepper-value-width',
    'stepper-icon-size': 'size-stepper-icon',
    'stepper-value-font-size': 'text-body-medium-font-size',
    'stepper-value-letter-spacing': 'text-stepper-value-letter-spacing',
    'stepper-value-line-height': 'line-height-600',
    'stepper-button-padding': 'spacing-stepper-button-padding',
    'stepper-value-padding-inline': 'spacing-stepper-value-padding-inline',
};
