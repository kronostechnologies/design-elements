import type { ComponentTokenMap } from '../tokens';

export type LinkToken =
    | 'external-link-visited-text-color'
    | 'skip-link-text-color'
    | 'skip-link-background-color'
    | 'route-link-text-color'
    | 'route-link-disabled-text-color'
    | 'route-link-hover-text-color'
    | 'route-link-visited-text-color'
    | 'link-text-color'
    | 'link-disabled-text-color'
    | 'link-hover-text-color'
    | 'link-visited-text-color'
    | 'link-icon-color'
    | 'link-disabled-icon-color'
    | 'link-hover-icon-color'
    | 'link-visited-icon-color';

export const defaultLinkTokens: ComponentTokenMap<LinkToken> = {
    'external-link-visited-text-color': 'color-link-content-visited',
    'route-link-visited-text-color': 'color-link-content-visited',
    'route-link-text-color': 'color-link-content',
    'route-link-disabled-text-color': 'color-link-content-disabled',
    'route-link-hover-text-color': 'color-link-content-hover',
    'skip-link-text-color': 'color-link-content',
    'skip-link-background-color': 'color-background',
    'link-text-color': 'color-link-content',
    'link-disabled-text-color': 'color-link-content-disabled',
    'link-hover-text-color': 'color-link-content-hover',
    'link-visited-text-color': 'color-link-content-visited',
    'link-icon-color': 'color-link-content',
    'link-disabled-icon-color': 'color-link-content-disabled',
    'link-hover-icon-color': 'color-link-content-hover',
    'link-visited-icon-color': 'color-link-content-visited',
};
