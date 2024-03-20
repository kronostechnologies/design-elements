import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type StatusTokens =
    | 'status-circle-blocked-background-color'
    | 'status-circle-enabled-background-color'
    | 'status-circle-disabled-background-color'
    | 'status-circle-disabled-border-color'
    | 'status-disabled-text-color';

export type StatusTokenValue = AliasTokens | RefTokens;

export type StatusTokenMap = {
    [Token in StatusTokens]: StatusTokenValue;
};

export const defaultStatusTokens: StatusTokenMap = {
    'status-circle-blocked-background-color': 'color-feedback-bg-fill-alert',
    'status-circle-enabled-background-color': 'color-feedback-bg-fill-success',
    'status-circle-disabled-background-color': 'color-bg-fill-disabled',
    'status-circle-disabled-border-color': 'color-border-disabled',
    'status-disabled-text-color': 'color-text-disabled',
};
