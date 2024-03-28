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
    'numeric-input-background-color': 'color-white', // 'color-input-bg'
    'numeric-input-border-color': 'color-neutral-65', // 'color-input-border'
    'numeric-input-disabled-adornment-text-color': 'color-neutral-30', // 'color-input-content-disabled'
    'numeric-input-disabled-background-color': 'color-neutral-05', // 'color-input-bg-disabled'
    'numeric-input-disabled-border-color': 'color-neutral-15', // 'color-input-border-disabled'
    'numeric-input-error-border-color': 'color-alert-50', // 'color-input-border-error'
};
