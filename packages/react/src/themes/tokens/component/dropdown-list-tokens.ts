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
    'dropdown-list-input-background-color': 'color-input-bg',
    'dropdown-list-input-disabled-background-color': 'color-input-bg-disabled',
    'dropdown-list-input-border-color': 'color-input-border',
    'dropdown-list-input-disabled-border-color': 'color-input-border-disabled',
    'dropdown-list-input-error-border-color': 'color-input-border-error',
    'dropdown-list-arrow-color': 'color-input-content',
    'dropdown-list-arrow-disabled-color': 'color-input-content-disabled',
    'dropdown-list-input-disabled-text-color': 'color-input-content-disabled',
};
