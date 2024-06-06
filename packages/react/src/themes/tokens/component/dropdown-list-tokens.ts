import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type DropdownListTokens =
    | 'dropdown-list-input-background-color'
    | 'dropdown-list-input-disabled-background-color'
    | 'dropdown-list-input-border-color'
    | 'dropdown-list-input-disabled-border-color'
    | 'dropdown-list-input-error-border-color'
    | 'dropdown-list-input-disabled-text-color'
    | 'dropdown-list-arrow-color'
    | 'dropdown-list-arrow-disabled-color';

export type DropdownListTokenValue = AliasTokens | RefTokens;

export type DropdownListTokenMap = {
    [Token in DropdownListTokens]: DropdownListTokenValue;
};

export const defaultDropdownListTokens: DropdownListTokenMap = {
    'dropdown-list-input-background-color': 'color-control-background',
    'dropdown-list-input-border-color': 'color-control-border',
    'dropdown-list-input-error-border-color': 'color-control-border-error',
    'dropdown-list-arrow-color': 'color-control-auxiliary',
    'dropdown-list-input-disabled-background-color': 'color-control-background-disabled',
    'dropdown-list-input-disabled-border-color': 'color-control-border-disabled',
    'dropdown-list-arrow-disabled-color': 'color-control-auxiliary-disabled',
    'dropdown-list-input-disabled-text-color': 'color-control-auxiliary-disabled',
};
