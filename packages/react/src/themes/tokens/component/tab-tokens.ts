import type { ComponentTokenMap } from '../tokens';

export type TabToken =
    | 'tab-section-border-color'
    | 'tab-section-box-shadow-color'
    | 'tab-global-list-background-color'
    | 'tab-section-list-background-color'
    | 'tab-section-button-background-color'
    | 'tab-global-button-background-color'
    | 'tab-button-icon-color'
    | 'tab-button-text-color'
    | 'tab-button-indicator-hover-background-color'
    | 'tab-button-hover-text-color'
    | 'tab-button-indicator-active-background-color'
    | 'tab-button-active-text-color'
    | 'tab-button-indicator-selected-background-color'
    | 'tab-global-button-selected-background-color'
    | 'tab-section-button-selected-background-color'
    | 'tab-button-selected-text-color'
    | 'tab-section-background-color'
    | 'tab-scroll-button-hover-background-color'
    | 'tab-border-bottom-color';

export const defaultTabTokens: ComponentTokenMap<TabToken> = {
    'tab-global-button-background-color': 'transparent-100',
    'tab-global-list-background-color': 'color-background',
    'tab-global-button-selected-background-color': 'transparent-100',
    'tab-section-background-color': 'color-background',
    'tab-section-border-color': 'color-border',
    'tab-section-box-shadow-color': 'color-box-shadow',
    'tab-section-list-background-color': 'color-background-neutral-subtle',
    'tab-section-button-background-color': 'color-background',
    'tab-section-button-selected-background-color': 'color-background',
    'tab-button-icon-color': 'color-content-subtle',
    'tab-button-text-color': 'color-content-subtle',
    'tab-button-hover-text-color': 'color-content-hover',
    'tab-button-active-text-color': 'color-content',
    'tab-button-selected-text-color': 'color-content',
    'tab-scroll-button-hover-background-color': 'color-neutral-15',
    'tab-border-bottom-color': 'color-border',
    'tab-button-indicator-hover-background-color': 'color-background-hover',
    'tab-button-indicator-active-background-color': 'color-background-indicator-active',
    'tab-button-indicator-selected-background-color': 'color-background-indicator-selected',
};
