import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TabTokens =
    | 'tab-button-border-bottom-color'
    | 'tab-button-text-color'
    | 'tab-button-hover-background-color'
    | 'tab-button-left-icon-color'
    | 'tab-button-right-icon-color'
    | 'tab-button-global-color'
    | 'tab-button-global-selected-background-color'
    | 'tab-button-color'
    | 'tab-button-selected-background-color'
    | 'tab-button-selected-border-color'
    | 'tab-button-selected-color'
    | 'tab-panel-border-color';

export type TabTokenValue = AliasTokens | RefTokens;

export type TabTokenMap = {
    [Token in TabTokens]: TabTokenValue;
};

export const defaultTabTokens: TabTokenMap = {
    'tab-button-border-bottom-color': 'color-neutral-50',
    'tab-button-text-color': 'color-black',
    'tab-button-hover-background-color': 'color-neutral-15',
    'tab-button-left-icon-color': 'color-black',
    'tab-button-right-icon-color': 'color-black',
    'tab-button-global-color': 'color-neutral-90',
    'tab-button-global-selected-background-color': 'color-brand-50',
    'tab-button-color': 'color-neutral-50',
    'tab-button-selected-background-color': 'color-white',
    'tab-button-selected-border-color': 'color-neutral-50',
    'tab-button-selected-color': 'color-neutral-90',
    'tab-panel-border-color': 'color-neutral-50',
};
