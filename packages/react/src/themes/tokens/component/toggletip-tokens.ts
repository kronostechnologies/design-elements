import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToggleTipTokens =
    | 'toggletip-background-color'
    | 'toggletip-border-color'
    | 'toggletip-color'
    | 'toggletip-arrow-bottom-before-border-color'
    | 'toggletip-arrow-bottom-after-border-color'
    | 'toggletip-arrow-top-before-border-color'
    | 'toggletip-arrow-top-after-border-color'
    | 'toggletip-arrow-right-before-border-color'
    | 'toggletip-arrow-right-after-border-color'
    | 'toggletip-arrow-left-before-border-color'
    | 'toggletip-arrow-left-after-border-color';

export type ToggleTipTokenValue = AliasTokens | RefTokens;

export type ToggleTipTokenMap = {
    [Token in ToggleTipTokens]: ToggleTipTokenValue;
};

export const defaultToggleTipTokens: ToggleTipTokenMap = {
    'toggletip-background-color': 'color-white',
    'toggletip-border-color': 'color-neutral-65',
    'toggletip-color': 'color-black',
    'toggletip-arrow-bottom-before-border-color': 'color-neutral-65',
    'toggletip-arrow-bottom-after-border-color': 'color-white',
    'toggletip-arrow-top-before-border-color': 'color-neutral-65',
    'toggletip-arrow-top-after-border-color': 'color-white',
    'toggletip-arrow-right-before-border-color': 'color-neutral-65',
    'toggletip-arrow-right-after-border-color': 'color-white',
    'toggletip-arrow-left-before-border-color': 'color-neutral-65',
    'toggletip-arrow-left-after-border-color': 'color-white',
};
