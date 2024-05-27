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
    'chooser-background-color': 'color-control-background',
    'chooser-border-color': 'color-control-border',
    'chooser-text-color': 'color-control-content',
    'chooser-selected-background-color': 'color-control-background-selected',
    'chooser-selected-border-color': 'color-control-border-selected',
    'chooser-selected-text-color': 'color-control-content-selected',
    'chooser-hover-background-color': 'color-control-background-hover',
    'chooser-hover-border-color': 'color-control-border-hover',
    'chooser-hover-text-color': 'color-control-content-hover',
    'chooser-disabled-background-color': 'color-control-background-disabled',
    'chooser-disabled-border-color': 'color-control-border-disabled',
    'chooser-disabled-text-color': 'color-control-content-disabled',
};
