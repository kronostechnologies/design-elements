import type { ComponentTokenMap } from '../tokens';

export type TextInputToken =
    | 'text-input-background-color'
    | 'text-input-border-color'
    | 'text-input-error-border-color'
    | 'text-input-text-color'
    | 'text-input-placeholder-text-color'
    | 'text-input-disabled-background-color'
    | 'text-input-disabled-border-color'
    | 'text-input-disabled-text-color'
    | 'text-input-placeholder-disabled-text-color'
    | 'text-input-disabled-adornment-text-color'
    | 'text-input-adornment-color'
    | 'text-input-readonly-background-color'
    | 'text-input-readonly-border-color'
    | 'text-input-readonly-text-color'
    | 'text-input-disabled-adornment-color'
    | 'text-input-readonly-adornment-color';

export const defaultTextInputTokens: ComponentTokenMap<TextInputToken> = {
    'text-input-background-color': 'color-control-background',
    'text-input-disabled-background-color': 'color-control-background-disabled',
    'text-input-readonly-background-color': 'color-control-background-readonly',

    'text-input-border-color': 'color-control-border',
    'text-input-disabled-border-color': 'color-control-border-disabled',
    'text-input-readonly-border-color': 'color-control-border-readonly',

    'text-input-error-border-color': 'color-control-border-error',
    'text-input-text-color': 'color-control-value',
    'text-input-disabled-text-color': 'color-control-value-disabled',
    'text-input-readonly-text-color': 'color-control-value-readonly',

    'text-input-placeholder-text-color': 'color-control-auxiliary',
    'text-input-placeholder-disabled-text-color': 'color-control-auxiliary-disabled',

    'text-input-adornment-color': 'color-control-auxiliary',
    'text-input-disabled-adornment-color': 'color-control-auxiliary-disabled',
    'text-input-readonly-adornment-color': 'color-control-auxiliary-readonly',
};
