import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type FieldTokens =
    | 'field-error-text-color'
    | 'field-hint-text-color'
    | 'field-input-border-color'
    | 'field-input-error-border-color';

export type FieldTokenValue = AliasTokens | RefTokens;

export type FieldTokenMap = {
    [Token in FieldTokens]: FieldTokenValue;
};

export const defaultFieldTokens: FieldTokenMap = {
    'field-hint-text-color': 'color-content-subtle',
    'field-error-text-color': 'color-input-content-error',

    'field-input-border-color': 'color-input-border',
    'field-input-error-border-color': 'color-input-border-error',
};
