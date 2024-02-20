import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ProgressTrackerTokens =
    | 'progress-tracker-notification-badge-color'
    | 'progress-tracker-notification-badge-fill-color'
    | 'progress-tracker-bridge-color'
    | 'progress-tracker-step-text-color'
    | 'progress-tracker-step-background-color'
    | 'progress-tracker-step-incomplete-border-color'
    | 'progress-tracker-step-incomplete-text-color'
    | 'progress-tracker-step-label-incomplete-text-color'
    | 'progress-tracker-bridge-active-color'
    | 'progress-tracker-step-active-border-color'
    | 'progress-tracker-step-active-text-color'
    | 'progress-tracker-step-label-active-text-color'
    | 'progress-tracker-bridge-complete-color'
    | 'progress-tracker-step-complete-background-color'
    | 'progress-tracker-step-complete-border-color'
    | 'progress-tracker-step-complete-text-color'
    | 'progress-tracker-step-label-complete-text-color'

export type ProgressTrackerTokenValue = AliasTokens | RefTokens;

export type ProgressTrackerTokenMap = {
    [Token in ProgressTrackerTokens]: ProgressTrackerTokenValue;
};

export const defaultProgressTrackerTokens: ProgressTrackerTokenMap = {
    'progress-tracker-notification-badge-color': 'color-white',
    'progress-tracker-notification-badge-fill-color': 'color-alert-50',
    // Default
    'progress-tracker-bridge-color': 'color-neutral-15',
    'progress-tracker-step-text-color': 'color-brand-50',
    'progress-tracker-step-background-color': 'color-white',
    // Incomplete
    'progress-tracker-step-incomplete-border-color': 'color-neutral-30',
    'progress-tracker-step-incomplete-text-color': 'color-neutral-90',
    'progress-tracker-step-label-incomplete-text-color': 'color-neutral-65',
    // Active
    'progress-tracker-bridge-active-color': 'color-brand-50',
    'progress-tracker-step-active-border-color': 'color-brand-50',
    'progress-tracker-step-active-text-color': 'color-brand-70',
    'progress-tracker-step-label-active-text-color': 'color-brand-70',
    // Complete
    'progress-tracker-bridge-complete-color': 'color-brand-50',
    'progress-tracker-step-complete-background-color': 'color-brand-50',
    'progress-tracker-step-complete-border-color': 'color-brand-50',
    'progress-tracker-step-complete-text-color': 'color-white',
    'progress-tracker-step-label-complete-text-color': 'color-brand-50',
};
