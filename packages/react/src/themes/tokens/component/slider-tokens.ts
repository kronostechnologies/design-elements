import type { ComponentTokenMap } from '../tokens';

export type SliderToken =
    | 'slider-track-empty-background-color'
    | 'slider-track-empty-disabled-background-color'
    | 'slider-track-empty-label-text-color'
    | 'slider-track-empty-mark-background-color'
    | 'slider-track-empty-mark-disabled-background-color'
    | 'slider-track-filled-background-color'
    | 'slider-track-filled-disabled-background-color'
    | 'slider-track-filled-mark-background-color'
    | 'slider-track-filled-mark-disabled-background-color'
    | 'slider-thumb-background-color'
    | 'slider-thumb-border-color'
    | 'slider-thumb-disabled-border-color';

export const defaultSliderTokens: ComponentTokenMap<SliderToken> = {
    'slider-track-empty-background-color': 'color-background-empty',
    'slider-track-empty-disabled-background-color': 'color-background-neutral-subtle',
    'slider-track-empty-label-text-color': 'color-content-subtle',
    'slider-track-empty-mark-background-color': 'color-background-neutral-bold',
    'slider-track-empty-mark-disabled-background-color': 'color-background-indicator-disabled',
    'slider-track-filled-background-color': 'color-background-brand',
    'slider-track-filled-disabled-background-color': 'color-background-neutral-bold-disabled',
    'slider-track-filled-mark-background-color': 'color-control-background',
    'slider-track-filled-mark-disabled-background-color': 'color-control-background',
    'slider-thumb-background-color': 'color-control-background',
    'slider-thumb-border-color': 'color-border-brand',
    'slider-thumb-disabled-border-color': 'color-control-border-disabled',
};
