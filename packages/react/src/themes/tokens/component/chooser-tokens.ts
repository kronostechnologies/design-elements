import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ChooserTokens =
    | 'chooser-background-color'
    | 'chooser-border-color'
    | 'chooser-text-color'
    | 'chooser-disabled-background-color'
    | 'chooser-disabled-border-color'
    | 'chooser-disabled-text-color'
    | 'chooser-hover-background-color'
    | 'chooser-hover-border-color'
    | 'chooser-hover-text-color'
    | 'chooser-selected-text-color'
    | 'chooser-selected-background-color'
    | 'chooser-selected-border-color';

export type ChooserTokenValue = AliasTokens | RefTokens;

export type ChooserTokenMap = {
    [Token in ChooserTokens]: ChooserTokenValue;
};

export const defaultChooserTokens: ChooserTokenMap = {
    'chooser-selected-background-color': 'color-brand-05',
    'chooser-selected-border-color': 'color-brand-50',
    'chooser-selected-text-color': 'color-brand-70',
    'chooser-text-color': 'color-neutral-65',
    'chooser-background-color': 'color-white',
    'chooser-border-color': 'color-neutral-65',
    'chooser-disabled-background-color': 'color-neutral-05',
    'chooser-disabled-border-color': 'color-neutral-30',
    'chooser-disabled-text-color': 'color-neutral-30',
    'chooser-hover-background-color': 'color-neutral-15',
    'chooser-hover-border-color': 'color-neutral-90',
    'chooser-hover-text-color': 'color-neutral-90',
};
