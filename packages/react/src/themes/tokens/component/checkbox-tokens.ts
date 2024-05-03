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
    'checkbox-unchecked-background-color': 'color-white',
    'checkbox-unchecked-border-color': 'color-neutral-65',
    'checkbox-checked-icon-color': 'color-white',
    'checkbox-checked-background-color': 'color-brand-50',
    'checkbox-checked-border-color': 'color-brand-50',
    'checkbox-disabled-background-color': 'color-neutral-05',
    'checkbox-disabled-border-color': 'color-neutral-15',
    'checkbox-hover-border-color': 'color-neutral-90',
    'checkbox-hover-background-color': 'color-neutral-15',
    'checkbox-error-border-color': 'color-alert-50',
};
