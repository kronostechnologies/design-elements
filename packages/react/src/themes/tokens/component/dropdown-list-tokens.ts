import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type DropdownListTokens =
    | 'dropdown-list-textbox-background-color'
    | 'dropdown-list-textbox-disabled-background-color'
    | 'dropdown-list-textbox-border-color'
    | 'dropdown-list-textbox-disabled-border-color'
    | 'dropdown-list-textbox-invalid-border-color'
    | 'dropdown-list-textbox-disabled-text-color'
    | 'dropdown-list-arrow-color'
    | 'dropdown-list-arrow-disabled-color';

export type DropdownListTokenValue = AliasTokens | RefTokens;

export type DropdownListTokenMap = {
    [Token in DropdownListTokens]: DropdownListTokenValue;
};

export const defaultDropdownListTokens: DropdownListTokenMap = {
    'dropdown-list-arrow-color': 'color-neutral-65',
    'dropdown-list-arrow-disabled-color': 'color-neutral-30',
    'dropdown-list-textbox-background-color': 'color-white',
    'dropdown-list-textbox-disabled-background-color': 'color-neutral-05',
    'dropdown-list-textbox-border-color': 'color-neutral-65',
    'dropdown-list-textbox-disabled-border-color': 'color-neutral-30',
    'dropdown-list-textbox-invalid-border-color': 'color-alert-50',
    'dropdown-list-textbox-disabled-text-color': 'color-neutral-30',
};
