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
    'external-link-visited-text-color': 'visited-link-color',

    'route-link-text-color': 'color-informative-50',
    'route-link-disabled-text-color': 'color-informative-20',
    'route-link-hover-text-color': 'color-informative-70',
    'route-link-visited-text-color': 'visited-link-color',

    'skip-link-background-color': 'color-white',
    'skip-link-text-color': 'color-informative-50',
};
