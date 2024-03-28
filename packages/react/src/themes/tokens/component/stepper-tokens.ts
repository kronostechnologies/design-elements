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
    'stepper-button-border-color': 'color-input-border',
    'stepper-button-disabled-background-color': 'color-input-bg-disabled',
    'stepper-button-disabled-border-color': 'color-input-border-disabled',
    'stepper-button-disabled-text-color': 'color-input-content-disabled',
    'stepper-button-hover-background-color': 'color-input-bg-hover',
    'stepper-button-text-color': 'color-input-content',
    'stepper-button-background-color': 'color-input-bg',
};
