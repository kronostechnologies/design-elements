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
    /**
     * neutral variant
     */
    'lozenge-neutral-background-color': 'color-bg-neutral-bold',
    'lozenge-neutral-border-color': 'color-bg-neutral-bold',
    'lozenge-neutral-text-color': 'color-content-inverse',
    /**
     * neutral subtle variant
     */
    'lozenge-neutral-subtle-background-color': 'color-bg-neutral-subtle',
    'lozenge-neutral-subtle-border-color': 'color-bg-neutral-subtle',
    'lozenge-neutral-subtle-text-color': 'color-content-subtle',

    /**
     * info variant
     */
    'lozenge-info-background-color': 'color-feedback-bg-informative-bold',
    'lozenge-info-border-color': 'color-feedback-bg-informative-bold',
    'lozenge-info-text-color': 'color-content-inverse',
    /**
     * info subtle variant
     */
    'lozenge-info-subtle-background-color': 'color-feedback-bg-informative-subtle',
    'lozenge-info-subtle-border-color': 'color-feedback-bg-informative-subtle',
    'lozenge-info-subtle-text-color': 'color-feedback-content-informative',

    /**
     * success variant
     */
    'lozenge-success-background-color': 'color-feedback-bg-success-bold',
    'lozenge-success-border-color': 'color-feedback-bg-success-bold',
    'lozenge-success-text-color': 'color-content-inverse',
    /**
     * success subtle variant
     */
    'lozenge-success-subtle-background-color': 'color-feedback-bg-success-subtle',
    'lozenge-success-subtle-border-color': 'color-feedback-bg-success-subtle',
    'lozenge-success-subtle-text-color': 'color-feedback-content-success',

    /**
     * discovery variant
     */
    'lozenge-discovery-background-color': 'color-feedback-bg-discovery-bold',
    'lozenge-discovery-border-color': 'color-feedback-bg-discovery-bold',
    'lozenge-discovery-text-color': 'color-content-inverse',
    /**
     * discovery subtle variant
     */
    'lozenge-discovery-subtle-background-color': 'color-feedback-bg-discovery-subtle',
    'lozenge-discovery-subtle-border-color': 'color-feedback-bg-discovery-subtle',
    'lozenge-discovery-subtle-text-color': 'color-feedback-content-discovery',

    /**
     * alert variant
     */
    'lozenge-alert-background-color': 'color-feedback-bg-alert-bold',
    'lozenge-alert-border-color': 'color-feedback-bg-alert-bold',
    'lozenge-alert-text-color': 'color-content-inverse',
    /**
     * alert subtle variant
     */
    'lozenge-alert-subtle-background-color': 'color-feedback-bg-alert-subtle',
    'lozenge-alert-subtle-border-color': 'color-feedback-bg-alert-subtle',
    'lozenge-alert-subtle-text-color': 'color-feedback-content-alert',

    /**
     * warning variant
     */
    'lozenge-warning-background-color': 'color-feedback-bg-warning-bold',
    'lozenge-warning-border-color': 'color-feedback-bg-warning-bold',
    'lozenge-warning-text-color': 'color-content',
    /**
     * warning subtle variant
     */
    'lozenge-warning-subtle-background-color': 'color-feedback-bg-warning-subtle',
    'lozenge-warning-subtle-border-color': 'color-feedback-bg-warning-subtle',
    'lozenge-warning-subtle-text-color': 'color-feedback-content-warning',
};
