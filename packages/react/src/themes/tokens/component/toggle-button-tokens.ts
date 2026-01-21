import type { ComponentTokenMap } from '../tokens';

export type ToggleButtonToken =
    | 'toggle-button-background-color'
    | 'toggle-button-border-color'
    | 'toggle-button-text-color'
    | 'toggle-button-hover-background-color'
    | 'toggle-button-hover-text-color'
    | 'toggle-button-disabled-background-color'
    | 'toggle-button-disabled-text-color'
    | 'toggle-button-pressed-background-color'
    | 'toggle-button-pressed-text-color'
    | 'toggle-button-pressed-hover-background-color'
    | 'toggle-button-pressed-hover-text-color';

export const defaultToggleButtonTokens: ComponentTokenMap<ToggleButtonToken> = {
    'toggle-button-background-color': 'transparent-100',
    'toggle-button-border-color': 'transparent-100',
    'toggle-button-text-color': 'color-control-auxiliary',
    'toggle-button-hover-background-color': 'color-control-background-hover',
    'toggle-button-hover-text-color': 'color-control-auxiliary-hover',
    'toggle-button-disabled-background-color': 'color-control-background-disabled',
    'toggle-button-disabled-text-color': 'color-control-auxiliary-disabled',
    'toggle-button-pressed-background-color': 'color-control-background-selected',
    'toggle-button-pressed-text-color': 'color-control-auxiliary-selected',
    'toggle-button-pressed-hover-background-color': 'color-control-background-selected-hover',
    'toggle-button-pressed-hover-text-color': 'color-control-auxiliary-selected',
};
