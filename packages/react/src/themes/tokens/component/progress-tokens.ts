import type { ComponentTokenMap } from '../tokens';

export type ProgressToken =
    | 'progress-tracker-notification-badge-color'
    | 'progress-tracker-notification-badge-fill-color'
    | 'progress-tracker-bridge-empty-background-color'
    | 'progress-tracker-bridge-filled-background-color'
    | 'progress-tracker-step-todo-text-color'
    | 'progress-tracker-step-todo-background-color'
    | 'progress-tracker-step-uncompleted-border-color'
    | 'progress-tracker-step-uncompleted-text-color'
    | 'progress-tracker-step-uncompleted-label-text-color'
    | 'progress-tracker-step-current-border-color'
    | 'progress-tracker-step-current-text-color'
    | 'progress-tracker-step-current-label-text-color'
    | 'progress-tracker-step-completed-background-color'
    | 'progress-tracker-step-completed-border-color'
    | 'progress-tracker-step-completed-text-color'
    | 'progress-tracker-step-completed-label-text-color';

export const defaultProgressTokens: ComponentTokenMap<ProgressToken> = {
    'progress-tracker-notification-badge-color': 'color-content-inverse',
    'progress-tracker-notification-badge-fill-color': 'color-feedback-background-alert-bold',
    'progress-tracker-bridge-empty-background-color': 'color-background-empty',
    'progress-tracker-bridge-filled-background-color': 'color-background-brand',
    'progress-tracker-step-todo-text-color': 'color-content',
    'progress-tracker-step-todo-background-color': 'color-background',
    'progress-tracker-step-uncompleted-border-color': 'color-border-empty',
    'progress-tracker-step-uncompleted-text-color': 'color-content',
    'progress-tracker-step-uncompleted-label-text-color': 'color-content-subtle',
    'progress-tracker-step-current-border-color': 'color-background-brand',
    'progress-tracker-step-current-text-color': 'color-content-selected',
    'progress-tracker-step-current-label-text-color': 'color-content-selected',
    'progress-tracker-step-completed-background-color': 'color-background-brand',
    'progress-tracker-step-completed-border-color': 'color-background-brand',
    'progress-tracker-step-completed-text-color': 'color-content-inverse',
    'progress-tracker-step-completed-label-text-color': 'color-content-brand',
};
