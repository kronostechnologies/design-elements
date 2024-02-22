import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TabPanelTokens =
    | 'tab-panel-border-color';

export type TabPanelTokenValue = AliasTokens | RefTokens;

export type TabPanelTokenMap = {
    [Token in TabPanelTokens]: TabPanelTokenValue;
};

export const defaultTabPanelTokens: TabPanelTokenMap = {
    'tab-panel-border-color': 'color-neutral-50',
};
