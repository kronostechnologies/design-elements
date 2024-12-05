import type { ComponentTokenMap } from '../tokens';

export type GlobalHeaderToken =
    | 'global-header-background-color'
    | 'global-header-logo-title-separator-color'
    | 'global-header-content-text-color'
    | 'global-header-logo-content-text-color';

export const defaultGlobalHeaderTokens : ComponentTokenMap<GlobalHeaderToken> = {
    'global-header-background-color': 'color-background-brand-bold',
    'global-header-logo-title-separator-color': 'color-border-brand-bold',
    'global-header-logo-content-text-color': 'color-content-inverse',
    'global-header-content-text-color': 'color-content-inverse',
};
