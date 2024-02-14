import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type RouteLinkTokens =
    | 'route-link-text-color'
    | 'route-link-disabled-text-color'
    | 'route-link-hover-text-color'
    | 'route-link-visited-text-color'

export type RouteLinkTokenValue = AliasTokens | RefTokens;

export type RouteLinkTokenMap = {
    [Token in RouteLinkTokens]: RouteLinkTokenValue;
};

export const defaultRouteLinkTokens: RouteLinkTokenMap = {
    'route-link-text-color': 'color-informative-50',
    'route-link-disabled-text-color': 'color-informative-20',
    'route-link-hover-text-color': 'color-informative-70',
    'route-link-visited-text-color': 'visited-link-color',
};
