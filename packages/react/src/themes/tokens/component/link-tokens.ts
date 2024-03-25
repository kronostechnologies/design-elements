import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type LinkTokens =
    | 'external-link-visited-text-color'
    | 'skip-link-text-color'
    | 'skip-link-focus-background-color'
    | 'route-link-text-color'
    | 'route-link-disabled-text-color'
    | 'route-link-hover-text-color'
    | 'route-link-visited-text-color';

export type LinkTokenValue = AliasTokens | RefTokens;

export type LinkTokenMap = {
    [Token in LinkTokens]: LinkTokenValue;
};

export const defaultLinkTokens: LinkTokenMap = {
    'external-link-visited-text-color': 'color-link-text-visited',
    'skip-link-text-color': 'color-link-text',
    'skip-link-focus-background-color': 'color-bg',
    'route-link-visited-text-color': 'color-link-text-visited',
    'route-link-text-color': 'color-link-text',
    'route-link-disabled-text-color': 'color-link-text-disabled',
    'route-link-hover-text-color': 'color-link-text-hover',
};
