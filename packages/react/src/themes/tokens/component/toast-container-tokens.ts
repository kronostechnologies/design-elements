import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToastContainerTokens =
    | 'toast-container-default-text-color'
    | 'toast-container-alternate-text-color'
    | 'toast-container-neutral-background-color'
    | 'toast-container-neutral-dismiss-icon-hover-background-color'
    | 'toast-container-neutral-dismiss-icon-hover-color'
    | 'toast-container-discovery-background-color'
    | 'toast-container-discovery-dismiss-icon-hover-background-color'
    | 'toast-container-discovery-dismiss-icon-hover-color'
    | 'toast-container-success-background-color'
    | 'toast-container-success-dismiss-icon-hover-background-color'
    | 'toast-container-success-dismiss-icon-hover-color'
    | 'toast-container-warning-background-color'
    | 'toast-container-warning-dismiss-icon-hover-background-color'
    | 'toast-container-warning-dismiss-icon-hover-color'
    | 'toast-container-alert-background-color'
    | 'toast-container-alert-dismiss-icon-hover-background-color'
    | 'toast-container-alert-dismiss-icon-hover-color'
    | 'toast-container-dismiss-icon-focus-box-shadow';

export type ToastContainerTokenValue = AliasTokens | RefTokens;

export type ToastContainerTokenMap = {
    [Token in ToastContainerTokens]: ToastContainerTokenValue;
};

export const defaultToastContainerTokens: ToastContainerTokenMap = {
    'toast-container-default-text-color': 'color-white',
    'toast-container-alternate-text-color': 'color-neutral-90',
    'toast-container-neutral-background-color': 'color-neutral-65',
    'toast-container-neutral-dismiss-icon-hover-background-color': 'color-neutral-80',
    'toast-container-neutral-dismiss-icon-hover-color': 'color-white',
    'toast-container-discovery-background-color': 'color-discovery-50',
    'toast-container-discovery-dismiss-icon-hover-background-color': 'color-discovery-70',
    'toast-container-discovery-dismiss-icon-hover-color': 'color-white',
    'toast-container-success-background-color': 'color-success-50',
    'toast-container-success-dismiss-icon-hover-background-color': 'color-success-70',
    'toast-container-success-dismiss-icon-hover-color': 'color-white',
    'toast-container-warning-background-color': 'color-warning-50',
    'toast-container-warning-dismiss-icon-hover-background-color': 'color-warning-60',
    'toast-container-warning-dismiss-icon-hover-color': 'color-black',
    'toast-container-alert-background-color': 'color-alert-50',
    'toast-container-alert-dismiss-icon-hover-background-color': 'color-alert-70',
    'toast-container-alert-dismiss-icon-hover-color': 'color-white',
    'toast-container-dismiss-icon-focus-box-shadow': 'color-brand-20',
};
