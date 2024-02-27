import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type BadgeTokens =
    | 'badge-background-color'
    | 'badge-color';

export type BadgeTokenValue = AliasTokens | RefTokens;

export type BadgeTokenMap = {
    [Token in BadgeTokens]: BadgeTokenValue;
};

export const defaultBadgeTokens: BadgeTokenMap = {
    'badge-background-color': 'color-alert-50',
    'badge-color': 'color-white',
};
