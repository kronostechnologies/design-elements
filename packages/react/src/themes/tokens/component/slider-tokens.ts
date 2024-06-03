import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SliderTokens =
    | 'slider-rail-background-color'
    | 'slider-rail-disabled-background-color'
    | 'slider-rail-mark-background-color'
    | 'slider-rail-mark-disabled-background-color'
    | 'slider-track-background-color'
    | 'slider-track-disabled-background-color'
    | 'slider-track-mark-background-color'
    | 'slider-track-mark-disabled-background-color'
    | 'slider-thumb-background-color'
    | 'slider-thumb-border-color'
    | 'slider-thumb-disabled-border-color';

export type SliderTokensValue = AliasTokens | RefTokens;

export type SliderTokenMap = {
    [Token in SliderTokens]: SliderTokensValue;
};

export const defaultSliderTokens: SliderTokenMap = {
    'slider-rail-background-color': 'color-bg-empty',
    'slider-rail-disabled-background-color': 'color-bg-neutral-subtle',
    'slider-rail-mark-background-color': 'color-bg-neutral-bold',
    'slider-rail-mark-disabled-background-color': 'color-bg-indicator-disabled',
    'slider-track-background-color': 'color-bg-brand',
    'slider-track-disabled-background-color': 'color-bg-neutral-bold-disabled',
    'slider-track-mark-background-color': 'color-control-background',
    'slider-track-mark-disabled-background-color': 'color-control-background',
    'slider-thumb-background-color': 'color-control-background',
    'slider-thumb-border-color': 'color-border-brand',
    'slider-thumb-disabled-border-color': 'color-control-border-disabled',
};
