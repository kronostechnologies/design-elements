import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ButtonTokens =
    | 'button-primary-background-color'
    | 'button-primary-border-color'
    | 'button-primary-text-color'
    | 'button-primary-hover-background-color'
    | 'button-primary-hover-border-color'
    | 'button-primary-hover-text-color'
    | 'button-primary-disabled-background-color'
    | 'button-primary-disabled-border-color'
    | 'button-primary-disabled-text-color'
    | 'button-primary-inverted-background-color'
    | 'button-primary-inverted-border-color'
    | 'button-primary-inverted-text-color'
    | 'button-primary-inverted-hover-background-color'
    | 'button-primary-inverted-hover-border-color'
    | 'button-primary-inverted-hover-text-color'
    | 'button-primary-inverted-disabled-background-color'
    | 'button-primary-inverted-disabled-border-color'
    | 'button-primary-inverted-disabled-text-color'
    | 'button-secondary-background-color'
    | 'button-secondary-border-color'
    | 'button-secondary-text-color'
    | 'button-secondary-hover-background-color'
    | 'button-secondary-hover-border-color'
    | 'button-secondary-hover-text-color'
    | 'button-secondary-disabled-background-color'
    | 'button-secondary-disabled-border-color'
    | 'button-secondary-disabled-text-color'
    | 'button-secondary-inverted-background-color'
    | 'button-secondary-inverted-border-color'
    | 'button-secondary-inverted-text-color'
    | 'button-secondary-inverted-hover-background-color'
    | 'button-secondary-inverted-hover-border-color'
    | 'button-secondary-inverted-hover-text-color'
    | 'button-secondary-inverted-disabled-background-color'
    | 'button-secondary-inverted-disabled-border-color'
    | 'button-secondary-inverted-disabled-text-color'
    | 'button-tertiary-background-color'
    | 'button-tertiary-border-color'
    | 'button-tertiary-text-color'
    | 'button-tertiary-hover-background-color'
    | 'button-tertiary-hover-border-color'
    | 'button-tertiary-hover-text-color'
    | 'button-tertiary-disabled-background-color'
    | 'button-tertiary-disabled-border-color'
    | 'button-tertiary-disabled-text-color'
    | 'button-tertiary-inverted-background-color'
    | 'button-tertiary-inverted-border-color'
    | 'button-tertiary-inverted-text-color'
    | 'button-tertiary-inverted-hover-background-color'
    | 'button-tertiary-inverted-hover-border-color'
    | 'button-tertiary-inverted-hover-text-color'
    | 'button-tertiary-inverted-disabled-background-color'
    | 'button-tertiary-inverted-disabled-border-color'
    | 'button-tertiary-inverted-disabled-text-color'
    | 'button-destructive-background-color'
    | 'button-destructive-border-color'
    | 'button-destructive-text-color'
    | 'button-destructive-hover-background-color'
    | 'button-destructive-hover-border-color'
    | 'button-destructive-hover-text-color'
    | 'button-destructive-disabled-background-color'
    | 'button-destructive-disabled-border-color'
    | 'button-destructive-disabled-text-color'
    | 'button-destructive-inverted-background-color'
    | 'button-destructive-inverted-border-color'
    | 'button-destructive-inverted-text-color'
    | 'button-destructive-inverted-hover-background-color'
    | 'button-destructive-inverted-hover-border-color'
    | 'button-destructive-inverted-hover-text-color'
    | 'button-destructive-inverted-disabled-background-color'
    | 'button-destructive-inverted-disabled-border-color'
    | 'button-destructive-inverted-disabled-text-color'
    | 'button-destructive-secondary-background-color'
    | 'button-destructive-secondary-border-color'
    | 'button-destructive-secondary-text-color'
    | 'button-destructive-secondary-hover-background-color'
    | 'button-destructive-secondary-hover-border-color'
    | 'button-destructive-secondary-hover-text-color'
    | 'button-destructive-secondary-disabled-background-color'
    | 'button-destructive-secondary-disabled-border-color'
    | 'button-destructive-secondary-disabled-text-color'
    | 'button-destructive-secondary-inverted-background-color'
    | 'button-destructive-secondary-inverted-border-color'
    | 'button-destructive-secondary-inverted-text-color'
    | 'button-destructive-secondary-inverted-hover-background-color'
    | 'button-destructive-secondary-inverted-hover-border-color'
    | 'button-destructive-secondary-inverted-hover-text-color'
    | 'button-destructive-secondary-inverted-disabled-background-color'
    | 'button-destructive-secondary-inverted-disabled-border-color'
    | 'button-destructive-secondary-inverted-disabled-text-color'
    | 'button-destructive-tertiary-background-color'
    | 'button-destructive-tertiary-border-color'
    | 'button-destructive-tertiary-text-color'
    | 'button-destructive-tertiary-hover-background-color'
    | 'button-destructive-tertiary-hover-border-color'
    | 'button-destructive-tertiary-hover-text-color'
    | 'button-destructive-tertiary-disabled-background-color'
    | 'button-destructive-tertiary-disabled-border-color'
    | 'button-destructive-tertiary-disabled-text-color'
    | 'button-destructive-tertiary-focus-background-color'
    | 'button-destructive-tertiary-focus-border-color'
    | 'button-destructive-tertiary-focus-text-color'
    | 'button-destructive-tertiary-inverted-background-color'
    | 'button-destructive-tertiary-inverted-border-color'
    | 'button-destructive-tertiary-inverted-text-color'
    | 'button-destructive-tertiary-inverted-hover-background-color'
    | 'button-destructive-tertiary-inverted-hover-border-color'
    | 'button-destructive-tertiary-inverted-hover-text-color'
    | 'button-destructive-tertiary-inverted-focus-background-color'
    | 'button-destructive-tertiary-inverted-focus-border-color'
    | 'button-destructive-tertiary-inverted-focus-text-color'
    | 'button-destructive-tertiary-inverted-disabled-background-color'
    | 'button-destructive-tertiary-inverted-disabled-border-color'
    | 'button-destructive-tertiary-inverted-disabled-text-color'
    | 'button-input-background-color'
    | 'button-input-border-color'
    | 'button-input-text-color'
    | 'button-input-hover-background-color'
    | 'button-input-hover-border-color'
    | 'button-input-hover-text-color'
    | 'button-input-disabled-background-color'
    | 'button-input-disabled-border-color'
    | 'button-input-disabled-text-color';

export type ButtonTokenValue = AliasTokens | RefTokens;

export type ButtonTokenMap = {
    [Token in ButtonTokens]: ButtonTokenValue;
};

export const defaultButtonTokens: ButtonTokenMap = {
    // Primary
    'button-primary-background-color': 'color-action',
    'button-primary-border-color': 'color-action',
    'button-primary-text-color': 'color-action-inverse',
    // Primary hover
    'button-primary-hover-background-color': 'color-action-hover',
    'button-primary-hover-border-color': 'color-action-hover',
    'button-primary-hover-text-color': 'color-action-inverse',
    // Primary disabled
    'button-primary-disabled-background-color': 'color-action-disabled',
    'button-primary-disabled-border-color': 'color-action-disabled',
    'button-primary-disabled-text-color': 'color-action-inverse',

    // Primary inverted
    'button-primary-inverted-background-color': 'color-action-inverse',
    'button-primary-inverted-border-color': 'color-action-inverse',
    'button-primary-inverted-text-color': 'color-action',
    // Primary inverted hover
    'button-primary-inverted-hover-background-color': 'color-action-inverse-hover',
    'button-primary-inverted-hover-border-color': 'color-action-inverse-hover',
    'button-primary-inverted-hover-text-color': 'color-action-hover',
    // Primary inverted disabled
    'button-primary-inverted-disabled-background-color': 'color-action-inverse-disabled',
    'button-primary-inverted-disabled-border-color': 'color-action-inverse-disabled',
    'button-primary-inverted-disabled-text-color': 'color-action-disabled',

    // Secondary
    'button-secondary-background-color': 'transparent-100',
    'button-secondary-border-color': 'color-action',
    'button-secondary-text-color': 'color-action',
    // Secondary hover
    'button-secondary-hover-background-color': 'transparent-100',
    'button-secondary-hover-border-color': 'color-action-hover',
    'button-secondary-hover-text-color': 'color-action-hover',
    // Secondary disabled
    'button-secondary-disabled-background-color': 'transparent-100',
    'button-secondary-disabled-border-color': 'color-action-disabled',
    'button-secondary-disabled-text-color': 'color-action-disabled',
    // Secondary inverted
    'button-secondary-inverted-background-color': 'transparent-100',
    'button-secondary-inverted-border-color': 'color-action-inverse',
    'button-secondary-inverted-text-color': 'color-action-inverse',
    // Secondary inverted hover
    'button-secondary-inverted-hover-background-color': 'transparent-100',
    'button-secondary-inverted-hover-border-color': 'color-action-inverse-hover',
    'button-secondary-inverted-hover-text-color': 'color-action-inverse-hover',
    // Secondary inverted disabled
    'button-secondary-inverted-disabled-background-color': 'transparent-100',
    'button-secondary-inverted-disabled-border-color': 'color-action-inverse-disabled',
    'button-secondary-inverted-disabled-text-color': 'color-action-inverse-disabled',

    // Tertiary
    'button-tertiary-background-color': 'transparent-100',
    'button-tertiary-border-color': 'transparent-100',
    'button-tertiary-text-color': 'color-content-subtle',
    // Tertiary hover
    'button-tertiary-hover-background-color': 'transparent-dark-25',
    'button-tertiary-hover-border-color': 'transparent-100',
    'button-tertiary-hover-text-color': 'color-content-hover',
    // Tertiary disabled
    'button-tertiary-disabled-background-color': 'transparent-100',
    'button-tertiary-disabled-border-color': 'transparent-100',
    'button-tertiary-disabled-text-color': 'color-content-disabled',

    // Tertiary inverted
    'button-tertiary-inverted-background-color': 'transparent-100',
    'button-tertiary-inverted-border-color': 'transparent-100',
    'button-tertiary-inverted-text-color': 'color-action-inverse',
    // Tertiary inverted hover
    'button-tertiary-inverted-hover-background-color': 'transparent-dark-50',
    'button-tertiary-inverted-hover-border-color': 'transparent-100',
    'button-tertiary-inverted-hover-text-color': 'color-action-inverse',
    // Tertiary inverted disabled
    'button-tertiary-inverted-disabled-background-color': 'transparent-100',
    'button-tertiary-inverted-disabled-border-color': 'transparent-100',
    'button-tertiary-inverted-disabled-text-color': 'color-action-inverse-disabled',

    // Destructive
    'button-destructive-background-color': 'color-action-destructive',
    'button-destructive-border-color': 'color-action-destructive',
    'button-destructive-text-color': 'color-action-inverse',
    // Destructive hover
    'button-destructive-hover-background-color': 'color-action-destructive-hover',
    'button-destructive-hover-border-color': 'color-action-destructive-hover',
    'button-destructive-hover-text-color': 'color-action-inverse',
    // Destructive disabled
    'button-destructive-disabled-background-color': 'color-action-destructive-disabled',
    'button-destructive-disabled-border-color': 'color-action-destructive-disabled',
    'button-destructive-disabled-text-color': 'color-action-inverse',

    // Destructive inverted
    'button-destructive-inverted-background-color': 'color-action-inverse',
    'button-destructive-inverted-border-color': 'color-action-inverse',
    'button-destructive-inverted-text-color': 'color-action-destructive',
    // Destructive inverted hover
    'button-destructive-inverted-hover-background-color': 'color-action-inverse',
    'button-destructive-inverted-hover-border-color': 'color-action-inverse',
    'button-destructive-inverted-hover-text-color': 'color-action-destructive-hover',
    // Destructive inverted disabled
    'button-destructive-inverted-disabled-background-color': 'color-action-inverse',
    'button-destructive-inverted-disabled-border-color': 'color-action-inverse',
    'button-destructive-inverted-disabled-text-color': 'color-action-destructive-disabled',

    // Secondary destructive
    'button-destructive-secondary-background-color': 'transparent-100',
    'button-destructive-secondary-border-color': 'color-action-destructive',
    'button-destructive-secondary-text-color': 'color-action-destructive',
    // Secondary destructive hover
    'button-destructive-secondary-hover-background-color': 'transparent-100',
    'button-destructive-secondary-hover-border-color': 'color-action-destructive-hover',
    'button-destructive-secondary-hover-text-color': 'color-action-destructive-hover',
    // Secondary destructive disabled
    'button-destructive-secondary-disabled-background-color': 'transparent-100',
    'button-destructive-secondary-disabled-border-color': 'color-action-destructive-disabled',
    'button-destructive-secondary-disabled-text-color': 'color-action-destructive-disabled',

    // Secondary destructive inverted
    'button-destructive-secondary-inverted-background-color': 'transparent-100',
    'button-destructive-secondary-inverted-border-color': 'color-action-destructive',
    'button-destructive-secondary-inverted-text-color': 'color-action-destructive',
    // Secondary destructive inverted hover
    'button-destructive-secondary-inverted-hover-background-color': 'transparent-100',
    'button-destructive-secondary-inverted-hover-border-color': 'color-action-destructive-hover',
    'button-destructive-secondary-inverted-hover-text-color': 'color-action-destructive-hover',
    // Secondary destructive inverted disabled
    'button-destructive-secondary-inverted-disabled-background-color': 'transparent-100',
    'button-destructive-secondary-inverted-disabled-border-color': 'color-alert-20',
    'button-destructive-secondary-inverted-disabled-text-color': 'color-alert-20',

    // Tertiary destructive
    'button-destructive-tertiary-background-color': 'transparent-100',
    'button-destructive-tertiary-border-color': 'transparent-100',
    'button-destructive-tertiary-text-color': 'color-alert-50',
    // Tertiary destructive hover
    'button-destructive-tertiary-hover-background-color': 'color-alert-05',
    'button-destructive-tertiary-hover-border-color': 'transparent-100',
    'button-destructive-tertiary-hover-text-color': 'color-alert-70',
    // Tertiary destructive focus
    'button-destructive-tertiary-focus-background-color': 'transparent-100',
    'button-destructive-tertiary-focus-border-color': 'transparent-100',
    'button-destructive-tertiary-focus-text-color': 'color-alert-50',
    // Tertiary destructive disabled
    'button-destructive-tertiary-disabled-background-color': 'transparent-100',
    'button-destructive-tertiary-disabled-border-color': 'transparent-100',
    'button-destructive-tertiary-disabled-text-color': 'color-alert-20',

    // Tertiairy destructive inverted
    'button-destructive-tertiary-inverted-background-color': 'transparent-100',
    'button-destructive-tertiary-inverted-border-color': 'transparent-100',
    'button-destructive-tertiary-inverted-text-color': 'color-alert-50',
    // Tertiairy destructive inverted hover
    'button-destructive-tertiary-inverted-hover-background-color': 'color-alert-05',
    'button-destructive-tertiary-inverted-hover-border-color': 'transparent-100',
    'button-destructive-tertiary-inverted-hover-text-color': 'color-alert-70',
    // Tertiairy destructive inverted focus
    'button-destructive-tertiary-inverted-focus-background-color': 'transparent-100',
    'button-destructive-tertiary-inverted-focus-border-color': 'transparent-100',
    'button-destructive-tertiary-inverted-focus-text-color': 'color-alert-20',
    // Tertiairy destructive inverted disabled
    'button-destructive-tertiary-inverted-disabled-background-color': 'transparent-100',
    'button-destructive-tertiary-inverted-disabled-border-color': 'transparent-100',
    'button-destructive-tertiary-inverted-disabled-text-color': 'color-alert-20',

    // Input button
    'button-input-background-color': 'color-input-bg',
    'button-input-border-color': 'color-input-border',
    'button-input-text-color': 'color-input-content',
    // Input button hover
    'button-input-hover-background-color': 'color-input-bg-hover',
    'button-input-hover-border-color': 'color-input-border-hover',
    'button-input-hover-text-color': 'color-input-content-hover',
    // Input button disabled
    'button-input-disabled-background-color': 'color-input-bg-disabled',
    'button-input-disabled-border-color': 'color-input-border-disabled',
    'button-input-disabled-text-color': 'color-input-content-disabled',
};
