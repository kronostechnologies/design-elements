import type { ComponentTokenMap } from '../tokens';

export type ToggleSwitchToken =
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

export const defaultToggleSwitchTokens: ComponentTokenMap<ToggleSwitchToken> = {
    'toggle-switch-background-color': 'color-background-neutral-bold',
    'toggle-switch-border-color': 'color-background-neutral-bold',
    'toggle-switch-toggled-background-color': 'color-feedback-background-success-bold',
    'toggle-switch-toggled-border-color': 'color-feedback-background-success-bold',
    'toggle-switch-disabled-background-color': 'color-background-neutral-bold-disabled',
    'toggle-switch-disabled-border-color': 'color-background-neutral-bold-disabled',
    'toggle-switch-disabled-toggled-background-color': 'color-feedback-background-success-bold-disabled',
    'toggle-switch-disabled-toggled-border-color': 'color-feedback-background-success-bold-disabled',
    'toggle-switch-label-text-color': 'color-content',
    'toggle-switch-knob-background-color': 'color-control-background',
};
