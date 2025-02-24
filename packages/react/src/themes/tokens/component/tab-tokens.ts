import type { ComponentTokenMap } from '../tokens';

export type TabToken =
    | 'tab-list-default-background-color'
    | 'tab-list-dimmed-background-color'
    | 'tab-button-icon-color'
    | 'tab-button-text-color'
    | 'tab-button-indicator-hover-background-color'
    | 'tab-button-hover-text-color'
    | 'tab-button-indicator-active-background-color'
    | 'tab-button-active-text-color'
    | 'tab-button-indicator-selected-background-color'
    | 'tab-button-selected-text-color'
    | 'tab-scroll-button-hover-background-color'
    | 'tab-border-bottom-color';

export const defaultTabTokens: ComponentTokenMap<TabToken> = {
    'tab-list-default-background-color': 'color-background',
    'tab-list-dimmed-background-color': 'color-background-neutral-subtle',
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
