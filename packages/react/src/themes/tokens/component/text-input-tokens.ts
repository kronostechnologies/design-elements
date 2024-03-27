import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TextInputTokens =
    | 'text-input-background-color'
    | 'text-input-border-color'
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
    'text-input-background-color': 'color-white',
    'text-input-border-color': 'color-neutral-65',
    'text-input-text-color': 'color-black',
    'text-input-placeholder-text-color': 'color-neutral-65',
    'text-input-disabled-background-color': 'color-neutral-05',
    'text-input-disabled-border-color': 'color-neutral-15',
    'text-input-disabled-text-color': 'color-neutral-15',
    'text-input-placeholder-disabled-text-color': 'color-neutral-30',
};
