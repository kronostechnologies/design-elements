import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SegmentedControlTokens =
    | 'segmented-control-background-color'
    | 'segmented-control-selected-background-color'
    | 'segmented-control-hover-background-color'
    | 'segmented-control-disabled-background-color'
    | 'segmented-control-border-color'
    | 'segmented-control-selected-border-color'
    | 'segmented-control-hover-border-color'
    | 'segmented-control-disabled-border-color'
    | 'segmented-control-text-color'
    | 'segmented-control-selected-text-color'
    | 'segmented-control-hover-text-color'
    | 'segmented-control-disabled-text-color';

export type SegmentedControlTokenValue = AliasTokens | RefTokens;

export type SegmentedControlTokenMap = {
    [Token in SegmentedControlTokens]: SegmentedControlTokenValue;
};

export const defaultSegmentedControlTokens: SegmentedControlTokenMap = {
    'segmented-control-background-color': 'color-input-bg',
    'segmented-control-border-color': 'color-input-border',
    'segmented-control-text-color': 'color-input-content',

    'segmented-control-hover-background-color': 'color-input-bg-hover',
    'segmented-control-hover-border-color': 'color-input-border-hover',
    'segmented-control-hover-text-color': 'color-input-content-hover',

    'segmented-control-disabled-background-color': 'color-input-bg-disabled',
    'segmented-control-disabled-border-color': 'color-input-border-disabled',
    'segmented-control-disabled-text-color': 'color-input-content-disabled',

    'segmented-control-selected-background-color': 'color-input-bg-selected',
    'segmented-control-selected-border-color': 'color-input-border-selected',
    'segmented-control-selected-text-color': 'color-input-content-selected',
};
