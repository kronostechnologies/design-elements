import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type CheckboxTokens =
    | 'checkbox-checked-icon-color'
    | 'checkbox-disabled-background-color'
    | 'checkbox-unchecked-background-color'
    | 'checkbox-disabled-border-color'
    | 'checkbox-unchecked-border-color'
    | 'checkbox-hover-border-color'
    | 'checkbox-hover-background-color'
    | 'checkbox-checked-border-color'
    | 'checkbox-checked-background-color'
    | 'checkbox-error-border-color';

export type CheckboxTokenValue = AliasTokens | RefTokens;

export type CheckboxTokenMap = {
    [Token in CheckboxTokens]: CheckboxTokenValue;
};

export const defaultCheckboxTokens: CheckboxTokenMap = {
    'checkbox-unchecked-background-color': 'color-input-background',
    'checkbox-unchecked-border-color': 'color-input-border',
    'checkbox-checked-icon-color': 'color-input-content-checked',
    'checkbox-checked-background-color': 'color-input-background-checked',
    'checkbox-checked-border-color': 'color-input-border-checked',
    'checkbox-disabled-background-color': 'color-input-background-disabled',
    'checkbox-disabled-border-color': 'color-input-border-disabled',
    'checkbox-hover-border-color': 'color-input-border-hover',
    'checkbox-hover-background-color': 'color-input-background-hover',
    'checkbox-error-border-color': 'color-input-border-error',
};
