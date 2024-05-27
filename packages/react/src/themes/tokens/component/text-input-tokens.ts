import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TextInputTokens =
    | 'text-input-background-color'
    | 'text-input-border-color'
    | 'text-input-error-border-color'
    | 'text-input-text-color'
    | 'text-input-placeholder-text-color'
    | 'text-input-disabled-background-color'
    | 'text-input-disabled-border-color'
    | 'text-input-disabled-text-color'
    | 'text-input-placeholder-disabled-text-color';

export type TextInputTokenValue = AliasTokens | RefTokens;

export type TextInputTokenMap = {
    [Token in TextInputTokens]: TextInputTokenValue;
};

export const defaultTextInputTokens: TextInputTokenMap = {
    'text-input-background-color': 'color-input-background',
    'text-input-border-color': 'color-input-border',
    'text-input-text-color': 'color-content',
    'text-input-placeholder-text-color': 'color-input-content',

    'text-input-error-border-color': 'color-input-border-error',
    'text-input-disabled-background-color': 'color-input-background-disabled',
    'text-input-disabled-border-color': 'color-input-border-disabled',
    'text-input-disabled-text-color': 'color-input-content-disabled',

    'text-input-placeholder-disabled-text-color': 'color-input-content-disabled',
};
