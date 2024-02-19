import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type StepperInputTokens =
    | 'stepper-input-buttons-background-color'
    | 'stepper-input-buttons-border-color'
    | 'stepper-input-buttons-text-color'
    | 'stepper-input-buttons-hover-background-color'
    | 'stepper-input-buttons-disabled-background-color'
    | 'stepper-input-buttons-disabled-border-color'
    | 'stepper-input-buttons-disabled-text-color';

export type StepperInputTokenValue = AliasTokens | RefTokens;

export type StepperInputTokenMap = {
    [Token in StepperInputTokens]: StepperInputTokenValue;
};

export const defaultStepperInputTokens: StepperInputTokenMap = {
    'stepper-input-buttons-border-color': 'color-neutral-65',
    'stepper-input-buttons-disabled-background-color': 'color-neutral-05',
    'stepper-input-buttons-disabled-border-color': 'color-neutral-15',
    'stepper-input-buttons-disabled-text-color': 'color-neutral-30',
    'stepper-input-buttons-hover-background-color': 'color-neutral-15',
    'stepper-input-buttons-text-color': 'color-neutral-65',
    'stepper-input-buttons-background-color': 'color-white',
};
