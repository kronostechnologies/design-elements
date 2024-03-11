import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TabTokens =
    | 'tabs-tab-border-bottom-color'
    | 'tabs-tab-button-text-color'
    | 'tabs-tab-hover-background-color'
    | 'tabs-tab-left-icon-color'
    | 'tabs-tab-right-icon-color'
    | 'tabs-tab-global-text-color'
    | 'tabs-tab-global-selected-background-color'
    | 'tabs-tab-text-color'
    | 'tabs-tab-selected-background-color'
    | 'tabs-tab-selected-border-color'
    | 'tabs-tab-selected-text-color'
    | 'tab-panel-border-color';

export type TabTokenValue = AliasTokens | RefTokens;

export type TabTokenMap = {
    [Token in TabTokens]: TabTokenValue;
};

export const defaultTabTokens: TabTokenMap = {
    'tabs-tab-border-bottom-color': 'color-neutral-50',
    'tabs-tab-button-text-color': 'color-black',
    'tabs-tab-hover-background-color': 'color-neutral-15',
    'tabs-tab-left-icon-color': 'color-black',
    'tabs-tab-right-icon-color': 'color-black',
    'tabs-tab-global-text-color': 'color-neutral-90',
    'tabs-tab-global-selected-background-color': 'color-brand-50',
    'tabs-tab-text-color': 'color-neutral-50',
    'tabs-tab-selected-background-color': 'color-white',
    'tabs-tab-selected-border-color': 'color-neutral-50',
    'tabs-tab-selected-text-color': 'color-neutral-90',
    'tab-panel-border-color': 'color-neutral-50',
};
