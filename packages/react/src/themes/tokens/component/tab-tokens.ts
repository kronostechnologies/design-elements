import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TabTokens =
    | 'tabs-background-color'
    | 'tabs-tab-border-bottom-color'
    | 'tabs-tab-icon-color'
    | 'tabs-tab-text-color'
    | 'tabs-tab-hover-indicator-color'
    | 'tabs-tab-hover-text-color'
    | 'tabs-tab-active-indicator-color'
    | 'tabs-tab-active-text-color'
    | 'tabs-tab-selected-indicator-color'
    | 'tabs-tab-selected-text-color'
    | 'tabs-panel-border-color'
    | 'tabs-panel-background-color'
    | 'tabs-global-background-color';

export type TabTokenValue = AliasTokens | RefTokens;

export type TabTokenMap = {
    [Token in TabTokens]: TabTokenValue;
};

export const defaultTabTokens: TabTokenMap = {
    'tabs-background-color': 'color-neutral-05',
    'tabs-tab-border-bottom-color': 'color-neutral-15',
    'tabs-tab-icon-color': 'color-neutral-65',
    'tabs-tab-text-color': 'color-neutral-65',
    'tabs-tab-hover-indicator-color': 'color-neutral-15',
    'tabs-tab-hover-text-color': 'color-neutral-65',
    'tabs-tab-active-indicator-color': 'color-brand-70',
    'tabs-tab-active-text-color': 'color-neutral-90',
    'tabs-tab-selected-indicator-color': 'color-brand-50',
    'tabs-tab-selected-text-color': 'color-neutral-90',
    'tabs-panel-border-color': 'color-neutral-05',
    'tabs-panel-background-color': 'color-white',
    'tabs-global-background-color': 'color-white',
};
