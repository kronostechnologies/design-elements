import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type FieldTokens =
    | 'field-invalid-text-color'
    | 'field-hint-text-color'
    | 'field-input-border-color'
    | 'field-input-focus-border-color'
    | 'field-input-invalid-border-color'
    | 'field-input-focus-invalid-border-color';

export type FieldTokenValue = AliasTokens | RefTokens;

export type FieldTokenMap = {
    [Token in FieldTokens]: FieldTokenValue;
};

export const defaultFieldTokens: FieldTokenMap = {
    'field-hint-text-color': 'color-neutral-65',
    'field-input-border-color': 'color-neutral-65',
    'field-input-focus-border-color': 'color-brand-50',
    'field-input-focus-invalid-border-color': 'color-alert-50',
    'field-input-invalid-border-color': 'color-alert-50',
    'field-invalid-text-color': 'color-alert-50',
};
