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
    'progress-tracker-notification-badge-color': 'color-content-inverse',
    'progress-tracker-notification-badge-fill-color': 'color-feedback-bg-alert-bold',

    'progress-circle-empty-track-color': 'color-bg-empty',
    'progress-indicator-empty-track-color': 'color-bg-empty',
    'progress-tracker-bridge-empty-background-color': 'color-bg-empty',
    'progress-tracker-bridge-filled-background-color': 'color-bg-indicator',

    'progress-circle-label-text-color': 'color-content',
    'progress-circle-result-text-color': 'color-content',
    'progress-indicator-label-text-color': 'color-content',

    // TO-DO
    'progress-tracker-step-todo-text-color': 'color-content',
    'progress-tracker-step-todo-background-color': 'color-bg',
    // Uncompleted
    'progress-tracker-step-uncompleted-border-color': 'color-border-empty',
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
    'progress-tracker-step-completed-label-text-color': 'color-content-brand',
};
