import type { ComponentTokenMap } from '../tokens';

export type GlobalNavigationToken =
    | 'global-navigation-background-color'
    | 'global-navigation-box-shadow-color'
    | 'global-navigation-item-text-color'
    | 'global-navigation-item-hover-text-color'
    | 'global-navigation-item-hover-background-color'
    | 'global-navigation-item-selected-background-color'
    | 'global-navigation-item-selected-text-color'
    | 'global-navigation-separator-border-color';

export const defaultGlobalNavigationTokens: ComponentTokenMap<GlobalNavigationToken> = {
    'global-navigation-background-color': 'color-background-overlay',
    'global-navigation-box-shadow-color': 'color-box-shadow',
    'global-navigation-item-hover-background-color': 'color-background-hover',
    'global-navigation-item-hover-text-color': 'color-content-hover',
    'global-navigation-item-text-color': 'color-content-subtle',
    'global-navigation-item-selected-background-color': 'color-background-selected',
    'global-navigation-item-selected-text-color': 'color-content-selected',
    'global-navigation-separator-border-color': 'color-border',
};
