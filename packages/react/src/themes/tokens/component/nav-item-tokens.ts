import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type NavItemTokens =
    'nav-item-color'
    | 'nav-item-hover-background-color'
    | 'nav-item-hover-disabled-background-color'
    | 'nav-item-disabled-color'
    | 'nav-item-disabled-fill'
    | 'nav-item-external-link-svg-color'
    | 'nav-item-external-link-text-color';

export type LabelTokenValue = AliasTokens | RefTokens;

export type NavItemTokenMap = {
    [Token in NavItemTokens]: LabelTokenValue;
};

export const defaultNavItemTokens: NavItemTokenMap = {
    'nav-item-color': 'color-black',
    'nav-item-hover-background-color': 'color-neutral-15',
    'nav-item-hover-disabled-background-color': 'transparent-100',
    'nav-item-disabled-color': 'color-neutral-30',
    'nav-item-disabled-fill': 'color-neutral-30',
    'nav-item-external-link-svg-color': 'color-black',
    'nav-item-external-link-text-color': 'color-black',
};
