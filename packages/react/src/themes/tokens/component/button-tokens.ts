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
    | 'button-destructive-primary-background-color'
    | 'button-destructive-primary-border-color'
    | 'button-destructive-primary-text-color'
    | 'button-destructive-primary-hover-background-color'
    | 'button-destructive-primary-hover-border-color'
    | 'button-destructive-primary-hover-text-color'
    | 'button-destructive-primary-disabled-background-color'
    | 'button-destructive-primary-disabled-border-color'
    | 'button-destructive-primary-disabled-text-color'
    | 'button-destructive-primary-inverted-background-color'
    | 'button-destructive-primary-inverted-border-color'
    | 'button-destructive-primary-inverted-text-color'
    | 'button-destructive-primary-inverted-hover-background-color'
    | 'button-destructive-primary-inverted-hover-border-color'
    | 'button-destructive-primary-inverted-hover-text-color'
    | 'button-destructive-primary-inverted-disabled-background-color'
    | 'button-destructive-primary-inverted-disabled-border-color'
    | 'button-destructive-primary-inverted-disabled-text-color'
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
    | 'button-destructive-tertiary-inverted-background-color'
    | 'button-destructive-tertiary-inverted-border-color'
    | 'button-destructive-tertiary-inverted-text-color'
    | 'button-destructive-tertiary-inverted-hover-background-color'
    | 'button-destructive-tertiary-inverted-hover-border-color'
    | 'button-destructive-tertiary-inverted-hover-text-color'
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
    'button-primary-background-color': 'color-brand-50',
    'button-primary-border-color': 'color-brand-50',
    'button-primary-text-color': 'color-white',
    // Primary hover
    'button-primary-hover-background-color': 'color-brand-70',
    'button-primary-hover-border-color': 'color-brand-70',
    'button-primary-hover-text-color': 'color-white',
    // Primary disabled
    'button-primary-disabled-background-color': 'color-brand-20',
    'button-primary-disabled-border-color': 'color-brand-20',
    'button-primary-disabled-text-color': 'color-white',

    // Primary inverted
    'button-primary-inverted-background-color': 'color-white',
    'button-primary-inverted-border-color': 'color-white',
    'button-primary-inverted-text-color': 'color-brand-50',
    // Primary inverted hover
    'button-primary-inverted-hover-background-color': 'color-white',
    'button-primary-inverted-hover-border-color': 'color-white',
    'button-primary-inverted-hover-text-color': 'color-brand-70',
    // Primary inverted disabled
    'button-primary-inverted-disabled-background-color': 'color-white',
    'button-primary-inverted-disabled-border-color': 'color-white',
    'button-primary-inverted-disabled-text-color': 'color-brand-20',

    // Secondary
    'button-secondary-background-color': 'color-white',
    'button-secondary-border-color': 'color-brand-50',
    'button-secondary-text-color': 'color-brand-50',
    // Secondary hover
    'button-secondary-hover-background-color': 'color-white',
    'button-secondary-hover-border-color': 'color-brand-70',
    'button-secondary-hover-text-color': 'color-brand-70',
    // Secondary disabled
    'button-secondary-disabled-background-color': 'color-white',
    'button-secondary-disabled-border-color': 'color-brand-20',
    'button-secondary-disabled-text-color': 'color-brand-20',
    // Secondary inverted
    'button-secondary-inverted-background-color': 'transparent-100',
    'button-secondary-inverted-border-color': 'color-white',
    'button-secondary-inverted-text-color': 'color-white',
    // Secondary inverted hover
    'button-secondary-inverted-hover-background-color': 'transparent-100',
    'button-secondary-inverted-hover-border-color': 'color-brand-20',
    'button-secondary-inverted-hover-text-color': 'color-brand-20',
    // Secondary inverted disabled
    'button-secondary-inverted-disabled-background-color': 'transparent-100',
    'button-secondary-inverted-disabled-border-color': 'color-brand-50',
    'button-secondary-inverted-disabled-text-color': 'color-brand-50',

    // Tertiary
    'button-tertiary-background-color': 'transparent-100',
    'button-tertiary-border-color': 'transparent-100',
    'button-tertiary-text-color': 'color-neutral-65',
    // Tertiary hover
    'button-tertiary-hover-background-color': 'transparent-25',
    'button-tertiary-hover-border-color': 'transparent-100',
    'button-tertiary-hover-text-color': 'color-neutral-90',
    // Tertiary disabled
    'button-tertiary-disabled-background-color': 'transparent-100',
    'button-tertiary-disabled-border-color': 'transparent-100',
    'button-tertiary-disabled-text-color': 'color-neutral-30',

    // Tertiary inverted
    'button-tertiary-inverted-background-color': 'transparent-100',
    'button-tertiary-inverted-border-color': 'transparent-100',
    'button-tertiary-inverted-text-color': 'color-white',
    // Tertiary inverted hover
    'button-tertiary-inverted-hover-background-color': 'transparent-50',
    'button-tertiary-inverted-hover-border-color': 'transparent-100',
    'button-tertiary-inverted-hover-text-color': 'color-white',
    // Tertiary inverted disabled
    'button-tertiary-inverted-disabled-background-color': 'transparent-100',
    'button-tertiary-inverted-disabled-border-color': 'transparent-100',
    'button-tertiary-inverted-disabled-text-color': 'color-brand-50',

    // Destructive
    'button-destructive-primary-background-color': 'color-alert-50',
    'button-destructive-primary-border-color': 'color-alert-50',
    'button-destructive-primary-text-color': 'color-white',
    // Destructive hover
    'button-destructive-primary-hover-background-color': 'color-alert-70',
    'button-destructive-primary-hover-border-color': 'color-alert-70',
    'button-destructive-primary-hover-text-color': 'color-white',
    // Destructive disabled
    'button-destructive-primary-disabled-background-color': 'color-alert-20',
    'button-destructive-primary-disabled-border-color': 'color-alert-20',
    'button-destructive-primary-disabled-text-color': 'color-white',

    // Destructive inverted
    'button-destructive-primary-inverted-background-color': 'color-white',
    'button-destructive-primary-inverted-border-color': 'color-white',
    'button-destructive-primary-inverted-text-color': 'color-alert-50',
    // Destructive inverted hover
    'button-destructive-primary-inverted-hover-background-color': 'color-white',
    'button-destructive-primary-inverted-hover-border-color': 'color-white',
    'button-destructive-primary-inverted-hover-text-color': 'color-alert-70',
    // Destructive inverted disabled
    'button-destructive-primary-inverted-disabled-background-color': 'color-white',
    'button-destructive-primary-inverted-disabled-border-color': 'color-white',
    'button-destructive-primary-inverted-disabled-text-color': 'color-alert-20',

    // Secondary destructive
    'button-destructive-secondary-background-color': 'color-white',
    'button-destructive-secondary-border-color': 'color-alert-50',
    'button-destructive-secondary-text-color': 'color-alert-50',
    // Secondary destructive hover
    'button-destructive-secondary-hover-background-color': 'color-white',
    'button-destructive-secondary-hover-border-color': 'color-alert-70',
    'button-destructive-secondary-hover-text-color': 'color-alert-70',
    // Secondary destructive disabled
    'button-destructive-secondary-disabled-background-color': 'color-white',
    'button-destructive-secondary-disabled-border-color': 'color-alert-20',
    'button-destructive-secondary-disabled-text-color': 'color-alert-20',

    // Secondary destructive inverted
    'button-destructive-secondary-inverted-background-color': 'transparent-100',
    'button-destructive-secondary-inverted-border-color': 'color-alert-50',
    'button-destructive-secondary-inverted-text-color': 'color-alert-50',
    // Secondary destructive inverted hover
    'button-destructive-secondary-inverted-hover-background-color': 'transparent-100',
    'button-destructive-secondary-inverted-hover-border-color': 'color-alert-70',
    'button-destructive-secondary-inverted-hover-text-color': 'color-alert-70',
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
    // Tertiairy destructive inverted disabled
    'button-destructive-tertiary-inverted-disabled-background-color': 'transparent-100',
    'button-destructive-tertiary-inverted-disabled-border-color': 'transparent-100',
    'button-destructive-tertiary-inverted-disabled-text-color': 'color-alert-20',

    // input button
    'button-input-background-color': 'color-white',
    'button-input-border-color': 'color-neutral-65',
    'button-input-text-color': 'color-neutral-65',
    // input button hover
    'button-input-hover-background-color': 'color-neutral-15',
    'button-input-hover-border-color': 'color-black',
    'button-input-hover-text-color': 'color-black',
    // input button disabled
    'button-input-disabled-background-color': 'color-neutral-05',
    'button-input-disabled-border-color': 'color-neutral-15',
    'button-input-disabled-text-color': 'color-neutral-30',
};
