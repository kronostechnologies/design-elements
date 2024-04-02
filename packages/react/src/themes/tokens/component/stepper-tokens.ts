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
    'stepper-button-border-color': 'color-neutral-65',
    'stepper-button-disabled-background-color': 'color-neutral-05',
    'stepper-button-disabled-border-color': 'color-neutral-15',
    'stepper-button-disabled-text-color': 'color-neutral-30',
    'stepper-button-hover-background-color': 'color-neutral-15',
    'stepper-button-text-color': 'color-neutral-65',
    'stepper-button-background-color': 'color-white',
};
