import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type GlobalNavigationTokens =
    | 'global-navigation-background-color'
    | 'global-navigation-box-shadow-color'
    | 'global-navigation-item-text-color'
    | 'global-navigation-item-hover-text-color'
    | 'global-navigation-item-hover-background-color'
    | 'global-navigation-item-selected-background-color'
    | 'global-navigation-item-selected-text-color'
    | 'global-navigation-separator-border-color';

export type GlobalNavigationTokenValue = AliasTokens | RefTokens;

export type GlobalNavigationTokenMap = {
    [Token in GlobalNavigationTokens]: GlobalNavigationTokenValue;
};

export const defaultGlobalNavigationTokens: GlobalNavigationTokenMap = {
    'global-navigation-background-color': 'color-bg-overlay',
    'global-navigation-box-shadow-color': 'color-box-shadow',
    'global-navigation-item-hover-background-color': 'color-bg-hover',
    'global-navigation-item-hover-text-color': 'color-content-hover',
    'global-navigation-item-text-color': 'color-content-subtle',
    'global-navigation-item-selected-background-color': 'color-bg-selected',
    'global-navigation-item-selected-text-color': 'color-content-selected',
    'global-navigation-separator-border-color': 'color-border',
};
