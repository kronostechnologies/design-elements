import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToggleSwitchTokens =
    | 'toggle-switch-label-text-color'
    | 'toggle-switch-knob-background-color'
    | 'toggle-switch-toggled-background-color'
    | 'toggle-switch-toggled-border-color'
    | 'toggle-switch-background-color'
    | 'toggle-switch-border-color'
    | 'toggle-switch-disabled-toggled-background-color'
    | 'toggle-switch-disabled-toggled-border-color'
    | 'toggle-switch-disabled-background-color'
    | 'toggle-switch-disabled-border-color';

export type ToggleSwitchTokenValue = AliasTokens | RefTokens;

export type ToggleSwitchTokenMap = {
    [Token in ToggleSwitchTokens]: ToggleSwitchTokenValue;
};

export const defaultToggleSwitchTokens: ToggleSwitchTokenMap = {
    'toggle-switch-background-color': 'color-neutral-50',
    'toggle-switch-border-color': 'color-neutral-50', // same color as bg
    'toggle-switch-disabled-background-color': 'color-neutral-15',
    'toggle-switch-disabled-border-color': 'color-neutral-15', // same color as bg
    'toggle-switch-disabled-toggled-background-color': 'color-success-20',
    'toggle-switch-disabled-toggled-border-color': 'color-success-20', // same color as bg
    'toggle-switch-toggled-background-color': 'color-feedback-bg-success-bold',
    'toggle-switch-toggled-border-color': 'color-feedback-bg-success-bold', // same color as bg
    'toggle-switch-knob-background-color': 'color-input-bg', // was color-white
    'toggle-switch-label-text-color': 'color-content',
};
