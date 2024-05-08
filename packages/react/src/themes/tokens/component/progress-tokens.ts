import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ProgressTokens =
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
    | 'progress-tracker-step-completed-label-text-color'
    | 'progress-circle-empty-track-color'
    | 'progress-circle-label-text-color'
    | 'progress-circle-result-text-color'
    | 'progress-indicator-empty-track-color'
    | 'progress-indicator-label-text-color';

export type ProgressTokenValue = AliasTokens | RefTokens;

export type ProgressTokenMap = {
    [Token in ProgressTokens]: ProgressTokenValue;
};

export const defaultProgressTokens: ProgressTokenMap = {
    'progress-tracker-notification-badge-color': 'color-white',
    'progress-tracker-notification-badge-fill-color': 'color-alert-50',

    'progress-circle-empty-track-color': 'color-neutral-15',
    'progress-indicator-empty-track-color': 'color-neutral-15',
    'progress-tracker-bridge-empty-background-color': 'color-neutral-15',
    'progress-tracker-bridge-filled-background-color': 'color-brand-50',

    'progress-circle-label-text-color': 'color-black',
    'progress-circle-result-text-color': 'color-black',
    'progress-indicator-label-text-color': 'color-black',

    // TO-DO
    'progress-tracker-step-todo-text-color': 'color-brand-50',
    'progress-tracker-step-todo-background-color': 'color-white',
    // Uncompleted
    'progress-tracker-step-uncompleted-border-color': 'color-neutral-30',
    'progress-tracker-step-uncompleted-text-color': 'color-neutral-90',
    'progress-tracker-step-uncompleted-label-text-color': 'color-neutral-65',
    // Active
    'progress-tracker-step-active-border-color': 'color-brand-50',
    'progress-tracker-step-active-text-color': 'color-brand-70',
    'progress-tracker-step-active-label-text-color': 'color-brand-70',
    // Completed
    'progress-tracker-step-completed-background-color': 'color-brand-50',
    'progress-tracker-step-completed-border-color': 'color-brand-50',
    'progress-tracker-step-completed-text-color': 'color-white',
    'progress-tracker-step-completed-label-text-color': 'color-brand-50',
};
