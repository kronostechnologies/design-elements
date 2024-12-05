import type { ComponentTokenMap } from '../tokens';

export type StatusToken =
    | 'status-circle-blocked-background-color'
    | 'status-circle-enabled-background-color'
    | 'status-circle-disabled-background-color'
    | 'status-circle-disabled-border-color'
    | 'status-disabled-text-color';

export const defaultStatusTokens: ComponentTokenMap<StatusToken> = {
    'status-circle-blocked-background-color': 'color-feedback-background-alert-bold',
    'status-circle-enabled-background-color': 'color-feedback-background-success-bold',
    'status-circle-disabled-background-color': 'color-background-disabled',
    'status-circle-disabled-border-color': 'color-border-disabled',
    'status-disabled-text-color': 'color-content-disabled',
};
