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
    | 'radio-card-disabled-text-color';

export type RadioCardTokenValue = AliasTokens | RefTokens;

export type RadioCardTokenMap = {
    [Token in RadioCardTokens]: RadioCardTokenValue;
};

export const defaultRadioCardTokens: RadioCardTokenMap = {
    'radio-card-background-color': 'color-control-background',
    'radio-card-border-color': 'color-control-border',
    'radio-card-text-color': 'color-content',

    'radio-card-hover-background-color': 'color-control-background-hover',
    'radio-card-hover-border-color': 'color-control-border-hover',
    'radio-card-hover-text-color': 'color-content-hover',

    'radio-card-disabled-background-color': 'color-control-background-disabled',
    'radio-card-disabled-border-color': 'color-control-border-disabled',
    'radio-card-disabled-text-color': 'color-control-content-disabled',

    'radio-card-selected-background-color': 'color-control-background-selected',
    'radio-card-selected-border-color': 'color-control-border-selected',
};
