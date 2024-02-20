import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type RadioCardTokens =
    | 'radio-card-background-color'
    | 'radio-card-border-color'
    | 'radio-card-text-color'
    | 'radio-card-checked-background-color'
    | 'radio-card-checked-border-color'
    | 'radio-card-hover-background-color'
    | 'radio-card-hover-border-color'
    | 'radio-card-hover-text-color'
    | 'radio-card-disabled-background-color'
    | 'radio-card-disabled-border-color'
    | 'radio-card-disabled-text-color'
    | 'radio-card-hidden-input-checked-background-color'
    | 'radio-card-hidden-input-checked-border-color';

export type RadioCardTokenValue = AliasTokens | RefTokens;

export type RadioCardTokenMap = {
    [Token in RadioCardTokens]: RadioCardTokenValue;
};

export const defaultRadioCardTokens: RadioCardTokenMap = {
    'radio-card-hidden-input-checked-background-color': 'color-brand-50',
    'radio-card-hidden-input-checked-border-color': 'color-brand-50',
    'radio-card-border-color': 'color-black',
    'radio-card-checked-background-color': 'color-brand-05',
    'radio-card-checked-border-color': 'color-brand-50',
    'radio-card-disabled-background-color': 'color-neutral-05',
    'radio-card-disabled-border-color': 'color-neutral-15',
    'radio-card-disabled-text-color': 'color-neutral-30',
    'radio-card-hover-background-color': 'color-neutral-15',
    'radio-card-hover-border-color': 'color-black',
    'radio-card-hover-text-color': 'color-black',
    'radio-card-text-color': 'color-black',
    'radio-card-background-color': 'color-white',
};
