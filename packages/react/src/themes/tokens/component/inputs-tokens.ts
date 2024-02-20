import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type InputsTokens =
    | 'inputs-background-color'
    | 'inputs-border-color'
    | 'inputs-text-color'
    | 'inputs-placeholder-text-color'
    | 'inputs-disabled-background-color'
    | 'inputs-disabled-border-color'
    | 'inputs-disabled-text-color'
    | 'inputs-disabled-placeholder-text-color';

export type InputsTokenValue = AliasTokens | RefTokens;

export type InputsTokenMap = {
    [Token in InputsTokens]: InputsTokenValue;
};

export const defaultInputsTokens: InputsTokenMap = {
    'inputs-background-color': 'color-white',
    'inputs-border-color': 'color-neutral-65',
    'inputs-text-color': 'color-black',
    'inputs-placeholder-text-color': 'color-neutral-65',
    'inputs-disabled-background-color': 'color-neutral-05',
    'inputs-disabled-border-color': 'color-neutral-15',
    'inputs-disabled-text-color': 'color-neutral-15',
    'inputs-disabled-placeholder-text-color': 'color-neutral-30',
};
