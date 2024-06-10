import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type LinkTokens =
    | 'external-link-visited-text-color'
    | 'skip-link-text-color'
    | 'skip-link-background-color'
    | 'route-link-text-color'
    | 'route-link-disabled-text-color'
    | 'route-link-hover-text-color'
    | 'route-link-visited-text-color';

export type LinkTokenValue = AliasTokens | RefTokens;

export type LinkTokenMap = {
    [Token in LinkTokens]: LinkTokenValue;
};

export const defaultLinkTokens: LinkTokenMap = {
    'external-link-visited-text-color': 'color-link-content-visited',

    'route-link-visited-text-color': 'color-link-content-visited',
    'route-link-text-color': 'color-link-content',
    'route-link-disabled-text-color': 'color-link-content-disabled',
    'route-link-hover-text-color': 'color-link-content-hover',

    'skip-link-text-color': 'color-link-content',
    'skip-link-background-color': 'color-background',
};
