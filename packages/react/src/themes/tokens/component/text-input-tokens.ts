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
    'text-input-background-color': 'color-control-background',
    'text-input-disabled-background-color': 'color-control-background-disabled',

    'text-input-border-color': 'color-control-border',
    'text-input-disabled-border-color': 'color-control-border-disabled',

    'text-input-error-border-color': 'color-control-border-error',

    'text-input-text-color': 'color-control-value',
    'text-input-disabled-text-color': 'color-control-value-disabled',

    'text-input-placeholder-text-color': 'color-control-auxiliary',
    'text-input-placeholder-disabled-text-color': 'color-control-auxiliary-disabled',
};
