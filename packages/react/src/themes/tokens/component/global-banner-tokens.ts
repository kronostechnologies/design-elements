import type { ComponentTokenMap } from '../tokens';

export type GlobalBannerToken =
    | 'global-banner-neutral-background-color'
    | 'global-banner-neutral-text-color'
    | 'global-banner-neutral-action-button-border-color'
    | 'global-banner-neutral-action-button-text-color'
    | 'global-banner-neutral-action-button-hover-border-color'
    | 'global-banner-neutral-action-button-hover-text-color'
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
    | 'global-banner-warning-background-color'
    | 'global-banner-warning-text-color'
    | 'global-banner-warning-action-button-border-color'
    | 'global-banner-warning-action-button-text-color'
    | 'global-banner-warning-action-button-hover-border-color'
    | 'global-banner-warning-action-button-hover-text-color';

export const defaultGlobalBannerTokens: ComponentTokenMap<GlobalBannerToken> = {
    'global-banner-neutral-background-color': 'color-background-neutral-bold',
    'global-banner-neutral-text-color': 'color-content-inverse',
    'global-banner-neutral-action-button-text-color': 'color-content-inverse',
    'global-banner-neutral-action-button-border-color': 'color-border-inverse',
    'global-banner-neutral-action-button-hover-border-color': 'transparent-light-50',
    'global-banner-neutral-action-button-hover-text-color': 'transparent-light-50',
    'global-banner-discovery-background-color': 'color-feedback-background-discovery-bold',
    'global-banner-discovery-text-color': 'color-content-inverse',
    'global-banner-discovery-action-button-text-color': 'color-content-inverse',
    'global-banner-discovery-action-button-border-color': 'color-border-inverse',
    'global-banner-discovery-action-button-hover-border-color': 'transparent-light-50',
    'global-banner-discovery-action-button-hover-text-color': 'transparent-light-50',
    'global-banner-warning-background-color': 'color-feedback-background-warning-bold',
    'global-banner-warning-text-color': 'color-content',
    'global-banner-warning-action-button-text-color': 'color-content',
    'global-banner-warning-action-button-border-color': 'color-content',
    'global-banner-warning-action-button-hover-border-color': 'transparent-dark-60',
    'global-banner-warning-action-button-hover-text-color': 'transparent-dark-60',
    'global-banner-alert-background-color': 'color-feedback-background-alert-bold',
    'global-banner-alert-text-color': 'color-content-inverse',
    'global-banner-alert-action-button-text-color': 'color-content-inverse',
    'global-banner-alert-action-button-border-color': 'color-border-inverse',
    'global-banner-alert-action-button-hover-border-color': 'transparent-light-50',
    'global-banner-alert-action-button-hover-text-color': 'transparent-light-50',
};
