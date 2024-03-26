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
    'progress-tracker-notification-badge-color': 'color-content-inverse',
    'progress-tracker-notification-badge-fill-color': 'color-feedback-bg-alert-bold',

    'progress-tracker-bridge-empty-background-color': 'color-bg-empty',
    'progress-tracker-bridge-filled-background-color': 'color-bg-indicator',
    // TO-DO
    'progress-tracker-step-todo-text-color': 'color-content',
    'progress-tracker-step-todo-background-color': 'color-bg',
    // Uncompleted
    'progress-tracker-step-uncompleted-border-color': 'color-neutral-30',
    'progress-tracker-step-uncompleted-text-color': 'color-content',
    'progress-tracker-step-uncompleted-label-text-color': 'color-content-subtle',
    // Active
    'progress-tracker-step-active-border-color': 'color-bg-indicator',
    'progress-tracker-step-active-text-color': 'color-content-selected',
    'progress-tracker-step-active-label-text-color': 'color-content-selected',
    // Completed
    'progress-tracker-step-completed-background-color': 'color-bg-indicator',
    'progress-tracker-step-completed-border-color': 'color-bg-indicator',
    'progress-tracker-step-completed-text-color': 'color-content-inverse',
    'progress-tracker-step-completed-label-text-color': 'color-brand-50',
};
