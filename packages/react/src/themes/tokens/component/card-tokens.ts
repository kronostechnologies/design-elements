import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type CardTokens =
    | 'card-background-color'
    | 'card-border-color'
    | 'card-box-shadow-color';

export type CardTokensValue = AliasTokens | RefTokens;

export type CardTokensMap = {
    [Token in CardTokens]: CardTokensValue;
};

export const defaultCardTokens : CardTokensMap = {
    'card-background-color': 'color-white',
    'card-border-color': 'color-neutral-05',
    'card-box-shadow-color': 'transparent-20',
};
