import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type CardLinkTokens =
    | 'card-link-background-color'
    | 'card-link-box-shadow-inset-color'
    | 'card-link-text-color'
    | 'card-link-hover-background-color'
    | 'card-link-hover-box-shadow-inset-color'
    | 'card-background-color'
    | 'card-border-color'
    | 'card-box-shadow-color';

export type CardLinkTokenValue = AliasTokens | RefTokens;

export type CardLinkTokenMap = {
    [Token in CardLinkTokens]: CardLinkTokenValue;
};

export const defaultCardLinkTokens: CardLinkTokenMap = {
    'card-background-color': 'color-bg-fill',
    'card-link-background-color': 'color-white',
    'card-border-color': 'color-neutral-05',
    'card-link-box-shadow-inset-color': 'color-neutral-15',
    'card-link-text-color': 'color-black',
    'card-link-hover-background-color': 'color-neutral-15',
    'card-link-hover-box-shadow-inset-color': 'color-neutral-65',
    'card-box-shadow-color': 'transparent-20',
};
