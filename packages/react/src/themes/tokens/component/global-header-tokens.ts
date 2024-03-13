import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type GlobalHeaderTokens =
    'global-header-background' |
    'global-header-skiplink-background-color' |
    'global-header-logo-title-separator-color' |
    'global-header-content-container-text-color' |
    'global-header-logo-content-text-color';

export type GlobalHeaderTokensValue = AliasTokens | RefTokens;

export type GlobalHeaderTokensMap = {
    [Token in GlobalHeaderTokens]: GlobalHeaderTokensValue;
};

export const defaultGlobalHeaderTokens : GlobalHeaderTokensMap = {
    'global-header-background': 'color-brand-80',
    'global-header-logo-title-separator-color': 'color-brand-70',
    'global-header-content-container-text-color': 'color-white',
    'global-header-skiplink-background-color': 'color-white',
    'global-header-logo-content-text-color': 'color-white',
};
