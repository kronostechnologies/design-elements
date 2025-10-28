import type { ComponentTokenMap } from '../tokens';

export type FilterToken =
    | 'filter-button-active-background-color'
    | 'filter-button-active-border-color'
    | 'filter-button-active-label-color'
    | 'filter-button-active-value-color'
    | 'filter-button-background-color'
    | 'filter-button-border-color'
    | 'filter-button-hover-background-color'
    | 'filter-button-hover-border-color'
    | 'filter-button-hover-label-color'
    | 'filter-button-hover-value-color'
    | 'filter-button-label-color'
    | 'filter-button-value-color'
    | 'filter-clear-color'
    | 'filter-clear-disabled-color'
    | 'filter-divider-color'
    | 'filter-expand-icon-color';

export const defaultFilterTokens: ComponentTokenMap<FilterToken> = {
    'filter-button-active-background-color': 'color-control-background-selected',
    'filter-button-active-border-color': 'color-control-border-selected',
    'filter-button-active-label-color': 'color-content-selected',
    'filter-button-active-value-color': 'color-content-selected',
    'filter-button-background-color': 'color-control-background',
    'filter-button-border-color': 'color-control-border',
    'filter-button-hover-background-color': 'color-control-background-hover',
    'filter-button-hover-border-color': 'color-control-border-hover',
    'filter-button-hover-label-color': 'color-control-value-hover',
    'filter-button-hover-value-color': 'color-control-value-hover',
    'filter-button-label-color': 'color-control-value',
    'filter-button-value-color': 'color-content-subtle',
    'filter-clear-color': 'color-content',
    'filter-clear-disabled-color': 'color-content-disabled',
    'filter-divider-color': 'color-border',
    'filter-expand-icon-color': 'color-content-subtle',
};
