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
    'external-link-visited-text-color': 'color-link-text-visited', // color-link-text-visited -> color-discovery-50
    'skip-link-text-color': 'color-link-text', // color-link-text -> color-informative-50
    'skip-link-focus-background-color': 'color-white', // color-bg-fill-idle -> color-white
    'route-link-visited-text-color': 'color-link-text-visited', // color-link-text-visited -> color-discovery-50
    'route-link-text-color': 'color-link-text', // color-link-text -> color-informative-50
    'route-link-disabled-text-color': 'color-informative-20', // color-link-text-disabled -> color-informative-20
    'route-link-hover-text-color': 'color-informative-70', // color-link-text-hover ->  'color-informative-70'
};
