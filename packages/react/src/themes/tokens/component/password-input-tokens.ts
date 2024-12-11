import type { ComponentTokenMap } from '../tokens';

export type PasswordInputToken =
    | 'password-rule-empty-text-color'
    | 'password-rule-success-text-color'
    | 'password-rule-error-text-color'
    | 'password-strength-label-text-color'
    | 'password-strength-meter-empty-color'
    | 'password-strength-meter-weak-color'
    | 'password-strength-meter-fair-color'
    | 'password-strength-meter-good-color'
    | 'password-strength-meter-strong-color'

export const defaultPasswordInputTokens: ComponentTokenMap<PasswordInputToken> = {
    'password-rule-empty-text-color': 'color-content-subtle',
    'password-rule-error-text-color': 'color-control-auxiliary-error',
    'password-rule-success-text-color': 'color-control-auxiliary-success',
    'password-strength-label-text-color': 'color-content-subtle',
    'password-strength-meter-empty-color': 'color-background-empty',
    'password-strength-meter-weak-color': 'color-alert-50',
    'password-strength-meter-fair-color': 'color-warning-50',
    'password-strength-meter-good-color': 'color-success-50',
    'password-strength-meter-strong-color': 'color-success-70',
};
