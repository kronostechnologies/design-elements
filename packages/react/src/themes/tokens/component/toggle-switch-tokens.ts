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
    'toggle-switch-background-color': 'color-bg-neutral-bold',
    'toggle-switch-border-color': 'color-bg-neutral-bold',
    'toggle-switch-toggled-background-color': 'color-feedback-bg-success-bold',
    'toggle-switch-toggled-border-color': 'color-feedback-bg-success-bold',
    'toggle-switch-disabled-background-color': 'color-bg-neutral-bold-disabled',
    'toggle-switch-disabled-border-color': 'color-bg-neutral-bold-disabled',
    'toggle-switch-disabled-toggled-background-color': 'color-feedback-bg-success-bold-disabled',
    'toggle-switch-disabled-toggled-border-color': 'color-feedback-bg-success-bold-disabled',
    'toggle-switch-knob-background-color': 'color-input-bg',
    'toggle-switch-label-text-color': 'color-content',
};
