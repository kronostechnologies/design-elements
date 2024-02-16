import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type GlobalHeaderTokens =
    'global-header-background' |
    'global-header-skiplink-background-color'|
    'global-header-logo-content-span-border-color'|
    'global-header-content-container-color';

export type GlobalHeaderTokensValue = AliasTokens | RefTokens;

export type GlobalHeaderTokensMap = {
    [Token in GlobalHeaderTokens]: GlobalHeaderTokensValue;
};

export const defaultGlobalHeaderTokens : GlobalHeaderTokensMap = {
    'global-header-background': 'color-brand-80',
    'global-header-logo-content-span-border-color': 'color-brand-70',
    'global-header-content-container-color': 'color-white',
    'global-header-skiplink-background-color': "color-white"
};
