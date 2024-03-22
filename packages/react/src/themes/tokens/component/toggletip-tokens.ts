import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToggleTipTokens =
    | 'toggletip-popper-container-background-color'
    | 'toggletip-popper-container-border-color'
    | 'toggletip-popper-container-text-color';

export type ToggleTipTokenValue = AliasTokens | RefTokens;

export type ToggleTipTokenMap = {
    [Token in ToggleTipTokens]: ToggleTipTokenValue;
};

export const defaultToggleTipTokens: ToggleTipTokenMap = {
    'toggletip-popper-container-background-color': 'color-bg-fill',
    'toggletip-popper-container-border-color': 'color-overlay-border',
    'toggletip-popper-container-text-color': 'color-text',
};
