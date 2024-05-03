import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TabTokens =
    | 'tab-background-color'
    | 'tab-border-bottom-color'
    | 'tab-global-background-color'
    | 'tab-icon-color'
    | 'tab-text-color'
    | 'tab-hover-indicator-color'
    | 'tab-hover-text-color'
    | 'tab-active-indicator-color'
    | 'tab-active-text-color'
    | 'tab-selected-indicator-color'
    | 'tab-selected-text-color'
    | 'tab-panel-border-color'
    | 'tab-panel-background-color';

export type TabTokenValue = AliasTokens | RefTokens;

export type TabTokenMap = {
    [Token in TabTokens]: TabTokenValue;
};

export const defaultTabTokens: TabTokenMap = {
    'tab-background-color': 'color-neutral-05',
    'tab-border-bottom-color': 'color-neutral-15',
    'tab-global-background-color': 'color-white',
    'tab-icon-color': 'color-neutral-65',
    'tab-text-color': 'color-neutral-65',
    'tab-hover-indicator-color': 'color-neutral-15',
    'tab-hover-text-color': 'color-neutral-65',
    'tab-active-indicator-color': 'color-brand-70',
    'tab-active-text-color': 'color-neutral-90',
    'tab-selected-indicator-color': 'color-brand-50',
    'tab-selected-text-color': 'color-neutral-90',
    'tab-panel-border-color': 'color-neutral-05',
    'tab-panel-background-color': 'color-white',
};
