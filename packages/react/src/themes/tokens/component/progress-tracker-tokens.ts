import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ProgressTrackerTokens =
    | 'progress-tracker-notification-badge-color'
    | 'progress-tracker-notification-badge-fill-color'
    | 'progress-tracker-bridge-todo-background-color'
    | 'progress-tracker-step-todo-text-color'
    | 'progress-tracker-step-todo-background-color'
    | 'progress-tracker-step-uncompleted-border-color'
    | 'progress-tracker-step-uncompleted-text-color'
    | 'progress-tracker-step-uncompleted-label-text-color'
    | 'progress-tracker-bridge-active-background-color'
    | 'progress-tracker-step-active-border-color'
    | 'progress-tracker-step-active-text-color'
    | 'progress-tracker-step-active-label-text-color'
    | 'progress-tracker-bridge-completed-color'
    | 'progress-tracker-step-completed-background-color'
    | 'progress-tracker-step-completed-border-color'
    | 'progress-tracker-step-completed-text-color'
    | 'progress-tracker-step-completed-label-text-color'

export type ProgressTrackerTokenValue = AliasTokens | RefTokens;

export type ProgressTrackerTokenMap = {
    [Token in ProgressTrackerTokens]: ProgressTrackerTokenValue;
};

export const defaultProgressTrackerTokens: ProgressTrackerTokenMap = {
    'progress-tracker-notification-badge-color': 'color-white',
    'progress-tracker-notification-badge-fill-color': 'color-alert-50',
    // TO-DO
    'progress-tracker-bridge-todo-background-color': 'color-neutral-15',
    'progress-tracker-step-todo-text-color': 'color-brand-50',
    'progress-tracker-step-todo-background-color': 'color-white',
    // Uncompleted
    'progress-tracker-step-uncompleted-border-color': 'color-neutral-30',
    'progress-tracker-step-uncompleted-text-color': 'color-neutral-90',
    'progress-tracker-step-uncompleted-label-text-color': 'color-neutral-65',
    // Active
    'progress-tracker-bridge-active-background-color': 'color-brand-50',
    'progress-tracker-step-active-border-color': 'color-brand-50',
    'progress-tracker-step-active-text-color': 'color-brand-70',
    'progress-tracker-step-active-label-text-color': 'color-brand-70',
    // Completed
    'progress-tracker-bridge-completed-color': 'color-brand-50',
    'progress-tracker-step-completed-background-color': 'color-brand-50',
    'progress-tracker-step-completed-border-color': 'color-brand-50',
    'progress-tracker-step-completed-text-color': 'color-white',
    'progress-tracker-step-completed-label-text-color': 'color-brand-50',
};
