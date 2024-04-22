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
    'radio-card-background-color': 'color-white',
    'radio-card-text-color': 'color-black',
    'radio-card-border-color': 'color-black',

    'radio-card-hover-background-color': 'color-neutral-15',
    'radio-card-hover-border-color': 'color-black',
    'radio-card-hover-text-color': 'color-black',

    'radio-card-disabled-background-color': 'color-neutral-05',
    'radio-card-disabled-border-color': 'color-neutral-15',
    'radio-card-disabled-text-color': 'color-neutral-30',

    'radio-card-selected-background-color': 'color-brand-05',
    'radio-card-selected-border-color': 'color-brand-50',

    'radio-card-button-checked-background-color': 'color-brand-50',
    'radio-card-button-checked-border-color': 'color-brand-50',
};
