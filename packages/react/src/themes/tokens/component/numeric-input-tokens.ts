import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type NumericInputTokens =
    | 'numeric-input-background-color'
    | 'numeric-input-border-color'
    | 'numeric-input-error-border-color'
    | 'numeric-input-disabled-background-color'
    | 'numeric-input-disabled-border-color'
    | 'numeric-input-disabled-adornment-text-color';

export type NumericInputTokenValue = AliasTokens | RefTokens;

export type NumericInputTokenMap = {
    [Token in NumericInputTokens]: NumericInputTokenValue;
};

export const defaultNumericInputTokens: NumericInputTokenMap = {
    'numeric-input-background-color': 'color-control-background',
    'numeric-input-border-color': 'color-control-border',
    'numeric-input-error-border-color': 'color-control-border-error',

    'numeric-input-disabled-adornment-text-color': 'color-control-content-disabled',
    'numeric-input-disabled-background-color': 'color-control-background-disabled',
    'numeric-input-disabled-border-color': 'color-control-border-disabled',
};
