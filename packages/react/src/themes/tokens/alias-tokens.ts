import { NoSelfReference } from '../../utility-types';
import { RefTokens } from './ref-tokens';

export type AliasTokens =
    // GENERAL TIER
    | 'color-error'
    | 'color-action-light'
    | 'color-action-mid'
    | 'color-action-dark'
    | 'color-feedback-success-light'
    | 'color-feedback-success-mid'
    | 'color-feedback-success-dark'
    | 'color-feedback-alert-light'
    | 'color-feedback-alert-mid'
    | 'color-feedback-alert-dark'
    | 'color-feedback-warning-light'
    | 'color-feedback-warning-mid'
    | 'color-feedback-warning-dark'
    | 'color-feedback-discovery-light'
    | 'color-feedback-discovery-mid'
    | 'color-feedback-discovery-dark'
    | 'color-feedback-informative-light'
    | 'color-feedback-informative-mid'
    | 'color-feedback-informative-dark'
    // BACKGROUND
    | 'color-bg-lightest'
    | 'color-bg-lighter'
    | 'color-bg-light'
    | 'color-bg-mid'
    | 'color-bg-dark'
    | 'color-bg-darker'
    | 'color-bg-darkest'
    | 'color-bg-surface'
    | 'color-bg-surface-alternate'
    | 'color-bg-surface-brand'
    | 'color-bg-surface-brand-hover'
    | 'color-bg-surface-brand-selected'
    | 'color-bg-fill'
    | 'color-bg-fill-disabled'
    | 'color-bg-fill-hover'
    | 'color-bg-fill-selected'
    | 'color-bg-fill-inverse'
    | 'color-bg-fill-inverse-hover'
    | 'color-bg-fill-alternate-disabled'
    | 'color-bg-fill-alternate-hover'
    | 'color-indicator-bg-fill'
    | 'color-action-bg-fill'
    | 'color-action-bg-fill-hover'
    | 'color-action-bg-fill-disabled'
    | 'color-feedback-bg-surface-success'
    | 'color-feedback-bg-surface-warning'
    | 'color-feedback-bg-surface-alert'
    | 'color-feedback-bg-surface-discovery'
    | 'color-feedback-bg-surface-informative'
    | 'color-feedback-bg-fill-success'
    | 'color-feedback-bg-fill-success-hover'
    | 'color-feedback-bg-fill-alert'
    | 'color-feedback-bg-fill-alert-hover'
    | 'color-feedback-bg-fill-warning'
    | 'color-feedback-bg-fill-warning-hover'
    | 'color-feedback-bg-fill-discovery'
    | 'color-feedback-bg-fill-discovery-hover'
    | 'color-feedback-bg-fill-informative'
    | 'color-feedback-bg-fill-informative-hover'
    // BORDER
    | 'color-border-lightest'
    | 'color-border-lighter'
    | 'color-border-light'
    | 'color-border-mid'
    | 'color-border-dark'
    | 'color-border-darker'
    | 'color-border-darkest'
    | 'color-border'
    | 'color-form-border'
    | 'color-separator'
    | 'color-border-alternate'
    | 'color-border-selected'
    | 'color-border-alternate-selected'
    | 'color-border-inverse'
    | 'color-border-disabled'
    | 'color-border-hover'
    | 'color-border-error'
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
    // CONTENT
    | 'color-content-lightest'
    | 'color-content-light'
    | 'color-content-mid'
    | 'color-content-dark'
    | 'color-content-darkest'
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
    // TEXT
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
    // ICON
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
    | 'color-feedback-icon-informative'

export type AliasTokenMap = {
    [Token in AliasTokens]: NoSelfReference<RefTokens | AliasTokens, Token>;
}

export const defaultAliasTokens: AliasTokenMap = {
    // GENERAL TIER
    'color-error': 'color-alert-50',
    'color-action-light': 'color-brand-20',
    'color-action-mid': 'color-brand-50',
    'color-action-dark': 'color-brand-70',
    'color-feedback-success-light': 'color-success-05',
    'color-feedback-success-mid': 'color-success-50',
    'color-feedback-success-dark': 'color-success-70',
    'color-feedback-alert-light': 'color-alert-05',
    'color-feedback-alert-mid': 'color-alert-50',
    'color-feedback-alert-dark': 'color-alert-70',
    'color-feedback-warning-light': 'color-warning-05',
    'color-feedback-warning-mid': 'color-warning-50',
    'color-feedback-warning-dark': 'color-warning-70',
    'color-feedback-discovery-light': 'color-discovery-05',
    'color-feedback-discovery-mid': 'color-discovery-50',
    'color-feedback-discovery-dark': 'color-discovery-70',
    'color-feedback-informative-light': 'color-informative-05',
    'color-feedback-informative-mid': 'color-informative-50',
    'color-feedback-informative-dark': 'color-informative-70',

    // BACKGROUND TIER
    // TIER 1
    'color-bg-lightest': 'color-white',
    'color-bg-lighter': 'color-neutral-02',
    'color-bg-light': 'color-neutral-05',
    'color-bg-mid': 'color-neutral-15',
    'color-bg-dark': 'color-neutral-30',
    'color-bg-darker': 'color-neutral-65',
    'color-bg-darkest': 'color-neutral-90',
    'color-action-bg-fill': 'color-action-mid',
    'color-action-bg-fill-hover': 'color-action-dark',
    'color-action-bg-fill-disabled': 'color-action-light',
    /*
     'color-feedback-bg-success-light': 'color-success-05',
     'color-feedback-bg-success-mid': 'color-success-50',
     'color-feedback-bg-success-dark': 'color-success-70',
     'color-feedback-bg-alert-light': 'color-alert-05',
     'color-feedback-bg-alert-mid': 'color-alert-50',
     'color-feedback-bg-alert-dark': 'color-alert-70',
     'color-feedback-bg-warning-light': 'color-warning-05',
     'color-feedback-bg-warning-mid': 'color-warning-50',
     'color-feedback-bg-warning-dark': 'color-warning-70',
     'color-feedback-bg-discovery-light': 'color-discovery-05',
     'color-feedback-bg-discovery-mid': 'color-discovery-50',
     'color-feedback-bg-discovery-dark': 'color-discovery-70',
     'color-feedback-bg-informative-light': 'color-informative-05',
     'color-feedback-bg-informative-mid': 'color-informative-50',
     'color-feedback-bg-informative-dark': 'color-informative-70',
     */
    'color-feedback-bg-surface-success': 'color-feedback-success-light',
    'color-feedback-bg-surface-warning': 'color-feedback-warning-light',
    'color-feedback-bg-surface-alert': 'color-feedback-alert-light',
    'color-feedback-bg-surface-discovery': 'color-feedback-discovery-light',
    'color-feedback-bg-surface-informative': 'color-feedback-informative-light',
    'color-feedback-bg-fill-success': 'color-feedback-success-mid',
    'color-feedback-bg-fill-success-hover': 'color-feedback-success-dark',
    'color-feedback-bg-fill-alert': 'color-feedback-alert-mid',
    'color-feedback-bg-fill-alert-hover': 'color-feedback-alert-dark',
    'color-feedback-bg-fill-warning': 'color-feedback-warning-mid',
    'color-feedback-bg-fill-warning-hover': 'color-feedback-warning-dark',
    'color-feedback-bg-fill-discovery': 'color-feedback-discovery-mid',
    'color-feedback-bg-fill-discovery-hover': 'color-feedback-discovery-dark',
    'color-feedback-bg-fill-informative': 'color-feedback-informative-mid',
    'color-feedback-bg-fill-informative-hover': 'color-feedback-informative-dark',

    // TIER 2
    'color-bg-surface': 'color-bg-lightest',
    'color-bg-surface-alternate': 'color-bg-lighter',
    'color-bg-fill': 'color-bg-lightest',
    'color-bg-fill-disabled': 'color-bg-light',
    'color-bg-fill-selected': 'color-bg-light',
    'color-bg-fill-hover': 'color-bg-mid',
    'color-bg-fill-alternate-disabled': 'color-bg-mid',
    'color-bg-fill-alternate-hover': 'color-bg-dark',
    'color-bg-fill-inverse': 'color-bg-darker',
    'color-bg-fill-inverse-hover': 'color-bg-darkest',

    'color-indicator-bg-fill': 'color-brand-50',
    'color-bg-surface-brand': 'color-brand-80',
    'color-bg-surface-brand-hover': 'color-brand-70',
    'color-bg-surface-brand-selected': 'color-brand-70',

    // BORDER TIER
    // TIER 1
    'color-action-border': 'color-action-mid',
    'color-action-border-hover': 'color-action-dark',
    'color-action-border-disabled': 'color-action-light',
    'color-feedback-border-success': 'color-feedback-success-mid',
    'color-feedback-border-warning': 'color-feedback-warning-mid',
    'color-feedback-border-alert': 'color-feedback-alert-mid',
    'color-feedback-border-discovery': 'color-feedback-discovery-mid',
    'color-feedback-border-informative': 'color-feedback-informative-mid',
    'color-border-error': 'color-error',
    'color-border-lightest': 'color-white',
    'color-border-lighter': 'color-neutral-05',
    'color-border-light': 'color-neutral-15',
    'color-border-mid': 'color-neutral-30',
    'color-border-dark': 'color-neutral-50',
    'color-border-darker': 'color-neutral-65',
    'color-border-darkest': 'color-neutral-90',
    'color-border-focus-outside': 'color-brand-50',
    'color-border-focus-inside': 'color-brand-20',

    // TIER 2
    'color-border': 'color-border-light',
    'color-border-inverse': 'color-border-lightest',
    'color-border-alternate': 'color-border-dark',
    'color-separator': 'color-border-light',
    'color-form-border': 'color-border-darker',
    'color-border-hover': 'color-border-darkest',
    'color-border-disabled': 'color-border-mid',
    'color-border-selected': 'color-brand-50',
    'color-border-alternate-selected': 'color-brand-70',
    'color-border-focus-outside-inverse': 'color-border-focus-inside',
    'color-border-focus-inside-inverse': 'color-border-focus-outside',

    // CONTENT TIER
    // TIER 1
    'color-content-error': 'color-error',
    'color-action-content': 'color-action-mid',
    'color-action-content-hover': 'color-action-dark',
    'color-action-content-disabled': 'color-action-light',

    'color-feedback-content-success': 'color-feedback-success-dark',
    'color-feedback-content-alert': 'color-feedback-alert-dark',
    'color-feedback-content-discovery': 'color-feedback-discovery-dark',
    'color-feedback-content-informative': 'color-feedback-discovery-dark',
    'color-feedback-content-warning': 'color-warning-80',

    'color-content-lightest': 'color-white',
    'color-content-light': 'color-neutral-30',
    'color-content-mid': 'color-neutral-65',
    'color-content-dark': 'color-neutral-90',
    'color-content-darkest': 'color-black',

    // TIER 2

    'color-content-inverse': 'color-content-lightest',
    'color-content-disabled': 'color-content-light',
    'color-content-alternate': 'color-content-mid',
    'color-content': 'color-content-dark',
    'color-content-hover': 'color-content-darkest',

    'color-content-brand': 'color-brand-70',
    'color-content-selected': 'color-brand-70',

    'color-link-content': 'color-informative-50',
    'color-link-content-disabled': 'color-informative-20',
    'color-link-content-hover': 'color-informative-70',
    'color-link-content-visited': 'color-discovery-50',

    // TEXT
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
    // ICON
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
