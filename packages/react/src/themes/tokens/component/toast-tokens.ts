import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToastTokens =
    | 'toast-neutral-background-color'
    | 'toast-neutral-text-color'
    | 'toast-neutral-dismiss-icon-hover-background-color'
    | 'toast-neutral-dismiss-icon-hover-color'
    | 'toast-discovery-background-color'
    | 'toast-discovery-text-color'
    | 'toast-discovery-dismiss-icon-hover-background-color'
    | 'toast-discovery-dismiss-icon-hover-color'
    | 'toast-success-background-color'
    | 'toast-success-text-color'
    | 'toast-success-dismiss-icon-hover-background-color'
    | 'toast-success-dismiss-icon-hover-color'
    | 'toast-warning-background-color'
    | 'toast-warning-text-color'
    | 'toast-warning-dismiss-icon-hover-background-color'
    | 'toast-warning-dismiss-icon-hover-color'
    | 'toast-alert-background-color'
    | 'toast-alert-text-color'
    | 'toast-alert-dismiss-icon-hover-background-color'
    | 'toast-alert-dismiss-icon-hover-color'
    | 'toast-dismiss-icon-focus-box-shadow';

export type ToastTokenValue = AliasTokens | RefTokens;

export type ToastTokenMap = {
    [Token in ToastTokens]: ToastTokenValue;
};

export const defaultToastTokens: ToastTokenMap = {
    'toast-neutral-background-color': 'color-bg-inverse',
    'toast-neutral-text-color': 'color-text-inverse',
    'toast-neutral-dismiss-icon-hover-color': 'color-icon-inverse',
    'toast-neutral-dismiss-icon-hover-background-color': 'color-bg-inverse-hover',
    'toast-discovery-background-color': 'color-feedback-bg-discovery',
    'toast-discovery-text-color': 'color-text-inverse',
    'toast-discovery-dismiss-icon-hover-color': 'color-icon-inverse',
    'toast-discovery-dismiss-icon-hover-background-color': 'color-feedback-bg-discovery-hover',
    'toast-success-background-color': 'color-feedback-bg-success',
    'toast-success-text-color': 'color-text-inverse',
    'toast-success-dismiss-icon-hover-color': 'color-icon-inverse',
    'toast-success-dismiss-icon-hover-background-color': 'color-feedback-bg-success-hover',
    'toast-warning-background-color': 'color-feedback-bg-warning',
    'toast-warning-text-color': 'color-text',
    'toast-warning-dismiss-icon-hover-color': 'color-icon',
    'toast-warning-dismiss-icon-hover-background-color': 'color-feedback-bg-warning-hover',
    'toast-alert-background-color': 'color-feedback-bg-alert',
    'toast-alert-text-color': 'color-text-inverse',
    'toast-alert-dismiss-icon-hover-color': 'color-icon-inverse',
    'toast-alert-dismiss-icon-hover-background-color': 'color-feedback-bg-alert-hover',
    'toast-dismiss-icon-focus-box-shadow': 'color-brand-20',
};
