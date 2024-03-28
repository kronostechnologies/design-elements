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
    'checkbox-unchecked-background-color': 'color-input-bg',
    'checkbox-unchecked-border-color': 'color-neutral-65', // 'color-input-border'
    'checkbox-checked-icon-color': 'color-white', // 'color-input-content-checked'
    'checkbox-checked-background-color': 'color-brand-50', // 'color-input-bg-checked'
    'checkbox-checked-border-color': 'color-brand-50', // 'color-input-bg-checked'
    'checkbox-disabled-background-color': 'color-neutral-05', // 'color-input-bg-disabled'
    'checkbox-disabled-border-color': 'color-neutral-15', // 'color-input-border-disabled'
    'checkbox-hover-border-color': 'color-neutral-90', // 'color-input-border-hover'
    'checkbox-hover-background-color': 'color-neutral-15', // 'color-input-bg-hover'
    'checkbox-error-border-color': 'color-alert-50', // 'color-input-border-error'
};
