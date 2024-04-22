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
    'card-background-color': 'color-white',
    'card-border-color': 'color-neutral-05',
    'card-text-color': 'color-neutral-90',
    'card-link-border-color': 'color-neutral-50',
    'card-link-hover-border-color': 'color-black',
    'card-link-hover-background-color': 'color-neutral-15',
    'card-box-shadow-color': 'transparent-20',
};
