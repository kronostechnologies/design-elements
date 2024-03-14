import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToggleTipTokens =
    | 'toggletip-background-color'
    | 'toggletip-border-color'
    | 'toggletip-text-color';

export type ToggleTipTokenValue = AliasTokens | RefTokens;

export type ToggleTipTokenMap = {
    [Token in ToggleTipTokens]: ToggleTipTokenValue;
};

export const defaultToggleTipTokens: ToggleTipTokenMap = {
    'toggletip-background-color': 'color-white',
    'toggletip-border-color': 'color-neutral-65',
    'toggletip-text-color': 'color-black',
};
