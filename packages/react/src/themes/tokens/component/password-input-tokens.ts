import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type PasswordInputTokens =
    | 'password-input-show-password-button-background-color'
    | 'password-input-show-password-button-disabled-background-color'
    | 'password-input-show-password-button-border-color'
    | 'password-input-show-password-button-disabled-border-color'
    | 'password-input-show-password-button-invalid-border-color'
    | 'password-input-show-password-button-focus-within-border-color'
    | 'password-creation-input-focus-within-shadow-color'
    | 'password-creation-input-focus-within-border-color'
    | 'password-creation-input-border-color'
    | 'password-creation-input-invalid-border-color'
    | 'password-rule-empty-text-color'
    | 'password-rule-success-text-color'
    | 'password-rule-invalid-text-color'
    | 'password-strength-label-text-color'
    | 'password-strength-empty-color'
    | 'password-strength-weak-color'
    | 'password-strength-fair-color'
    | 'password-strength-good-color'
    | 'password-strength-strong-color'

export type PasswordInputTokenValue = AliasTokens | RefTokens;

export type PasswordInputTokenMap = {
    [Token in PasswordInputTokens]: PasswordInputTokenValue;
};

export const defaultPasswordInputTokens: PasswordInputTokenMap = {
    'password-input-show-password-button-background-color': 'color-white',
    'password-input-show-password-button-border-color': 'color-neutral-65',
    'password-input-show-password-button-disabled-background-color': 'color-neutral-05',
    'password-input-show-password-button-disabled-border-color': 'color-neutral-15',
    'password-input-show-password-button-invalid-border-color': 'color-alert-50',
    'password-input-show-password-button-focus-within-border-color': 'color-brand-50',
    'password-creation-input-border-color': 'color-neutral-65',
    'password-creation-input-focus-within-border-color': 'color-brand-50',
    'password-creation-input-focus-within-shadow-color': 'color-brand-20',
    'password-creation-input-invalid-border-color': 'color-alert-50',
    'password-rule-empty-text-color': 'color-neutral-65',
    'password-rule-invalid-text-color': 'color-alert-50',
    'password-rule-success-text-color': 'color-success-50',
    'password-strength-empty-color': 'color-neutral-30',
    'password-strength-weak-color': 'color-alert-50',
    'password-strength-fair-color': 'color-warning-50',
    'password-strength-good-color': 'color-success-20',
    'password-strength-label-text-color': 'color-neutral-65',
    'password-strength-strong-color': 'color-success-50',
};
