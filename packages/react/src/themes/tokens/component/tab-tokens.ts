import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TabTokens =
    | 'tab-background-color'
    | 'tab-hover-background-color'
    | 'tab-global-indicator-background-color'
    | 'tab-border-color'
    | 'tab-text-color'
    | 'tab-icon-color';

export type TabTokenValue = AliasTokens | RefTokens;

export type TabTokenMap = {
    [Token in TabTokens]: TabTokenValue;
};

export const defaultTabTokens: TabTokenMap = {
    'tab-background-color': 'color-white',
    'tab-hover-background-color': 'color-neutral-15',
    'tab-global-indicator-background-color': 'color-brand-50',
    'tab-border-color': 'color-neutral-50',
    'tab-text-color': 'color-neutral-90',
    'tab-icon-color': 'color-neutral-90',
};
