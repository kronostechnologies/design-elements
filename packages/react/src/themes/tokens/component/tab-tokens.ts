import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TabTokens =
    | 'tab-border-bottom-color'
    | 'tab-button-text-color'
    | 'tab-hover-background-color'
    | 'tab-left-icon-color'
    | 'tab-right-icon-color'
    | 'tab-global-text-color'
    | 'tab-global-selected-background-color'
    | 'tab-text-color'
    | 'tab-selected-background-color'
    | 'tab-selected-border-color'
    | 'tab-selected-text-color'
    | 'tab-panel-border-color';

export type TabTokenValue = AliasTokens | RefTokens;

export type TabTokenMap = {
    [Token in TabTokens]: TabTokenValue;
};

export const defaultTabTokens: TabTokenMap = {
    'tab-border-bottom-color': 'color-neutral-50',
    'tab-button-text-color': 'color-black',
    'tab-hover-background-color': 'color-neutral-15',
    'tab-left-icon-color': 'color-black',
    'tab-right-icon-color': 'color-black',
    'tab-global-text-color': 'color-neutral-90',
    'tab-global-selected-background-color': 'color-brand-50',
    'tab-text-color': 'color-neutral-50',
    'tab-selected-background-color': 'color-white',
    'tab-selected-border-color': 'color-neutral-50',
    'tab-selected-text-color': 'color-neutral-90',
    'tab-panel-border-color': 'color-neutral-50',
};
