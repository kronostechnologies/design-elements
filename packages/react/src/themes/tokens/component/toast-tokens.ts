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
    'toast-neutral-text-color': 'color-content-inverse',
    'toast-neutral-dismiss-icon-hover-color': 'color-content-inverse',
    'toast-neutral-dismiss-icon-hover-background-color': 'color-bg-inverse-hover',
    'toast-discovery-background-color': 'color-feedback-bg-discovery-bold',
    'toast-discovery-text-color': 'color-content-inverse',
    'toast-discovery-dismiss-icon-hover-color': 'color-content-inverse',
    'toast-discovery-dismiss-icon-hover-background-color': 'color-feedback-bg-discovery-hover',
    'toast-success-background-color': 'color-feedback-bg-success-bold',
    'toast-success-text-color': 'color-content-inverse',
    'toast-success-dismiss-icon-hover-color': 'color-content-inverse',
    'toast-success-dismiss-icon-hover-background-color': 'color-feedback-bg-success-hover',
    'toast-warning-background-color': 'color-feedback-bg-warning-bold',
    'toast-warning-text-color': 'color-content',
    'toast-warning-dismiss-icon-hover-color': 'color-content',
    'toast-warning-dismiss-icon-hover-background-color': 'color-feedback-bg-warning-hover',
    'toast-alert-background-color': 'color-feedback-bg-alert-bold',
    'toast-alert-text-color': 'color-content-inverse',
    'toast-alert-dismiss-icon-hover-color': 'color-content-inverse',
    'toast-alert-dismiss-icon-hover-background-color': 'color-feedback-bg-alert-hover',
    'toast-dismiss-icon-focus-box-shadow': 'color-brand-20',
};
