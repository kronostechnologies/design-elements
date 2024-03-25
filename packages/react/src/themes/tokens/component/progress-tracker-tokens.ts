import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ProgressTrackerTokens =
    | 'progress-tracker-notification-badge-color'
    | 'progress-tracker-notification-badge-fill-color'
    | 'progress-tracker-bridge-empty-background-color'
    | 'progress-tracker-bridge-filled-background-color'
    | 'progress-tracker-step-todo-text-color'
    | 'progress-tracker-step-todo-background-color'
    | 'progress-tracker-step-uncompleted-border-color'
    | 'progress-tracker-step-uncompleted-text-color'
    | 'progress-tracker-step-uncompleted-label-text-color'
    | 'progress-tracker-step-active-border-color'
    | 'progress-tracker-step-active-text-color'
    | 'progress-tracker-step-active-label-text-color'
    | 'progress-tracker-step-completed-background-color'
    | 'progress-tracker-step-completed-border-color'
    | 'progress-tracker-step-completed-text-color'
    | 'progress-tracker-step-completed-label-text-color';

export type ProgressTrackerTokenValue = AliasTokens | RefTokens;

export type ProgressTrackerTokenMap = {
    [Token in ProgressTrackerTokens]: ProgressTrackerTokenValue;
};

export const defaultProgressTrackerTokens: ProgressTrackerTokenMap = {
    'progress-tracker-notification-badge-color': 'color-text-inverse',
    'progress-tracker-notification-badge-fill-color': 'color-feedback-bg-alert',

    'progress-tracker-bridge-empty-background-color': 'color-empty-bg',
    'progress-tracker-bridge-filled-background-color': 'color-indicator-bg',
    // TO-DO
    'progress-tracker-step-todo-text-color': 'color-text',
    'progress-tracker-step-todo-background-color': 'color-bg',
    // Uncompleted
    'progress-tracker-step-uncompleted-border-color': 'color-neutral-30',
    'progress-tracker-step-uncompleted-text-color': 'color-text',
    'progress-tracker-step-uncompleted-label-text-color': 'color-text-alternate',
    // Active
    'progress-tracker-step-active-border-color': 'color-indicator-bg',
    'progress-tracker-step-active-text-color': 'color-text-selected',
    'progress-tracker-step-active-label-text-color': 'color-text-selected',
    // Completed
    'progress-tracker-step-completed-background-color': 'color-indicator-bg',
    'progress-tracker-step-completed-border-color': 'color-indicator-bg',
    'progress-tracker-step-completed-text-color': 'color-text-inverse',
    'progress-tracker-step-completed-label-text-color': 'color-brand-50',
};
