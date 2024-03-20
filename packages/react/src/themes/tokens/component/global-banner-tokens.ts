import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type GlobalBannerTokens =
    | 'global-banner-neutral-background-color'
    | 'global-banner-neutral-text-color'
    | 'global-banner-neutral-action-button-border-color'
    | 'global-banner-neutral-action-button-text-color'
    | 'global-banner-neutral-action-button-hover-border-color'
    | 'global-banner-neutral-action-button-hover-text-color'
    | 'global-banner-neutral-dismiss-button-background-color'
    | 'global-banner-neutral-dismiss-button-text-color'
    | 'global-banner-neutral-dismiss-button-hover-background-color'
    | 'global-banner-neutral-dismiss-button-hover-text-color'

    | 'global-banner-alert-background-color'
    | 'global-banner-alert-text-color'
    | 'global-banner-alert-action-button-border-color'
    | 'global-banner-alert-action-button-text-color'
    | 'global-banner-alert-action-button-hover-border-color'
    | 'global-banner-alert-action-button-hover-text-color'

    | 'global-banner-discovery-background-color'
    | 'global-banner-discovery-text-color'
    | 'global-banner-discovery-action-button-border-color'
    | 'global-banner-discovery-action-button-text-color'
    | 'global-banner-discovery-action-button-hover-border-color'
    | 'global-banner-discovery-action-button-hover-text-color'
    | 'global-banner-discovery-dismiss-button-background-color'
    | 'global-banner-discovery-dismiss-button-text-color'
    | 'global-banner-discovery-dismiss-button-hover-background-color'
    | 'global-banner-discovery-dismiss-button-hover-text-color'

    | 'global-banner-warning-background-color'
    | 'global-banner-warning-text-color'
    | 'global-banner-warning-action-button-border-color'
    | 'global-banner-warning-action-button-text-color'
    | 'global-banner-warning-action-button-hover-border-color'
    | 'global-banner-warning-action-button-hover-text-color'
    | 'global-banner-warning-dismiss-button-background-color'
    | 'global-banner-warning-dismiss-button-text-color'
    | 'global-banner-warning-dismiss-button-hover-background-color'
    | 'global-banner-warning-dismiss-button-hover-text-color';

export type GlobalBannerTokenValue = AliasTokens | RefTokens;

export type GlobalBannerTokenMap = {
    [Token in GlobalBannerTokens]: GlobalBannerTokenValue;
};

export const defaultGlobalBannerTokens: GlobalBannerTokenMap = {
    'global-banner-neutral-background-color': 'color-neutral-65', // color-bg-fill-inverse -> color-neutral-65
    'global-banner-neutral-text-color': 'color-white', // color-text-inverse -> color-content-inverse -> color-white
    'global-banner-neutral-action-button-border-color': 'color-white',
    'global-banner-neutral-action-button-text-color': 'color-white',
    'global-banner-neutral-action-button-hover-border-color': 'color-neutral-30',
    'global-banner-neutral-action-button-hover-text-color': 'color-neutral-30',
    'global-banner-neutral-dismiss-button-background-color': 'transparent-100',
    'global-banner-neutral-dismiss-button-text-color': 'color-white',
    'global-banner-neutral-dismiss-button-hover-background-color': 'color-neutral-80',
    'global-banner-neutral-dismiss-button-hover-text-color': 'color-white',

    'global-banner-alert-background-color': 'color-alert-50', // color-feedback-bg-fill-alert -> color-alert-50
    'global-banner-alert-text-color': 'color-white', // color-text-inverse -> color-content-inverse -> color-white
    'global-banner-alert-action-button-border-color': 'color-white',
    'global-banner-alert-action-button-text-color': 'color-white',
    'global-banner-alert-action-button-hover-border-color': 'color-alert-20',
    'global-banner-alert-action-button-hover-text-color': 'color-alert-20',

    'global-banner-discovery-background-color': 'color-discovery-50', // color-feedback-bg-fill-discovery -> color-discovery-50
    'global-banner-discovery-text-color': 'color-white', // color-text-inverse -> color-content-inverse -> color-white
    'global-banner-discovery-action-button-border-color': 'color-white',
    'global-banner-discovery-action-button-text-color': 'color-white',
    'global-banner-discovery-action-button-hover-border-color': 'color-discovery-20',
    'global-banner-discovery-action-button-hover-text-color': 'color-discovery-20',
    'global-banner-discovery-dismiss-button-background-color': 'transparent-100',
    'global-banner-discovery-dismiss-button-text-color': 'color-white',
    'global-banner-discovery-dismiss-button-hover-background-color': 'color-discovery-70',
    'global-banner-discovery-dismiss-button-hover-text-color': 'color-white',

    'global-banner-warning-background-color': 'color-warning-50', // color-feedback-bg-fill-warning -> color-warning-50
    'global-banner-warning-text-color': 'color-neutral-90', // color-text -> color-content -> color-neutral-90
    'global-banner-warning-action-button-border-color': 'color-neutral-90',
    'global-banner-warning-action-button-text-color': 'color-neutral-90',
    'global-banner-warning-action-button-hover-border-color': 'color-warning-70',
    'global-banner-warning-action-button-hover-text-color': 'color-warning-70',
    'global-banner-warning-dismiss-button-background-color': 'transparent-100',
    'global-banner-warning-dismiss-button-text-color': 'color-neutral-90',
    'global-banner-warning-dismiss-button-hover-background-color': 'color-warning-60',
    'global-banner-warning-dismiss-button-hover-text-color': 'color-neutral-90',
};
