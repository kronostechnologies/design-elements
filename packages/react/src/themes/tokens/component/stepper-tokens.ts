import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type StepperTokens =
    | 'stepper-button-background-color'
    | 'stepper-button-border-color'
    | 'stepper-button-text-color'
    | 'stepper-button-hover-background-color'
    | 'stepper-button-disabled-background-color'
    | 'stepper-button-disabled-border-color'
    | 'stepper-button-disabled-text-color';

export type StepperTokenValue = AliasTokens | RefTokens;

export type StepperTokenMap = {
    [Token in StepperTokens]: StepperTokenValue;
};

export const defaultStepperTokens: StepperTokenMap = {
    'stepper-button-background-color': 'color-control-background',
    'stepper-button-border-color': 'color-control-border',
    'stepper-button-text-color': 'color-control-auxiliary',
    'stepper-button-hover-background-color': 'color-control-background-hover',
    'stepper-button-disabled-background-color': 'color-control-background-disabled',
    'stepper-button-disabled-border-color': 'color-control-border-disabled',
    'stepper-button-disabled-text-color': 'color-control-auxiliary-disabled',
};
