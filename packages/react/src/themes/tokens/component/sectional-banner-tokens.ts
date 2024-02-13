import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SectionalBannerTokens =
    | 'sectional-banner-border-color'
    | 'sectional-banner-neutral-background-color'
    | 'sectional-banner-neutral-border-color'
    | 'sectional-banner-info-background-color'
    | 'sectional-banner-info-border-color'
    | 'sectional-banner-discovery-background-color'
    | 'sectional-banner-discovery-border-color'
    | 'sectional-banner-success-background-color'
    | 'sectional-banner-success-border-color'
    | 'sectional-banner-warning-background-color'
    | 'sectional-banner-warning-border-color'
    | 'sectional-banner-warning-icon-color'
    | 'sectional-banner-alert-background-color'
    | 'sectional-banner-alert-border-color'
    | 'sectional-banner-icon-color';

export type SectionalBannerTokenValue = AliasTokens | RefTokens;

export type SectionalBannerTokenMap = {
    [Token in SectionalBannerTokens]: SectionalBannerTokenValue;
};

export const defaultSectionalBannerTokens: SectionalBannerTokenMap = {
    'sectional-banner-border-color': 'color-brand-50',
    'sectional-banner-neutral-background-color': 'color-neutral-02',
    'sectional-banner-neutral-border-color': 'color-neutral-50',
    'sectional-banner-info-background-color': 'color-informative-02',
    'sectional-banner-info-border-color': 'color-informative-50',
    'sectional-banner-discovery-background-color': 'color-discovery-02',
    'sectional-banner-discovery-border-color': 'color-discovery-50',
    'sectional-banner-success-background-color': 'color-success-02',
    'sectional-banner-success-border-color': 'color-success-50',
    'sectional-banner-warning-background-color': 'color-warning-02',
    'sectional-banner-warning-border-color': 'color-warning-50',
    'sectional-banner-warning-icon-color': 'color-warning-70',
    'sectional-banner-alert-background-color': 'color-alert-02',
    'sectional-banner-alert-border-color': 'color-alert-50',
    'sectional-banner-icon-color': 'color-brand-50',
};
