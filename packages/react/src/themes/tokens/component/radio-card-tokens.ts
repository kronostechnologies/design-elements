import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type RadioCardTokens =
    | 'radio-card-background-color'
    | 'radio-card-border-color'
    | 'radio-card-text-color'
    | 'radio-card-selected-background-color'
    | 'radio-card-selected-border-color'
    | 'radio-card-hover-background-color'
    | 'radio-card-hover-border-color'
    | 'radio-card-hover-text-color'
    | 'radio-card-disabled-background-color'
    | 'radio-card-disabled-border-color'
    | 'radio-card-disabled-text-color'
    | 'radio-card-button-checked-background-color'
    | 'radio-card-button-checked-border-color';

export type RadioCardTokenValue = AliasTokens | RefTokens;

export type RadioCardTokenMap = {
    [Token in RadioCardTokens]: RadioCardTokenValue;
};

export const defaultRadioCardTokens: RadioCardTokenMap = {
    'radio-card-background-color': 'color-input-bg',
    'radio-card-border-color': 'color-input-border',
    'radio-card-text-color': 'color-content',
    'radio-card-selected-background-color': 'color-input-bg-selected',
    'radio-card-selected-border-color': 'color-input-border-selected',
    'radio-card-button-checked-background-color': 'color-input-bg-checked',
    'radio-card-button-checked-border-color': 'color-input-bg-checked',
    'radio-card-hover-background-color': 'color-input-bg-hover',
    'radio-card-hover-border-color': 'color-input-border-hover',
    'radio-card-hover-text-color': 'color-content-hover',
    'radio-card-disabled-background-color': 'color-input-bg-disabled',
    'radio-card-disabled-border-color': 'color-input-border-disabled',
    'radio-card-disabled-text-color': 'color-input-content-disabled',
};
