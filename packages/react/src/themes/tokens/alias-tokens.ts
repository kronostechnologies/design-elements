import { NoSelfReference } from '../../utility-types';
import { RefTokens } from './ref-tokens';

export type AliasTokens =
/**
 * TIER 1
 * GENERAL
 */
    | 'color-error'
    | 'color-action'
    | 'color-action-disabled'
    | 'color-action-hover'
    | 'color-feedback-success'
    | 'color-feedback-success-hover'
    | 'color-feedback-success-alternate-subtlest'
    | 'color-feedback-success-alternate-subtle'
    | 'color-feedback-success-alternate-hover'
    | 'color-feedback-alert'
    | 'color-feedback-alert-hover'
    | 'color-feedback-alert-alternate-subtlest'
    | 'color-feedback-alert-alternate-subtle'
    | 'color-feedback-alert-alternate-hover'
    | 'color-feedback-warning'
    | 'color-feedback-warning-hover'
    | 'color-feedback-warning-alternate-subtlest'
    | 'color-feedback-warning-alternate-subtle'
    | 'color-feedback-warning-alternate-hover'
    | 'color-feedback-discovery'
    | 'color-feedback-discovery-hover'
    | 'color-feedback-discovery-alternate-subtlest'
    | 'color-feedback-discovery-alternate-subtle'
    | 'color-feedback-discovery-alternate-hover'
    | 'color-feedback-informative'
    | 'color-feedback-informative-hover'
    | 'color-feedback-informative-alternate-subtlest'
    | 'color-feedback-informative-alternate-subtle'
    | 'color-feedback-informative-alternate-hover'
/**
 * TIER 2
 * BACKGROUND
 */
    | 'color-bg'
    | 'color-bg-disabled'
    | 'color-bg-hover'
    | 'color-bg-selected'
    | 'color-bg-inverse'
    | 'color-bg-inverse-hover'
    | 'color-bg-alternate-subtlest'
    | 'color-bg-alternate-subtle'
    | 'color-bg-alternate-disabled'
    | 'color-bg-alternate-hover'
    | 'color-bg-brand'
    | 'color-bg-brand-hover'
    | 'color-bg-brand-selected'
    | 'color-indicator-bg'
    | 'color-empty-bg'
    | 'color-action-bg'
    | 'color-action-bg-hover'
    | 'color-action-bg-disabled'
    | 'color-feedback-bg-success-subtle'
    | 'color-feedback-bg-warning-subtle'
    | 'color-feedback-bg-alert-subtle'
    | 'color-feedback-bg-discovery-subtle'
    | 'color-feedback-bg-informative-subtle'
    | 'color-feedback-bg-success-subtlest'
    | 'color-feedback-bg-warning-subtlest'
    | 'color-feedback-bg-alert-subtlest'
    | 'color-feedback-bg-discovery-subtlest'
    | 'color-feedback-bg-informative-subtlest'
    | 'color-feedback-bg-success'
    | 'color-feedback-bg-success-hover'
    | 'color-feedback-bg-alert'
    | 'color-feedback-bg-alert-hover'
    | 'color-feedback-bg-warning'
    | 'color-feedback-bg-warning-hover'
    | 'color-feedback-bg-discovery'
    | 'color-feedback-bg-discovery-hover'
    | 'color-feedback-bg-informative'
    | 'color-feedback-bg-informative-hover'
/**
 * TIER 2
 * BORDER
 */
    | 'color-border'
    | 'color-border-alternate'
    | 'color-border-inverse'
    | 'color-overlay-border'
    | 'color-interactive-border'
    | 'color-interactive-border-alternate'
    | 'color-interactive-border-hover'
    | 'color-interactive-border-disabled'
    | 'color-interactive-border-selected'
    | 'color-interactive-border-error'
    | 'color-separator'
    | 'color-border-focus-outside'
    | 'color-border-focus-inside'
    | 'color-border-focus-outside-inverse'
    | 'color-border-focus-inside-inverse'
    | 'color-action-border'
    | 'color-action-border-hover'
    | 'color-action-border-disabled'
    | 'color-feedback-border-success'
    | 'color-feedback-border-warning'
    | 'color-feedback-border-alert'
    | 'color-feedback-border-discovery'
    | 'color-feedback-border-informative'
/**
 * TIER 2
 * CONTENT
 */
    | 'color-content'
    | 'color-content-alternate'
    | 'color-content-inverse'
    | 'color-content-disabled'
    | 'color-content-brand'
    | 'color-content-hover'
    | 'color-content-selected'
    | 'color-content-error'
    | 'color-link-content'
    | 'color-link-content-visited'
    | 'color-link-content-disabled'
    | 'color-link-content-hover'
    | 'color-action-content'
    | 'color-action-content-hover'
    | 'color-action-content-disabled'
    | 'color-feedback-content-success'
    | 'color-feedback-content-warning'
    | 'color-feedback-content-alert'
    | 'color-feedback-content-discovery'
    | 'color-feedback-content-informative'
/**
 * TIER 2
 * BOX-SHADOW
 */
    | 'color-box-shadow'
/**
 * TIER 3
 * TEXT (CONTENT)
 */
    | 'color-text'
    | 'color-text-alternate'
    | 'color-text-inverse'
    | 'color-text-disabled'
    | 'color-text-brand'
    | 'color-text-hover'
    | 'color-text-selected'
    | 'color-text-error'
    | 'color-link-text'
    | 'color-link-text-visited'
    | 'color-link-text-disabled'
    | 'color-link-text-hover'
    | 'color-action-text'
    | 'color-action-text-hover'
    | 'color-action-text-disabled'
    | 'color-feedback-text-success'
    | 'color-feedback-text-warning'
    | 'color-feedback-text-alert'
    | 'color-feedback-text-discovery'
    | 'color-feedback-text-informative'
/**
 * TIER 3
 * ICON (CONTENT)
 */
    | 'color-icon'
    | 'color-icon-alternate'
    | 'color-icon-inverse'
    | 'color-icon-disabled'
    | 'color-icon-brand'
    | 'color-icon-hover'
    | 'color-icon-selected'
    | 'color-icon-error'
    | 'color-link-icon'
    | 'color-link-icon-visited'
    | 'color-link-icon-disabled'
    | 'color-link-icon-hover'
    | 'color-action-icon'
    | 'color-action-icon-hover'
    | 'color-action-icon-disabled'
    | 'color-feedback-icon-success'
    | 'color-feedback-icon-warning'
    | 'color-feedback-icon-alert'
    | 'color-feedback-icon-discovery'
    | 'color-feedback-icon-informative';

export type AliasTokenMap = {
    [Token in AliasTokens]: NoSelfReference<RefTokens | AliasTokens, Token>;
}

export const defaultAliasTokens: AliasTokenMap = {
    /**
     * TIER 1
     * GENERAL
    */
    'color-feedback-success': 'color-success-50',
    'color-feedback-success-hover': 'color-success-70',
    'color-feedback-success-alternate-subtlest': 'color-success-02',
    'color-feedback-success-alternate-subtle': 'color-success-05',
    'color-feedback-success-alternate-hover': 'color-success-10',
    'color-feedback-alert': 'color-alert-50',
    'color-feedback-alert-hover': 'color-alert-70',
    'color-feedback-alert-alternate-subtlest': 'color-alert-02',
    'color-feedback-alert-alternate-subtle': 'color-alert-05',
    'color-feedback-alert-alternate-hover': 'color-alert-10',
    'color-feedback-warning': 'color-warning-50',
    'color-feedback-warning-hover': 'color-warning-70',
    'color-feedback-warning-alternate-subtlest': 'color-warning-02',
    'color-feedback-warning-alternate-subtle': 'color-warning-05',
    'color-feedback-warning-alternate-hover': 'color-warning-10',
    'color-feedback-discovery': 'color-discovery-50',
    'color-feedback-discovery-hover': 'color-discovery-70',
    'color-feedback-discovery-alternate-subtlest': 'color-discovery-02',
    'color-feedback-discovery-alternate-subtle': 'color-discovery-05',
    'color-feedback-discovery-alternate-hover': 'color-discovery-10',
    'color-feedback-informative': 'color-informative-50',
    'color-feedback-informative-hover': 'color-informative-70',
    'color-feedback-informative-alternate-subtlest': 'color-informative-02',
    'color-feedback-informative-alternate-subtle': 'color-informative-05',
    'color-feedback-informative-alternate-hover': 'color-informative-10',
    'color-action': 'color-brand-50',
    'color-action-disabled': 'color-brand-20',
    'color-action-hover': 'color-brand-70',
    'color-error': 'color-feedback-alert',

    /**
     * TIER 2
     * BACKGROUND
     */
    'color-action-bg': 'color-action',
    'color-action-bg-hover': 'color-action-hover',
    'color-action-bg-disabled': 'color-action-disabled',
    'color-feedback-bg-success': 'color-feedback-success',
    'color-feedback-bg-success-subtlest': 'color-feedback-success-alternate-subtlest',
    'color-feedback-bg-success-subtle': 'color-feedback-success-alternate-subtle',
    'color-feedback-bg-success-hover': 'color-feedback-success-hover',
    'color-feedback-bg-alert': 'color-feedback-alert',
    'color-feedback-bg-alert-subtlest': 'color-feedback-alert-alternate-subtlest',
    'color-feedback-bg-alert-subtle': 'color-feedback-alert-alternate-subtle',
    'color-feedback-bg-alert-hover': 'color-feedback-alert-hover',
    'color-feedback-bg-warning': 'color-feedback-warning',
    'color-feedback-bg-warning-subtlest': 'color-feedback-warning-alternate-subtlest',
    'color-feedback-bg-warning-subtle': 'color-feedback-warning-alternate-subtle',
    'color-feedback-bg-warning-hover': 'color-feedback-warning-hover',
    'color-feedback-bg-discovery': 'color-feedback-discovery',
    'color-feedback-bg-discovery-subtlest': 'color-feedback-discovery-alternate-subtlest',
    'color-feedback-bg-discovery-subtle': 'color-feedback-discovery-alternate-subtle',
    'color-feedback-bg-discovery-hover': 'color-feedback-discovery-hover',
    'color-feedback-bg-informative': 'color-feedback-informative',
    'color-feedback-bg-informative-subtlest': 'color-feedback-informative-alternate-subtlest',
    'color-feedback-bg-informative-subtle': 'color-feedback-informative-alternate-subtle',
    'color-feedback-bg-informative-hover': 'color-feedback-informative-hover',

    'color-bg': 'color-white',
    'color-bg-disabled': 'color-neutral-05',
    'color-bg-selected': 'color-brand-05',
    'color-bg-hover': 'color-neutral-15',
    'color-bg-alternate-subtlest': 'color-neutral-02',
    'color-bg-alternate-subtle': 'color-neutral-05',
    'color-bg-alternate-disabled': 'color-neutral-15',
    'color-bg-alternate-hover': 'color-neutral-30',
    'color-bg-inverse': 'color-neutral-65',
    'color-bg-inverse-hover': 'color-neutral-80',
    'color-bg-brand': 'color-brand-80',
    'color-bg-brand-hover': 'color-brand-70',
    'color-bg-brand-selected': 'color-brand-70',

    'color-empty-bg': 'color-neutral-15',
    'color-indicator-bg': 'color-brand-50',

    /**
     * TIER 2
     * BORDER
     */
    'color-action-border': 'color-action',
    'color-action-border-hover': 'color-action-hover',
    'color-action-border-disabled': 'color-action-disabled',
    'color-feedback-border-success': 'color-feedback-success',
    'color-feedback-border-warning': 'color-feedback-warning',
    'color-feedback-border-alert': 'color-feedback-alert',
    'color-feedback-border-discovery': 'color-feedback-discovery',
    'color-feedback-border-informative': 'color-feedback-informative',

    'color-border': 'color-neutral-15',
    'color-border-alternate': 'color-neutral-05',
    'color-border-inverse': 'color-white',
    'color-overlay-border': 'color-neutral-50',
    'color-interactive-border': 'color-neutral-65',
    'color-interactive-border-alternate': 'color-neutral-50',
    'color-interactive-border-hover': 'color-black',
    'color-interactive-border-disabled': 'color-neutral-30',
    'color-interactive-border-selected': 'color-brand-50',
    'color-interactive-border-error': 'color-error',

    'color-separator': 'color-border',
    'color-border-focus-outside': 'color-brand-50',
    'color-border-focus-inside': 'color-brand-20',
    'color-border-focus-outside-inverse': 'color-border-focus-inside',
    'color-border-focus-inside-inverse': 'color-border-focus-outside',

    /**
     * TIER 2
     * CONTENT
     */
    'color-action-content': 'color-action',
    'color-action-content-hover': 'color-action-hover',
    'color-action-content-disabled': 'color-action-disabled',
    'color-feedback-content-success': 'color-success-70',
    'color-feedback-content-alert': 'color-alert-70',
    'color-feedback-content-discovery': 'color-discovery-70',
    'color-feedback-content-informative': 'color-discovery-70',
    'color-feedback-content-warning': 'color-warning-80',
    'color-content-error': 'color-error',

    'color-content': 'color-neutral-90',
    'color-content-alternate': 'color-neutral-65',
    'color-content-inverse': 'color-white',
    'color-content-hover': 'color-black',
    'color-content-disabled': 'color-neutral-30',
    'color-content-brand': 'color-brand-70',
    'color-content-selected': 'color-brand-70',

    'color-link-content': 'color-informative-50',
    'color-link-content-disabled': 'color-informative-20',
    'color-link-content-hover': 'color-informative-70',
    'color-link-content-visited': 'color-discovery-50',

    /**
     * TIER 2
     * BOX-SHADOW
     */
    'color-box-shadow': 'transparent-20',

    /**
     * TIER 3
     * TEXT (CONTENT)
     */
    'color-text': 'color-content',
    'color-text-alternate': 'color-content-alternate',
    'color-text-inverse': 'color-content-inverse',
    'color-text-disabled': 'color-content-disabled',
    'color-text-brand': 'color-content-brand',
    'color-text-hover': 'color-content-hover',
    'color-text-selected': 'color-content-selected',
    'color-text-error': 'color-content-error',
    'color-link-text': 'color-link-content',
    'color-link-text-visited': 'color-link-content-visited',
    'color-link-text-disabled': 'color-link-content-disabled',
    'color-link-text-hover': 'color-link-content-hover',
    'color-action-text': 'color-action-content',
    'color-action-text-hover': 'color-action-content-hover',
    'color-action-text-disabled': 'color-action-content-disabled',
    'color-feedback-text-success': 'color-feedback-content-success',
    'color-feedback-text-warning': 'color-feedback-content-warning',
    'color-feedback-text-alert': 'color-feedback-content-alert',
    'color-feedback-text-discovery': 'color-feedback-content-discovery',
    'color-feedback-text-informative': 'color-feedback-content-informative',
    /**
     * TIER 3
     * ICON (CONTENT)
     */
    'color-icon': 'color-content',
    'color-icon-alternate': 'color-content-alternate',
    'color-icon-inverse': 'color-content-inverse',
    'color-icon-disabled': 'color-content-disabled',
    'color-icon-brand': 'color-content-brand',
    'color-icon-hover': 'color-content-hover',
    'color-icon-selected': 'color-content-selected',
    'color-icon-error': 'color-content-error',
    'color-link-icon': 'color-link-content',
    'color-link-icon-visited': 'color-link-content-visited',
    'color-link-icon-disabled': 'color-link-content-disabled',
    'color-link-icon-hover': 'color-link-content-hover',
    'color-action-icon': 'color-action-content',
    'color-action-icon-hover': 'color-action-content-hover',
    'color-action-icon-disabled': 'color-action-content-disabled',
    'color-feedback-icon-success': 'color-feedback-content-success',
    'color-feedback-icon-warning': 'color-feedback-content-warning',
    'color-feedback-icon-alert': 'color-feedback-content-alert',
    'color-feedback-icon-discovery': 'color-feedback-content-discovery',
    'color-feedback-icon-informative': 'color-feedback-content-informative',
};
