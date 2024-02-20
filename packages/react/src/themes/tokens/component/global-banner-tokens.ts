import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type GlobalBannerTokens =
    | 'global-banner-alert-background-color'
    | 'global-banner-warning-background-color'
    | 'global-banner-info-background-color'
    | 'global-banner-default-background-color'
    | 'global-banner-default-container-color'
    | 'global-banner-warning-container-color'
    | 'global-banner-action-button-warning-color'
    | 'global-banner-action-button-warning-background-color'
    | 'global-banner-action-button-alert-hover-color'
    | 'global-banner-action-button-warning-hover-color'
    | 'global-banner-action-button-info-hover-color'
    | 'global-banner-action-button-default-hover-color'
    | 'global-banner-tertiary-button-alert-hover-background-color'
    | 'global-banner-tertiary-button-warning-hover-background-color'
    | 'global-banner-tertiary-button-info-hover-background-color'
    | 'global-banner-tertiary-button-default-hover-background-color'
    | 'global-banner-tertiary-button-color'
    | 'global-banner-tertiary-button-focus-color'
    | 'global-banner-tertiary-button-hover-color';

export type GlobalBannerTokenValue = AliasTokens | RefTokens;

export type GlobalBannerTokenMap = {
    [Token in GlobalBannerTokens]: GlobalBannerTokenValue;
};

export const defaultGlobalBannerTokens: GlobalBannerTokenMap = {
    'global-banner-alert-background-color': 'color-alert-50',
    'global-banner-warning-background-color': 'color-warning-50',
    'global-banner-info-background-color': 'color-informative-50',
    'global-banner-default-background-color': 'color-neutral-65',
    'global-banner-default-container-color': 'color-white',
    'global-banner-warning-container-color': 'color-black',
    'global-banner-action-button-warning-color': 'color-black',
    'global-banner-action-button-warning-background-color': 'color-black',
    'global-banner-action-button-alert-hover-color': 'color-alert-20',
    'global-banner-action-button-warning-hover-color': 'color-warning-70',
    'global-banner-action-button-info-hover-color': 'color-discovery-20',
    'global-banner-action-button-default-hover-color': 'color-neutral-30',
    'global-banner-tertiary-button-alert-hover-background-color': 'color-alert-20',
    'global-banner-tertiary-button-warning-hover-background-color': 'color-warning-70',
    'global-banner-tertiary-button-info-hover-background-color': 'color-discovery-70',
    'global-banner-tertiary-button-default-hover-background-color': 'color-neutral-50',
    'global-banner-tertiary-button-color': 'color-black',
    'global-banner-tertiary-button-focus-color': 'color-black',
    'global-banner-tertiary-button-hover-color': 'color-white',
};