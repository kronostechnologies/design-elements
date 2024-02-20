import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToastContainerTokens =
    | 'toast-container-information-background'
    | 'toast-container-success-background'
    | 'toast-container-warning-background'
    | 'toast-container-error-background'
    | 'toast-container-dismiss-icon-information-hover-background-color'
    | 'toast-container-dismiss-icon-information-hover-color'
    | 'toast-container-dismiss-icon-success-hover-background-color'
    | 'toast-container-dismiss-icon-success-hover-color'
    | 'toast-container-dismiss-icon-warning-hover-background-color'
    | 'toast-container-dismiss-icon-warning-hover-color'
    | 'toast-container-dismiss-icon-error-hover-background-color'
    | 'toast-container-dismiss-icon-error-hover-color'
    | 'toast-container-dismiss-icon-focus-box-shadow'
    | 'toast-container-default-text-color'
    | 'toast-container-warning-text-color';

export type ToastContainerTokenValue = AliasTokens | RefTokens;

export type ToastContainerTokenMap = {
    [Token in ToastContainerTokens]: ToastContainerTokenValue;
};

export const defaultToastContainerTokens: ToastContainerTokenMap = {
    'toast-container-information-background': 'color-informative-50',
    'toast-container-success-background': 'color-success-50',
    'toast-container-warning-background': 'color-warning-50',
    'toast-container-error-background': 'color-alert-50',
    'toast-container-dismiss-icon-information-hover-background-color': 'color-discovery-70',
    'toast-container-dismiss-icon-information-hover-color': 'color-white',
    'toast-container-dismiss-icon-success-hover-background-color': 'color-success-70',
    'toast-container-dismiss-icon-success-hover-color': 'color-white',
    'toast-container-dismiss-icon-warning-hover-background-color': 'color-warning-70',
    'toast-container-dismiss-icon-warning-hover-color': 'color-black',
    'toast-container-dismiss-icon-error-hover-background-color': 'color-alert-70',
    'toast-container-dismiss-icon-error-hover-color': 'color-white',
    'toast-container-dismiss-icon-focus-box-shadow': 'color-brand-20',
    'toast-container-default-text-color': 'color-white',
    'toast-container-warning-text-color': 'color-black',
};
