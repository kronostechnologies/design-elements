import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type FilterTokens =
    | 'filter-background-color'
    | 'filter-label-color'
    | 'filter-value-color'
    | 'filter-icon-color'
    | 'filter-border-color'
    | 'filter-button-background-color'
    | 'filter-button-icon-color'
    | 'filter-hover-background-color'
    | 'filter-hover-label-color'
    | 'filter-hover-value-color'
    | 'filter-hover-icon-color'
    | 'filter-hover-border-color'
    | 'filter-option-text-color'
    | 'filter-option-disabled-background-color'
    | 'filter-option-disabled-text-color'
    | 'filter-option-hover-background-color'
    | 'filter-option-indicator-selected-background-color'
    | 'filter-option-subcontent-text-color'
    | 'filter-option-subcontent-disabled-text-color'
    | 'filter-selected-background-color'
    | 'filter-selected-label-color'
    | 'filter-selected-value-color'
    | 'filter-selected-icon-color'
    | 'filter-selected-border-color'
    | 'filter-selected-hover-background-color';

export type FilterTokenValue = AliasTokens | RefTokens;

export type FilterTokenMap = {
    [Token in FilterTokens]: FilterTokenValue;
};

export const defaultFilterTokens: FilterTokenMap = {
    'filter-background-color': 'color-control-background',
    'filter-label-color': 'color-control-auxiliary',
    'filter-value-color': 'color-control-value',
    'filter-icon-color': 'color-control-auxiliary',
    'filter-border-color': 'color-control-border',
    'filter-button-background-color': 'transparent-100',
    'filter-button-icon-color': 'color-content-subtle',

    'filter-hover-background-color': 'color-control-background-hover',
    'filter-hover-label-color': 'color-control-auxiliary-hover',
    'filter-hover-value-color': 'color-control-value-hover',
    'filter-hover-icon-color': 'color-control-value-hover',
    'filter-hover-border-color': 'color-control-border-hover',

    'filter-selected-background-color': 'color-control-background-selected',
    'filter-selected-label-color': 'color-control-auxiliary-selected',
    'filter-selected-value-color': 'color-control-auxiliary-selected',
    'filter-selected-icon-color': 'color-control-auxiliary-selected',
    'filter-selected-border-color': 'color-control-border-selected',
    'filter-selected-hover-background-color': 'color-control-background-selected-hover',

    'filter-option-text-color': 'color-menu-item-content',
    'filter-option-subcontent-text-color': 'color-menu-item-subcontent',
    'filter-option-hover-background-color': 'color-menu-item-background-hover',
    'filter-option-disabled-background-color': 'color-menu-item-background',
    'filter-option-disabled-text-color': 'color-menu-item-content-disabled',
    'filter-option-subcontent-disabled-text-color': 'color-menu-item-content-disabled',
    'filter-option-indicator-selected-background-color': 'color-menu-item-background-indicator-selected',
};
