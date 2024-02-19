import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type InvalidFieldTokens =
    | 'invalid-field-text-color';

export type InvalidFieldTokenValue = AliasTokens | RefTokens;

export type InvalidFieldTokenMap = {
    [Token in InvalidFieldTokens]: InvalidFieldTokenValue;
};

export const defaultInvalidFieldTokens: InvalidFieldTokenMap = {
    'invalid-field-text-color': 'color-alert-50',
};
