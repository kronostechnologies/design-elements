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
    'global-banner-neutral-background-color': 'color-bg-inverse',
    'global-banner-neutral-dismiss-button-hover-background-color': 'color-bg-inverse-hover',
    'global-banner-neutral-dismiss-button-background-color': 'transparent-100',
    'global-banner-neutral-text-color': 'color-text-inverse',
    'global-banner-neutral-action-button-text-color': 'color-text-inverse',
    'global-banner-neutral-dismiss-button-text-color': 'color-text-inverse',
    'global-banner-neutral-dismiss-button-hover-text-color': 'color-text-inverse',
    'global-banner-neutral-action-button-border-color': 'color-border-inverse',
    'global-banner-neutral-action-button-hover-border-color': 'color-border-inverse-hover',
    'global-banner-neutral-action-button-hover-text-color': 'color-text-inverse-hover',

    'global-banner-alert-background-color': 'color-feedback-bg-alert',
    'global-banner-alert-text-color': 'color-text-inverse',
    'global-banner-alert-action-button-text-color': 'color-text-inverse',
    'global-banner-alert-action-button-border-color': 'color-border-inverse',
    'global-banner-alert-action-button-hover-border-color': 'color-alert-20',
    'global-banner-alert-action-button-hover-text-color': 'color-alert-20',

    'global-banner-discovery-background-color': 'color-feedback-bg-discovery',
    'global-banner-discovery-text-color': 'color-text-inverse',
    'global-banner-discovery-action-button-text-color': 'color-text-inverse',
    'global-banner-discovery-dismiss-button-text-color': 'color-text-inverse',
    'global-banner-discovery-dismiss-button-hover-text-color': 'color-text-inverse',
    'global-banner-discovery-action-button-border-color': 'color-border-inverse',
    'global-banner-discovery-action-button-hover-border-color': 'color-discovery-20',
    'global-banner-discovery-action-button-hover-text-color': 'color-discovery-20',
    'global-banner-discovery-dismiss-button-background-color': 'transparent-100',
    'global-banner-discovery-dismiss-button-hover-background-color': 'color-discovery-70',

    'global-banner-warning-background-color': 'color-feedback-bg-warning',
    'global-banner-warning-text-color': 'color-text',
    'global-banner-warning-action-button-text-color': 'color-text',
    'global-banner-warning-dismiss-button-hover-text-color': 'color-text',
    'global-banner-warning-dismiss-button-text-color': 'color-text',
    'global-banner-warning-action-button-border-color': 'color-neutral-90',
    'global-banner-warning-action-button-hover-border-color': 'color-warning-70',
    'global-banner-warning-action-button-hover-text-color': 'color-warning-70',
    'global-banner-warning-dismiss-button-background-color': 'transparent-100',
    'global-banner-warning-dismiss-button-hover-background-color': 'color-warning-60',

};
