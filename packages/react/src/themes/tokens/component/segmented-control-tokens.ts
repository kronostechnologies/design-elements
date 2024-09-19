import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SegmentedControlTokens =
    | 'segmented-control-list-background-color'
    | 'segmented-control-background-color'
    | 'segmented-control-border-color'
    | 'segmented-control-text-color'
    | 'segmented-control-hover-background-color'
    | 'segmented-control-hover-border-color'
    | 'segmented-control-hover-text-color'
    | 'segmented-control-disabled-background-color'
    | 'segmented-control-disabled-border-color'
    | 'segmented-control-disabled-text-color'
    | 'segmented-control-pressed-background-color'
    | 'segmented-control-pressed-border-color'
    | 'segmented-control-pressed-text-color'
    | 'segmented-control-text-color'
    | 'segmented-control-pressed-hover-background-color'
    | 'segmented-control-pressed-hover-text-color';

export type SegmentedControlTokenValue = AliasTokens | RefTokens;

export type SegmentedControlTokenMap = {
    [Token in SegmentedControlTokens]: SegmentedControlTokenValue;
};

export const defaultSegmentedControlTokens: SegmentedControlTokenMap = {
    'segmented-control-list-background-color': 'transparent-dark-5',

    'segmented-control-background-color': 'transparent-100',
    'segmented-control-border-color': 'transparent-100',
    'segmented-control-text-color': 'color-control-auxiliary',

    'segmented-control-hover-background-color': 'transparent-dark-5',
    'segmented-control-hover-border-color': 'color-control-border-hover',
    'segmented-control-hover-text-color': 'color-control-auxiliary-hover',

    'segmented-control-disabled-background-color': 'color-control-background-disabled',
    'segmented-control-disabled-border-color': 'color-control-border-disabled',
    'segmented-control-disabled-text-color': 'color-control-auxiliary-disabled',

    'segmented-control-pressed-background-color': 'color-control-background-selected',
    'segmented-control-pressed-border-color': 'color-control-border-selected',
    'segmented-control-pressed-text-color': 'color-control-auxiliary-selected',

    'segmented-control-pressed-hover-background-color' : 'color-control-background-selected-hover',
    'segmented-control-pressed-hover-text-color' : 'color-control-auxiliary-selected'
};
