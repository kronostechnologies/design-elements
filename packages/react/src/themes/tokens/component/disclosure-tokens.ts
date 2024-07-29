import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type DisclosureTokens =
    | 'disclosure-background-color'
    | 'disclosure-border-color'
    | 'disclosure-box-shadow-color'
    | 'disclosure-text-color';

export type DisclosureTokenValue = AliasTokens | RefTokens;

export type DisclosureTokenMap = {
    [Token in DisclosureTokens]: DisclosureTokenValue;
};

export const defaultDisclosureTokens: DisclosureTokenMap = {
    'disclosure-background-color': 'color-menu-background',
    'disclosure-border-color': 'color-menu-border',
    'disclosure-box-shadow-color': 'color-box-shadow',
    'disclosure-text-color': 'color-menu-item-content',
};
