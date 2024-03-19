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
    'status-circle-blocked-background-color': 'color-alert-50',
    'status-circle-enabled-background-color': 'color-success-50',
    'status-circle-disabled-background-color': 'color-white',
    'status-circle-disabled-border-color': 'color-neutral-65',
    'status-disabled-text-color': 'color-neutral-65',
};
