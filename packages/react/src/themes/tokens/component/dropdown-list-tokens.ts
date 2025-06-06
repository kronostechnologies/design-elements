import type { ComponentTokenMap } from '../tokens';

export type DropdownListToken =
    | 'dropdown-list-input-background-color'
    | 'dropdown-list-input-disabled-background-color'
    | 'dropdown-list-input-readonly-background-color'
    | 'dropdown-list-input-border-color'
    | 'dropdown-list-input-disabled-border-color'
    | 'dropdown-list-input-readonly-border-color'
    | 'dropdown-list-input-error-border-color'
    | 'dropdown-list-input-text-color'
    | 'dropdown-list-input-disabled-text-color'
    | 'dropdown-list-input-readonly-text-color'
    | 'dropdown-list-input-icon-color'
    | 'dropdown-list-arrow-color'
    | 'dropdown-list-arrow-disabled-color';

export const defaultDropdownListTokens: ComponentTokenMap<DropdownListToken> = {
    'dropdown-list-input-background-color': 'color-control-background',
    'dropdown-list-input-border-color': 'color-control-border',
    'dropdown-list-input-error-border-color': 'color-control-border-error',
    'dropdown-list-arrow-color': 'color-control-auxiliary',
    'dropdown-list-input-text-color': 'color-control-value',
    'dropdown-list-input-disabled-background-color': 'color-control-background-disabled',
    'dropdown-list-input-disabled-border-color': 'color-control-border-disabled',
    'dropdown-list-arrow-disabled-color': 'color-control-auxiliary-disabled',
    'dropdown-list-input-disabled-text-color': 'color-control-value-disabled',
    'dropdown-list-input-readonly-background-color': 'color-control-background-readonly',
    'dropdown-list-input-readonly-border-color': 'color-control-border-readonly',
    'dropdown-list-input-readonly-text-color': 'color-control-value-readonly',
    'dropdown-list-input-icon-color': 'color-control-auxiliary',
};
