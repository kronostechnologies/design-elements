import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SectionalBannerTokens =
    | 'sectional-banner-container-border-color'
    | 'sectional-banner-container-neutral-border-color'
    | 'sectional-banner-container-info-border-color'
    | 'sectional-banner-container-discovery-border-color'
    | 'sectional-banner-container-success-border-color'
    | 'sectional-banner-container-warning-border-color'
    | 'sectional-banner-container-warning-icon-color'
    | 'sectional-banner-container-alert-border-color'
    | 'sectional-banner-icon-color'
    | 'sectional-banner-container-neutral-background-color'
    | 'sectional-banner-container-info-background-color'
    | 'sectional-banner-container-discovery-background-color'
    | 'sectional-banner-container-success-background-color'
    | 'sectional-banner-container-warning-background-color'
    | 'sectional-banner-container-alert-background-color';

export type SectionalBannerTokenValue = AliasTokens | RefTokens;

export type SectionalBannerTokenMap = {
    [Token in SectionalBannerTokens]: SectionalBannerTokenValue;
};

export const defaultSectionalBannerTokens: SectionalBannerTokenMap = {
    'sectional-banner-container-border-color': 'color-brand-50',
    'sectional-banner-container-neutral-border-color': 'color-neutral-50',
    'sectional-banner-container-info-border-color': 'color-informative-50',
    'sectional-banner-container-discovery-border-color': 'color-discovery-50',
    'sectional-banner-container-success-border-color': 'color-success-50',
    'sectional-banner-container-warning-border-color': 'color-warning-50',
    'sectional-banner-container-warning-icon-color': 'color-warning-70',
    'sectional-banner-container-alert-border-color': 'color-alert-50',
    'sectional-banner-icon-color': 'color-brand-50',
    'sectional-banner-container-neutral-background-color': 'color-neutral-02',
    'sectional-banner-container-info-background-color': 'color-informative-03',
    'sectional-banner-container-discovery-background-color': 'color-discovery-02',
    'sectional-banner-container-success-background-color': 'color-success-03',
    'sectional-banner-container-warning-background-color': 'color-warning-02',
    'sectional-banner-container-alert-background-color': 'color-alert-03',
};