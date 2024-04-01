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
    'tab-background-color': 'color-bg', // should be transparent
    'tab-hover-background-color': 'color-bg-hover',
    'tab-global-indicator-background-color': 'color-bg-indicator',
    'tab-border-color': 'color-border-bold',
    'tab-text-color': 'color-content',
    'tab-icon-color': 'color-content',
};
