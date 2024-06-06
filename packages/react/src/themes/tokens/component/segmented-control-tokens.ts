import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SegmentedControlTokens =
    | 'segmented-control-background-color'
    | 'segmented-control-pressed-background-color'
    | 'segmented-control-hover-background-color'
    | 'segmented-control-disabled-background-color'
    | 'segmented-control-border-color'
    | 'segmented-control-pressed-border-color'
    | 'segmented-control-hover-border-color'
    | 'segmented-control-disabled-border-color'
    | 'segmented-control-text-color'
    | 'segmented-control-pressed-text-color'
    | 'segmented-control-hover-text-color'
    | 'segmented-control-disabled-text-color';

export type SegmentedControlTokenValue = AliasTokens | RefTokens;

export type SegmentedControlTokenMap = {
    [Token in SegmentedControlTokens]: SegmentedControlTokenValue;
};

export const defaultSegmentedControlTokens: SegmentedControlTokenMap = {
    'segmented-control-background-color': 'color-control-background',
    'segmented-control-border-color': 'color-control-border',
    'segmented-control-text-color': 'color-control-content',

    'segmented-control-hover-background-color': 'color-control-background-hover',
    'segmented-control-hover-border-color': 'color-control-border-hover',
    'segmented-control-hover-text-color': 'color-control-content-hover',

    'segmented-control-disabled-background-color': 'color-control-background-disabled',
    'segmented-control-disabled-border-color': 'color-control-border-disabled',
    'segmented-control-disabled-text-color': 'color-control-content-disabled',

    'segmented-control-pressed-background-color': 'color-control-background-selected',
    'segmented-control-pressed-border-color': 'color-control-border-selected',
    'segmented-control-pressed-text-color': 'color-control-content-selected',
};
