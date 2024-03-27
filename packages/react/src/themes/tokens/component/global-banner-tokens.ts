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
    /**
     * neutral
     */
    'global-banner-neutral-background-color': 'color-bg-neutral-bold',
    'global-banner-neutral-dismiss-button-background-color': 'transparent-100',
    'global-banner-neutral-dismiss-button-hover-background-color': 'transparent-dark-50',
    'global-banner-neutral-text-color': 'color-content-inverse',
    'global-banner-neutral-action-button-text-color': 'color-content-inverse',
    'global-banner-neutral-dismiss-button-text-color': 'color-content-inverse',
    'global-banner-neutral-dismiss-button-hover-text-color': 'color-content-inverse',
    'global-banner-neutral-action-button-border-color': 'color-border-inverse',
    'global-banner-neutral-action-button-hover-border-color': 'transparent-light-50',
    'global-banner-neutral-action-button-hover-text-color': 'transparent-light-50',

    /**
     * discovery
     */
    'global-banner-discovery-background-color': 'color-feedback-bg-discovery-bold',
    'global-banner-discovery-dismiss-button-background-color': 'transparent-100',
    'global-banner-discovery-dismiss-button-hover-background-color': 'transparent-dark-50',
    'global-banner-discovery-text-color': 'color-content-inverse',
    'global-banner-discovery-action-button-text-color': 'color-content-inverse',
    'global-banner-discovery-dismiss-button-text-color': 'color-content-inverse',
    'global-banner-discovery-dismiss-button-hover-text-color': 'color-content-inverse',
    'global-banner-discovery-action-button-border-color': 'color-border-inverse',
    'global-banner-discovery-action-button-hover-border-color': 'transparent-light-50',
    'global-banner-discovery-action-button-hover-text-color': 'transparent-light-50',

    /**
     * warning
     */
    'global-banner-warning-background-color': 'color-feedback-bg-warning-bold',
    'global-banner-warning-dismiss-button-background-color': 'transparent-100',
    'global-banner-warning-dismiss-button-hover-background-color': 'transparent-dark-30',
    'global-banner-warning-text-color': 'color-content',
    'global-banner-warning-action-button-text-color': 'color-content',
    'global-banner-warning-dismiss-button-hover-text-color': 'color-content',
    'global-banner-warning-dismiss-button-text-color': 'color-content',
    'global-banner-warning-action-button-border-color': 'color-content',
    'global-banner-warning-action-button-hover-border-color': 'transparent-dark-60',
    'global-banner-warning-action-button-hover-text-color': 'transparent-dark-60',

    /**
     * alert
     */
    'global-banner-alert-background-color': 'color-feedback-bg-alert-bold',
    'global-banner-alert-text-color': 'color-content-inverse',
    'global-banner-alert-action-button-text-color': 'color-content-inverse',
    'global-banner-alert-action-button-border-color': 'color-border-inverse',
    'global-banner-alert-action-button-hover-border-color': 'transparent-light-50',
    'global-banner-alert-action-button-hover-text-color': 'transparent-light-50',

};
