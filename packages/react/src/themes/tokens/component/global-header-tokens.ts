import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type GlobalHeaderTokens =
    | 'global-header-background-color'
    | 'global-header-logo-title-separator-color'
    | 'global-header-content-text-color'
    | 'global-header-logo-content-text-color';

export type GlobalHeaderTokensValue = AliasTokens | RefTokens;

export type GlobalHeaderTokensMap = {
    [Token in GlobalHeaderTokens]: GlobalHeaderTokensValue;
};

export const defaultGlobalHeaderTokens : GlobalHeaderTokensMap = {
    'global-header-background-color': 'color-background-brand-bold',
    'global-header-logo-title-separator-color': 'color-border-brand-bold',
    'global-header-logo-content-text-color': 'color-content-inverse',
    'global-header-content-text-color': 'color-content-inverse',
};
