import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TagTokens =
    | 'tag-container-background-color'
    | 'tag-container-clickable-hover-border-color'
    | 'tag-container-clickable-hover-icon-color'
    | 'tag-delete-button-icon-color'
    | 'tag-delete-button-hover-background-color'
    | 'tag-delete-icon-color'
    | 'tag-container-clickable-hover-border-background-color'
    | 'tag-container-box-shadow-color';

export type TagTokenValue = AliasTokens | RefTokens;

export type TagTokenMap = {
    [Token in TagTokens]: TagTokenValue;
};

export const defaultTagTokens: TagTokenMap = {
    'tag-container-background-color': 'color-neutral-05',
    'tag-container-clickable-hover-border-color': 'color-neutral-65',
    'tag-container-clickable-hover-icon-color': 'color-black',
    'tag-delete-button-icon-color': 'color-black',
    'tag-delete-button-hover-background-color': 'color-neutral-15',
    'tag-container-clickable-hover-border-background-color': 'color-neutral-15',
    'tag-delete-icon-color': 'color-neutral-65',
    'tag-container-box-shadow-color': 'color-neutral-50',
};
