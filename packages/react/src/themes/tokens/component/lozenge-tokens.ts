import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type LozengeTokens =
    | 'lozenge-neutral-background-color'
    | 'lozenge-neutral-border-color'
    | 'lozenge-neutral-text-color'
    | 'lozenge-neutral-subtle-background-color'
    | 'lozenge-neutral-subtle-border-color'
    | 'lozenge-neutral-subtle-text-color'
    | 'lozenge-info-background-color'
    | 'lozenge-info-border-color'
    | 'lozenge-info-text-color'
    | 'lozenge-info-subtle-background-color'
    | 'lozenge-info-subtle-border-color'
    | 'lozenge-info-subtle-text-color'
    | 'lozenge-success-background-color'
    | 'lozenge-success-border-color'
    | 'lozenge-success-text-color'
    | 'lozenge-success-subtle-background-color'
    | 'lozenge-success-subtle-border-color'
    | 'lozenge-success-subtle-text-color'
    | 'lozenge-discovery-background-color'
    | 'lozenge-discovery-border-color'
    | 'lozenge-discovery-text-color'
    | 'lozenge-discovery-subtle-background-color'
    | 'lozenge-discovery-subtle-border-color'
    | 'lozenge-discovery-subtle-text-color'
    | 'lozenge-alert-background-color'
    | 'lozenge-alert-border-color'
    | 'lozenge-alert-text-color'
    | 'lozenge-alert-subtle-background-color'
    | 'lozenge-alert-subtle-border-color'
    | 'lozenge-alert-subtle-text-color'
    | 'lozenge-warning-background-color'
    | 'lozenge-warning-border-color'
    | 'lozenge-warning-text-color'
    | 'lozenge-warning-subtle-background-color'
    | 'lozenge-warning-subtle-border-color'
    | 'lozenge-warning-subtle-text-color';

export type LozengeTokensValue = AliasTokens | RefTokens;

export type LozengeTokensMap = {
    [Token in LozengeTokens]: LozengeTokensValue;
};

export const defaultLozengeTokens: LozengeTokensMap = {
    'lozenge-neutral-background-color': 'color-neutral-65',
    'lozenge-neutral-border-color': 'color-neutral-65',
    'lozenge-neutral-text-color': 'color-white',
    'lozenge-neutral-subtle-background-color': 'color-neutral-05',
    'lozenge-neutral-subtle-border-color': 'color-neutral-05',
    'lozenge-neutral-subtle-text-color': 'color-neutral-65',
    'lozenge-info-background-color': 'color-informative-50',
    'lozenge-info-border-color': 'color-informative-50',
    'lozenge-info-text-color': 'color-white',
    'lozenge-info-subtle-background-color': 'color-informative-05',
    'lozenge-info-subtle-border-color': 'color-informative-05',
    'lozenge-info-subtle-text-color': 'color-informative-70',
    'lozenge-success-background-color': 'color-success-50',
    'lozenge-success-border-color': 'color-success-50',
    'lozenge-success-text-color': 'color-white',
    'lozenge-success-subtle-background-color': 'color-success-05',
    'lozenge-success-subtle-border-color': 'color-success-05',
    'lozenge-success-subtle-text-color': 'color-success-70',
    'lozenge-discovery-background-color': 'color-discovery-50',
    'lozenge-discovery-border-color': 'color-discovery-50',
    'lozenge-discovery-text-color': 'color-white',
    'lozenge-discovery-subtle-background-color': 'color-discovery-05',
    'lozenge-discovery-subtle-border-color': 'color-discovery-05',
    'lozenge-discovery-subtle-text-color': 'color-discovery-70',
    'lozenge-alert-background-color': 'color-alert-50',
    'lozenge-alert-border-color': 'color-alert-50',
    'lozenge-alert-text-color': 'color-white',
    'lozenge-alert-subtle-background-color': 'color-alert-05',
    'lozenge-alert-subtle-border-color': 'color-alert-05',
    'lozenge-alert-subtle-text-color': 'color-alert-50',
    'lozenge-warning-background-color': 'color-warning-50',
    'lozenge-warning-border-color': 'color-warning-50',
    'lozenge-warning-text-color': 'color-neutral-90',
    'lozenge-warning-subtle-background-color': 'color-warning-05',
    'lozenge-warning-subtle-border-color': 'color-warning-05',
    'lozenge-warning-subtle-text-color': 'color-warning-80',
};
