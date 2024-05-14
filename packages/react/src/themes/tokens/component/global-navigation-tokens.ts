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
    'global-navigation-background-color': 'color-white',
    'global-navigation-box-shadow-color': 'transparent-dark-20',
    'global-navigation-item-hover-background-color': 'color-neutral-15',
    'global-navigation-item-hover-text-color': 'color-black',
    'global-navigation-item-text-color': 'color-neutral-65',
    'global-navigation-item-selected-background-color': 'color-brand-05',
    'global-navigation-item-selected-text-color': 'color-brand-70',
    'global-navigation-separator-border-color': 'color-neutral-15',
};
