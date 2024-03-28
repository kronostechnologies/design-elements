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
    | 'radio-card-button-checked-background-color'
    | 'radio-card-button-checked-border-color';

export type RadioCardTokenValue = AliasTokens | RefTokens;

export type RadioCardTokenMap = {
    [Token in RadioCardTokens]: RadioCardTokenValue;
};

export const defaultRadioCardTokens: RadioCardTokenMap = {
    'radio-card-checked-background-color': 'color-brand-05', // 'color-input-bg-selected'
    'radio-card-checked-border-color': 'color-brand-50', // 'color-input-border-selected'
    'radio-card-button-checked-background-color': 'color-brand-50', // 'color-input-bg-checked'
    'radio-card-button-checked-border-color': 'color-brand-50', // 'color-input-bg-checked'
    'radio-card-border-color': 'color-black', // 'color-input-border'
    'radio-card-disabled-background-color': 'color-neutral-05', // 'color-input-bg-disabled'
    'radio-card-disabled-border-color': 'color-neutral-15', // 'color-input-border-disabled'
    'radio-card-disabled-text-color': 'color-neutral-30', // 'color-input-content-disabled'
    'radio-card-hover-background-color': 'color-neutral-15', // 'color-input-bg-hover'
    'radio-card-hover-border-color': 'color-black', // 'color-input-border-hover'
    'radio-card-hover-text-color': 'color-black', // 'color-content' FIX BOLD TEXT TITLE WHEN SELECTED
    'radio-card-text-color': 'color-black', // 'color-content'
    'radio-card-background-color': 'color-white', // 'color-input-bg'
};
