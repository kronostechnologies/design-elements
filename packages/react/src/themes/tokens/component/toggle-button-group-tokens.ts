import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToggleButtonGroupTokens =
    | 'toggle-button-background-color'
    | 'toggle-button-selected-background-color'
    | 'toggle-button-hover-background-color'
    | 'toggle-button-disabled-background-color'
    | 'toggle-button-border-color'
    | 'toggle-button-selected-border-color'
    | 'toggle-button-hover-border-color'
    | 'toggle-button-disabled-border-color'
    | 'toggle-button-text-color'
    | 'toggle-button-selected-text-color'
    | 'toggle-button-hover-text-color'
    | 'toggle-button-disabled-text-color';

export type ToggleButtonGroupTokenValue = AliasTokens | RefTokens;

export type ToggleButtonGroupTokenMap = {
    [Token in ToggleButtonGroupTokens]: ToggleButtonGroupTokenValue;
};

export const defaultToggleButtonGroupTokens: ToggleButtonGroupTokenMap = {
    'toggle-button-background-color': 'color-input-bg',
    'toggle-button-border-color': 'color-input-border',
    'toggle-button-text-color': 'color-input-content',

    'toggle-button-hover-background-color': 'color-input-bg-hover',
    'toggle-button-hover-border-color': 'color-input-border-hover',
    'toggle-button-hover-text-color': 'color-input-content-hover',

    'toggle-button-disabled-background-color': 'color-input-bg-disabled',
    'toggle-button-disabled-border-color': 'color-input-border-disabled',
    'toggle-button-disabled-text-color': 'color-input-content-disabled',

    'toggle-button-selected-background-color': 'color-input-bg-selected',
    'toggle-button-selected-border-color': 'color-input-border-selected',
    'toggle-button-selected-text-color': 'color-input-content-selected',
};
