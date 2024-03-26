import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type GlobalHeaderTokens =
    | 'global-header-background-color'
    | 'global-header-skiplink-background-color'
    | 'global-header-logo-title-separator-color'
    | 'global-header-content-text-color'
    | 'global-header-logo-content-text-color';

export type GlobalHeaderTokensValue = AliasTokens | RefTokens;

export type GlobalHeaderTokensMap = {
    [Token in GlobalHeaderTokens]: GlobalHeaderTokensValue;
};

export const defaultGlobalHeaderTokens : GlobalHeaderTokensMap = {
    'global-header-background-color': 'color-bg-brand',
    'global-header-content-text-color': 'color-content-inverse',
    'global-header-logo-content-text-color': 'color-content-inverse',
    'global-header-logo-title-separator-color': 'color-brand-70',
    'global-header-skiplink-background-color': 'color-bg',
};
