import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TabButtonTokens =
    | 'tab-button-border-bottom-color'
    | 'tab-button-text-color'
    | 'tab-button-hover-background-color'
    | 'tab-button-left-icon-color'
    | 'tab-button-right-icon-color'
    | 'tab-button-global-color'
    | 'tab-button-global-selected-background-color'
    | 'tab-button-not-global-color'
    | 'tab-button-not-global-selected-background-color'
    | 'tab-button-not-global-selected-border-color'
    | 'tab-button-not-global-selected-color'

export type TabButtonTokenValue = AliasTokens | RefTokens;

export type TabButtonTokenMap = {
    [Token in TabButtonTokens]: TabButtonTokenValue;
};

export const defaultTabButtonTokens: TabButtonTokenMap = {
    'tab-button-border-bottom-color': 'color-neutral-50',
    'tab-button-text-color': 'color-black',
    'tab-button-hover-background-color': 'color-neutral-15',
    'tab-button-left-icon-color': 'color-black',
    'tab-button-right-icon-color': 'color-black',
    'tab-button-global-color': 'color-neutral-90',
    'tab-button-global-selected-background-color': 'color-brand-50',
    'tab-button-not-global-color': 'color-neutral-50',
    'tab-button-not-global-selected-background-color': 'color-white',
    'tab-button-not-global-selected-border-color': 'color-neutral-50',
    'tab-button-not-global-selected-color': 'color-neutral-90',
};
