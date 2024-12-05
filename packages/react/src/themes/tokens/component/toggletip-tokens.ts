import type { ComponentTokenMap } from '../tokens';

export type ToggleTipToken =
    | 'toggletip-popper-container-background-color'
    | 'toggletip-popper-container-border-color'
    | 'toggletip-popper-container-text-color';

export const defaultToggleTipTokens: ComponentTokenMap<ToggleTipToken> = {
    'toggletip-popper-container-background-color': 'color-background-overlay',
    'toggletip-popper-container-border-color': 'color-border-overlay',
    'toggletip-popper-container-text-color': 'color-content',
};
