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
    'toast-neutral-background-color': 'color-neutral-65',
    'toast-neutral-text-color': 'color-white',
    'toast-neutral-icon-color': 'color-white',

    'toast-alert-background-color': 'color-alert-50',
    'toast-alert-text-color': 'color-white',
    'toast-alert-icon-color': 'color-white',

    'toast-discovery-background-color': 'color-discovery-50',
    'toast-discovery-text-color': 'color-white',
    'toast-discovery-icon-color': 'color-white',

    'toast-success-background-color': 'color-success-50',
    'toast-success-text-color': 'color-white',
    'toast-success-icon-color': 'color-white',

    'toast-warning-background-color': 'color-warning-50',
    'toast-warning-text-color': 'color-neutral-90',
    'toast-warning-icon-color': 'color-neutral-90',
};
