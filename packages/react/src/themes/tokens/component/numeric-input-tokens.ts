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
    'numeric-input-background-color': 'color-input-bg',
    'numeric-input-border-color': 'color-input-border',
    'numeric-input-error-border-color': 'color-input-border-error',

    'numeric-input-disabled-adornment-text-color': 'color-input-content-disabled',
    'numeric-input-disabled-background-color': 'color-input-bg-disabled',
    'numeric-input-disabled-border-color': 'color-input-border-disabled',
};
