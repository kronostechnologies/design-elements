import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TagTokens =
    | 'tag-background-color'
    | 'tag-box-shadow-color'
    | 'tag-delete-button-icon-color'
    | 'tag-delete-button-hover-background-color'
    | 'tag-delete-icon-color'
    | 'tag-clickable-hover-border-background-color'
    | 'tag-clickable-hover-border-color'
    | 'tag-clickable-hover-icon-color'
    | 'tag-clickable-hover-background-color';

export type TagTokenValue = AliasTokens | RefTokens;

export type TagTokenMap = {
    [Token in TagTokens]: TagTokenValue;
};

export const defaultTagTokens: TagTokenMap = {
    'tag-background-color': 'color-neutral-05',
    'tag-box-shadow-color': 'color-neutral-50',
    'tag-delete-button-icon-color': 'color-black',
    'tag-delete-button-hover-background-color': 'color-neutral-15',
    'tag-delete-icon-color': 'color-neutral-65',
    'tag-clickable-hover-border-background-color': 'color-neutral-65',
    'tag-clickable-hover-border-color': 'color-neutral-65',
    'tag-clickable-hover-icon-color': 'color-black',
    'tag-clickable-hover-background-color': 'color-neutral-15',
};
