import type { ComponentTokenMap } from '../tokens';

export type CheckboxToken =
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

export const defaultCheckboxTokens: ComponentTokenMap<CheckboxToken> = {
    'checkbox-unchecked-background-color': 'color-control-background',
    'checkbox-unchecked-border-color': 'color-control-border',
    'checkbox-checked-icon-color': 'color-control-auxiliary-checked',
    'checkbox-checked-background-color': 'color-control-background-checked',
    'checkbox-checked-border-color': 'color-control-border-checked',
    'checkbox-disabled-background-color': 'color-control-background-disabled',
    'checkbox-disabled-border-color': 'color-control-border-disabled',
    'checkbox-hover-border-color': 'color-control-border-hover',
    'checkbox-hover-background-color': 'color-control-background-hover',
    'checkbox-error-border-color': 'color-control-border-error',
};
