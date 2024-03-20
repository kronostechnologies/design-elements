import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type BadgeTokens =
    | 'badge-background-color'
    | 'badge-text-color';

export type BadgeTokenValue = AliasTokens | RefTokens;

export type BadgeTokenMap = {
    [Token in BadgeTokens]: BadgeTokenValue;
};

export const defaultBadgeTokens: BadgeTokenMap = {
    'badge-background-color': 'color-feedback-bg-fill-alert',
    'badge-text-color': 'color-text-inverse',
};
