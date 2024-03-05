import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type StatusTokens =
    | 'status-disabled-text-color'
    | 'status-circle-blocked-color'
    | 'status-circle-disabled-color'
    | 'status-circle-disabled-border-color'
    | 'status-circle-enabled-color';

export type StatusTokenValue = AliasTokens | RefTokens;

export type StatusTokenMap = {
    [Token in StatusTokens]: StatusTokenValue;
};

export const defaultStatusTokens: StatusTokenMap = {
    'status-disabled-text-color': 'color-neutral-65',
    'status-circle-blocked-color': 'color-alert-50',
    'status-circle-disabled-color': 'color-white',
    'status-circle-disabled-border-color': 'color-neutral-65',
    'status-circle-enabled-color': 'color-success-50',
};
