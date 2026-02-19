import type { ComponentTokenMap } from '../tokens';

export type ViewControlToken =
    | 'view-control-button-background-color'
    | 'view-control-button-border-color'
    | 'view-control-button-hover-background-color'
    | 'view-control-button-hover-border-color'
    | 'view-control-button-hover-value-color'
    | 'view-control-button-inverted-background-color'
    | 'view-control-button-inverted-hover-background-color'
    | 'view-control-button-inverted-hover-value-color'
    | 'view-control-button-inverted-value-color'
    | 'view-control-button-subtle-background-color'
    | 'view-control-button-subtle-hover-background-color'
    | 'view-control-button-subtle-hover-value-color'
    | 'view-control-button-subtle-value-color'
    | 'view-control-button-value-color'
    | 'view-control-hint-color';

export const defaultViewControlTokens: ComponentTokenMap<ViewControlToken> = {
    'view-control-button-background-color': 'color-control-background',
    'view-control-button-border-color': 'color-control-border',
    'view-control-button-hover-background-color': 'color-control-background-hover',
    'view-control-button-hover-border-color': 'color-control-border-hover',
    'view-control-button-hover-value-color': 'color-content',
    'view-control-button-inverted-background-color': 'transparent-100',
    'view-control-button-inverted-hover-background-color': 'color-feedback-content-informative',
    'view-control-button-inverted-hover-value-color': 'color-content-inverse',
    'view-control-button-inverted-value-color': 'color-content-inverse',
    'view-control-button-subtle-background-color': 'transparent-100',
    'view-control-button-subtle-hover-background-color': 'transparent-100',
    'view-control-button-subtle-hover-value-color': 'color-content',
    'view-control-button-subtle-value-color': 'color-content-subtle',
    'view-control-button-value-color': 'color-content-subtle',
    'view-control-hint-color': 'color-content-subtle',
};
