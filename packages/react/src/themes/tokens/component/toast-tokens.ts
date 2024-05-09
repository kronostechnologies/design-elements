import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToastTokens =
    | 'toast-neutral-background-color'
    | 'toast-neutral-text-color'
    | 'toast-neutral-icon-color'
    | 'toast-discovery-background-color'
    | 'toast-discovery-text-color'
    | 'toast-discovery-icon-color'
    | 'toast-success-background-color'
    | 'toast-success-text-color'
    | 'toast-success-icon-color'
    | 'toast-warning-background-color'
    | 'toast-warning-text-color'
    | 'toast-warning-icon-color'
    | 'toast-alert-background-color'
    | 'toast-alert-text-color'
    | 'toast-alert-icon-color';

export type ToastTokenValue = AliasTokens | RefTokens;

export type ToastTokenMap = {
    [Token in ToastTokens]: ToastTokenValue;
};

export const defaultToastTokens: ToastTokenMap = {
    'toast-neutral-background-color': 'color-bg-neutral-bold',
    'toast-neutral-text-color': 'color-content-inverse',
    'toast-neutral-icon-color': 'color-content-inverse',

    'toast-discovery-background-color': 'color-feedback-bg-discovery-bold',
    'toast-discovery-text-color': 'color-content-inverse',
    'toast-discovery-icon-color': 'color-content-inverse',

    'toast-success-background-color': 'color-feedback-bg-success-bold',
    'toast-success-text-color': 'color-content-inverse',
    'toast-success-icon-color': 'color-content-inverse',

    'toast-warning-background-color': 'color-feedback-bg-warning-bold',
    'toast-warning-text-color': 'color-content',
    'toast-warning-icon-color': 'color-content',

    'toast-alert-background-color': 'color-feedback-bg-alert-bold',
    'toast-alert-text-color': 'color-content-inverse',
    'toast-alert-icon-color': 'color-content-inverse',
};
