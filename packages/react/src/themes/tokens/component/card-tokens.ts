import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type CardTokens =
    | 'card-background-color'
    | 'card-border-color'
    | 'card-link-border-color'
    | 'card-text-color'
    | 'card-box-shadow-color'
    | 'card-link-hover-background-color'
    | 'card-link-hover-border-color';

export type CardTokensValue = AliasTokens | RefTokens;

export type CardTokensMap = {
    [Token in CardTokens]: CardTokensValue;
};

export const defaultCardTokens : CardTokensMap = {
    'card-background-color': 'color-bg-fill',
    'card-border-color': 'color-neutral-05',
    'card-link-border-color': 'color-neutral-50',
    'card-text-color': 'color-text',
    'card-box-shadow-color': 'transparent-20',
    'card-link-hover-background-color': 'color-neutral-15',
    'card-link-hover-border-color': 'color-black',
};
