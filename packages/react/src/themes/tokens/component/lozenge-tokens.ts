import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type LozengeTokens =
    | 'lozenge-neutral-background-color'
    | 'lozenge-neutral-border-color'
    | 'lozenge-neutral-text-color'
    | 'lozenge-subtle-neutral-background-color'
    | 'lozenge-subtle-neutral-border-color'
    | 'lozenge-subtle-neutral-text-color'
    | 'lozenge-info-background-color'
    | 'lozenge-info-border-color'
    | 'lozenge-info-text-color'
    | 'lozenge-subtle-info-background-color'
    | 'lozenge-subtle-info-border-color'
    | 'lozenge-subtle-info-text-color'
    | 'lozenge-success-background-color'
    | 'lozenge-success-border-color'
    | 'lozenge-success-text-color'
    | 'lozenge-subtle-success-background-color'
    | 'lozenge-subtle-success-border-color'
    | 'lozenge-subtle-success-text-color'
    | 'lozenge-discovery-background-color'
    | 'lozenge-discovery-border-color'
    | 'lozenge-discovery-text-color'
    | 'lozenge-subtle-discovery-background-color'
    | 'lozenge-subtle-discovery-border-color'
    | 'lozenge-subtle-discovery-text-color'
    | 'lozenge-alert-background-color'
    | 'lozenge-alert-border-color'
    | 'lozenge-alert-text-color'
    | 'lozenge-subtle-alert-background-color'
    | 'lozenge-subtle-alert-border-color'
    | 'lozenge-subtle-alert-text-color'
    | 'lozenge-warning-background-color'
    | 'lozenge-warning-border-color'
    | 'lozenge-warning-text-color'
    | 'lozenge-subtle-warning-background-color'
    | 'lozenge-subtle-warning-border-color'
    | 'lozenge-subtle-warning-text-color';

export type LozengeTokensValue = AliasTokens | RefTokens;

export type LozengeTokensMap = {
    [Token in LozengeTokens]: LozengeTokensValue;
};

export const defaultLozengeTokens: LozengeTokensMap = {
    'lozenge-neutral-background-color': 'color-neutral-65',
    'lozenge-neutral-border-color': 'color-neutral-65',
    'lozenge-neutral-text-color': 'color-white',
    'lozenge-subtle-neutral-background-color': 'color-neutral-05',
    'lozenge-subtle-neutral-border-color': 'color-neutral-05',
    'lozenge-subtle-neutral-text-color': 'color-neutral-65',
    'lozenge-info-background-color': 'color-informative-50',
    'lozenge-info-border-color': 'color-informative-50',
    'lozenge-info-text-color': 'color-white',
    'lozenge-subtle-info-background-color': 'color-informative-05',
    'lozenge-subtle-info-border-color': 'color-informative-05',
    'lozenge-subtle-info-text-color': 'color-informative-70',
    'lozenge-success-background-color': 'color-success-50',
    'lozenge-success-border-color': 'color-success-50',
    'lozenge-success-text-color': 'color-white',
    'lozenge-subtle-success-background-color': 'color-success-05',
    'lozenge-subtle-success-border-color': 'color-success-05',
    'lozenge-subtle-success-text-color': 'color-success-70',
    'lozenge-discovery-background-color': 'color-discovery-50',
    'lozenge-discovery-border-color': 'color-discovery-50',
    'lozenge-discovery-text-color': 'color-white',
    'lozenge-subtle-discovery-background-color': 'color-discovery-05',
    'lozenge-subtle-discovery-border-color': 'color-discovery-05',
    'lozenge-subtle-discovery-text-color': 'color-discovery-70',
    'lozenge-alert-background-color': 'color-alert-50',
    'lozenge-alert-border-color': 'color-alert-50',
    'lozenge-alert-text-color': 'color-white',
    'lozenge-subtle-alert-background-color': 'color-alert-05',
    'lozenge-subtle-alert-border-color': 'color-alert-05',
    'lozenge-subtle-alert-text-color': 'color-alert-50',
    'lozenge-warning-background-color': 'color-warning-50',
    'lozenge-warning-border-color': 'color-warning-50',
    'lozenge-warning-text-color': 'color-neutral-90',
    'lozenge-subtle-warning-background-color': 'color-warning-05',
    'lozenge-subtle-warning-border-color': 'color-warning-05',
    'lozenge-subtle-warning-text-color': 'color-warning-80',
};
