import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SectionalBannerTokens =
    | 'sectional-banner-neutral-background-color'
    | 'sectional-banner-neutral-border-color'
    | 'sectional-banner-neutral-icon-color'
    | 'sectional-banner-info-background-color'
    | 'sectional-banner-info-border-color'
    | 'sectional-banner-info-icon-color'
    | 'sectional-banner-discovery-background-color'
    | 'sectional-banner-discovery-border-color'
    | 'sectional-banner-discovery-icon-color'
    | 'sectional-banner-success-background-color'
    | 'sectional-banner-success-border-color'
    | 'sectional-banner-success-icon-color'
    | 'sectional-banner-warning-background-color'
    | 'sectional-banner-warning-border-color'
    | 'sectional-banner-warning-icon-color'
    | 'sectional-banner-alert-background-color'
    | 'sectional-banner-alert-border-color'
    | 'sectional-banner-alert-icon-color';

export type SectionalBannerTokenValue = AliasTokens | RefTokens;

export type SectionalBannerTokenMap = {
    [Token in SectionalBannerTokens]: SectionalBannerTokenValue;
};

export const defaultSectionalBannerTokens: SectionalBannerTokenMap = {
    'sectional-banner-neutral-background-color': 'color-bg-alternate-subtlest',
    'sectional-banner-neutral-border-color': 'color-interactive-border-alternate',
    'sectional-banner-neutral-icon-color': 'color-icon-alternate',
    'sectional-banner-info-background-color': 'color-feedback-bg-informative-subtlest',
    'sectional-banner-info-border-color': 'color-feedback-border-informative',
    'sectional-banner-info-icon-color': 'color-feedback-icon-informative',
    'sectional-banner-discovery-background-color': 'color-feedback-bg-discovery-subtlest',
    'sectional-banner-discovery-border-color': 'color-feedback-border-discovery',
    'sectional-banner-discovery-icon-color': 'color-feedback-icon-discovery',
    'sectional-banner-success-background-color': 'color-feedback-bg-success-subtlest',
    'sectional-banner-success-border-color': 'color-feedback-border-success',
    'sectional-banner-success-icon-color': 'color-feedback-icon-success',
    'sectional-banner-warning-background-color': 'color-feedback-bg-warning-subtlest',
    'sectional-banner-warning-border-color': 'color-feedback-border-warning',
    'sectional-banner-warning-icon-color': 'color-feedback-icon-warning',
    'sectional-banner-alert-background-color': 'color-feedback-bg-alert-subtlest',
    'sectional-banner-alert-border-color': 'color-feedback-border-alert',
    'sectional-banner-alert-icon-color': 'color-feedback-icon-alert',
};
