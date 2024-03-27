import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToastTokens =
    | 'toast-neutral-background-color'
    | 'toast-neutral-text-color'
    | 'toast-neutral-icon-color'
    | 'toast-neutral-dismiss-icon-hover-background-color'
    | 'toast-discovery-background-color'
    | 'toast-discovery-text-color'
    | 'toast-discovery-icon-color'
    | 'toast-discovery-dismiss-icon-hover-background-color'
    | 'toast-success-background-color'
    | 'toast-success-text-color'
    | 'toast-success-icon-color'
    | 'toast-success-dismiss-icon-hover-background-color'
    | 'toast-warning-background-color'
    | 'toast-warning-text-color'
    | 'toast-warning-icon-color'
    | 'toast-warning-dismiss-icon-hover-background-color'
    | 'toast-alert-background-color'
    | 'toast-alert-text-color'
    | 'toast-alert-icon-color'
    | 'toast-alert-dismiss-icon-hover-background-color'
    | 'toast-dismiss-icon-focus-box-shadow';

export type ToastTokenValue = AliasTokens | RefTokens;

export type ToastTokenMap = {
    [Token in ToastTokens]: ToastTokenValue;
};

export const defaultToastTokens: ToastTokenMap = {
    'toast-neutral-background-color': 'color-bg-neutral-bold',
    'toast-discovery-background-color': 'color-feedback-bg-discovery-bold',
    'toast-success-background-color': 'color-feedback-bg-success-bold',
    'toast-warning-background-color': 'color-feedback-bg-warning-bold',
    'toast-alert-background-color': 'color-feedback-bg-alert-bold',
    'toast-neutral-text-color': 'color-content-inverse',
    'toast-neutral-icon-color': 'color-content-inverse',
    'toast-discovery-text-color': 'color-content-inverse',
    'toast-discovery-icon-color': 'color-content-inverse',
    'toast-success-text-color': 'color-content-inverse',
    'toast-success-icon-color': 'color-content-inverse',
    'toast-warning-text-color': 'color-content',
    'toast-warning-icon-color': 'color-content',
    'toast-alert-text-color': 'color-content-inverse',
    'toast-alert-icon-color': 'color-content-inverse',
    'toast-neutral-dismiss-icon-hover-background-color': 'transparent-dark-50',
    'toast-discovery-dismiss-icon-hover-background-color': 'transparent-dark-50',
    'toast-success-dismiss-icon-hover-background-color': 'transparent-dark-50',
    'toast-warning-dismiss-icon-hover-background-color': 'transparent-dark-30',
    'toast-alert-dismiss-icon-hover-background-color': 'transparent-dark-50',
    'toast-dismiss-icon-focus-box-shadow': 'color-brand-20',
};
