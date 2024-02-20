import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToggleButtonGroupTokens =
    | 'toggle-button-background-color'
    | 'toggle-button-pressed-background-color'
    | 'toggle-button-hover-background-color'
    | 'toggle-button-disabled-background-color'
    | 'toggle-button-border-color'
    | 'toggle-button-pressed-border-color'
    | 'toggle-button-hover-border-color'
    | 'toggle-button-disabled-border-color'
    | 'toggle-button-text-color'
    | 'toggle-button-pressed-text-color'
    | 'toggle-button-hover-text-color'
    | 'toggle-button-disabled-text-color';

export type ToggleButtonGroupTokenValue = AliasTokens | RefTokens;

export type ToggleButtonGroupTokenMap = {
    [Token in ToggleButtonGroupTokens]: ToggleButtonGroupTokenValue;
};

export const defaultToggleButtonGroupTokens: ToggleButtonGroupTokenMap = {
    'toggle-button-disabled-background-color': 'color-white',
    'toggle-button-disabled-border-color': 'color-neutral-30',
    'toggle-button-disabled-text-color': 'color-neutral-30',
    'toggle-button-border-color': 'color-neutral-50',
    'toggle-button-hover-background-color': 'color-neutral-15',
    'toggle-button-hover-border-color': 'color-neutral-65',
    'toggle-button-hover-text-color': 'color-black',
    'toggle-button-pressed-background-color': 'color-brand-05',
    'toggle-button-pressed-border-color': 'color-brand-80',
    'toggle-button-pressed-text-color': 'color-brand-80',
    'toggle-button-text-color': 'color-neutral-65',
    'toggle-button-background-color': 'color-white',
};
