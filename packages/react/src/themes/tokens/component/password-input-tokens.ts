import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type PasswordInputTokens =
    | 'password-input-show-password-button-background-color'
    | 'password-input-show-password-button-disabled-background-color'
    | 'password-input-show-password-button-border-color'
    | 'password-input-show-password-button-disabled-border-color'
    | 'password-input-show-password-button-error-border-color'
    | 'password-input-show-password-button-focus-within-border-color'
    
    | 'password-creation-input-focus-within-shadow-color'
    | 'password-creation-input-focus-within-border-color'
    | 'password-creation-input-border-color'
    | 'password-creation-input-error-border-color'
    | 'password-rule-empty-text-color'
    | 'password-rule-success-text-color'
    | 'password-rule-error-text-color'
    | 'password-strength-label-text-color'
    | 'password-strength-meter-empty-color'
    | 'password-strength-meter-weak-color'
    | 'password-strength-meter-fair-color'
    | 'password-strength-meter-good-color'
    | 'password-strength-meter-strong-color'

export type PasswordInputTokenValue = AliasTokens | RefTokens;

export type PasswordInputTokenMap = {
    [Token in PasswordInputTokens]: PasswordInputTokenValue;
};

export const defaultPasswordInputTokens: PasswordInputTokenMap = {
    'password-rule-empty-text-color': 'color-content-subtle',
    'password-rule-error-text-color': 'color-input-content-error',
    'password-rule-success-text-color': 'color-input-content-success',

    'password-strength-label-text-color': 'color-content-subtle',

    'password-strength-meter-empty-color': 'color-neutral-30',
    'password-strength-meter-weak-color': 'color-alert-50',
    'password-strength-meter-fair-color': 'color-warning-50',
    'password-strength-meter-good-color': 'color-success-50',
    'password-strength-meter-strong-color': 'color-success-70',

    'password-input-show-password-button-background-color': 'color-white',
    'password-input-show-password-button-border-color': 'color-neutral-65',
    'password-input-show-password-button-disabled-background-color': 'color-neutral-05',
    'password-input-show-password-button-disabled-border-color': 'color-neutral-15',
    'password-input-show-password-button-error-border-color': 'color-alert-50',
    'password-input-show-password-button-focus-within-border-color': 'color-brand-50',
    'password-creation-input-border-color': 'color-neutral-65',
    'password-creation-input-focus-within-border-color': 'color-brand-50',
    'password-creation-input-focus-within-shadow-color': 'color-brand-20',
    'password-creation-input-error-border-color': 'color-alert-50',
};
