import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToggleSwitchTokens =
    | 'toggle-switch-label-text-color'
    | 'toggle-switch-knob-background-color'
    | 'toggle-switch-container-toggled-background-color'
    | 'toggle-switch-container-toggled-border-color'
    | 'toggle-switch-container-background-color'
    | 'toggle-switch-container-border-color'
    | 'toggle-switch-container-disabled-toggled-background-color'
    | 'toggle-switch-container-disabled-toggled-border-color'
    | 'toggle-switch-container-disabled-background-color'
    | 'toggle-switch-container-disabled-border-color';

export type ToggleSwitchTokenValue = AliasTokens | RefTokens;

export type ToggleSwitchTokenMap = {
    [Token in ToggleSwitchTokens]: ToggleSwitchTokenValue;
};

export const defaultToggleSwitchTokens: ToggleSwitchTokenMap = {
    'toggle-switch-container-background-color': 'color-neutral-30',
    'toggle-switch-container-border-color': 'color-neutral-30',
    'toggle-switch-container-disabled-background-color': 'color-neutral-15',
    'toggle-switch-container-disabled-border-color': 'color-neutral-15',
    'toggle-switch-container-disabled-toggled-background-color': 'color-success-20',
    'toggle-switch-container-disabled-toggled-border-color': 'color-success-20',
    'toggle-switch-container-toggled-background-color': 'color-success-50',
    'toggle-switch-container-toggled-border-color': 'color-success-50',
    'toggle-switch-knob-background-color': 'color-white',
    'toggle-switch-label-text-color': 'color-black',
};
