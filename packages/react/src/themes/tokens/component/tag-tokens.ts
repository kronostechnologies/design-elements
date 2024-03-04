import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TagTokens =
    | 'tag-default-background-color'
    | 'tag-default-border-color'
    | 'tag-default-text-color'
    | 'tag-default-extra-label-text-color'
    | 'tag-default-icon-color'

    | 'tag-default-hover-icon-color'
    | 'tag-default-hover-border-color'
    | 'tag-default-hover-background-color'
    | 'tag-default-selected-icon-color'
    | 'tag-default-selected-border-color'
    | 'tag-default-selected-background-color'
    | 'tag-default-selected-text-color'
    | 'tag-default-selected-extra-label-text-color'
    | 'tag-default-selected-hover-background-color'
    | 'tag-default-selected-hover-border-color'
    | 'tag-default-selected-hover-text-color'
    | 'tag-default-selected-hover-icon-color'

    | 'tag-default-delete-button-hover-icon-color'
    | 'tag-default-delete-button-hover-background-color'
    | 'tag-default-delete-button-icon-color'
    | 'tag-default-selected-delete-button-hover-icon-color'
    | 'tag-default-selected-delete-button-hover-background-color'

    | 'tag-decorative-01-background-color'
    | 'tag-decorative-01-border-color'
    | 'tag-decorative-01-text-color'
    | 'tag-decorative-02-background-color'
    | 'tag-decorative-02-border-color'
    | 'tag-decorative-02-text-color'
    | 'tag-decorative-03-background-color'
    | 'tag-decorative-03-border-color'
    | 'tag-decorative-03-text-color'
    | 'tag-decorative-04-background-color'
    | 'tag-decorative-04-border-color'
    | 'tag-decorative-04-text-color'
    | 'tag-decorative-05-background-color'
    | 'tag-decorative-05-border-color'
    | 'tag-decorative-05-text-color'
    | 'tag-decorative-06-background-color'
    | 'tag-decorative-06-border-color'
    | 'tag-decorative-06-text-color'
    | 'tag-decorative-07-background-color'
    | 'tag-decorative-07-border-color'
    | 'tag-decorative-07-text-color'
    | 'tag-decorative-08-background-color'
    | 'tag-decorative-08-border-color'
    | 'tag-decorative-08-text-color'
    | 'tag-decorative-09-background-color'
    | 'tag-decorative-09-border-color'
    | 'tag-decorative-09-text-color'
    | 'tag-decorative-10-background-color'
    | 'tag-decorative-10-border-color'
    | 'tag-decorative-10-text-color';

export type TagTokenValue = AliasTokens | RefTokens;

export type TagTokenMap = {
    [Token in TagTokens]: TagTokenValue;
};

export const defaultTagTokens: TagTokenMap = {
    'tag-default-background-color': 'color-neutral-05',
    'tag-default-border-color': 'color-neutral-50',
    'tag-default-text-color': 'color-neutral-90',
    'tag-default-extra-label-text-color': 'color-neutral-65',
    'tag-default-icon-color': 'color-neutral-65',
    'tag-default-hover-background-color': 'color-neutral-15',
    'tag-default-hover-border-color': 'color-neutral-90',
    'tag-default-hover-icon-color': 'color-neutral-90',

    'tag-default-selected-background-color': 'color-informative-05',
    'tag-default-selected-border-color': 'color-informative-70',
    'tag-default-selected-text-color': 'color-informative-70',
    'tag-default-selected-extra-label-text-color': 'color-informative-50',
    'tag-default-selected-icon-color': 'color-informative-70',
    'tag-default-selected-hover-background-color': 'color-informative-10',
    'tag-default-selected-hover-border-color': 'color-informative-70',
    'tag-default-selected-hover-icon-color': 'color-informative-70',
    'tag-default-selected-hover-text-color': 'color-informative-70',

    'tag-default-delete-button-hover-background-color': 'color-neutral-15',
    'tag-default-delete-button-hover-icon-color': 'color-neutral-90',
    'tag-default-delete-button-icon-color': 'color-neutral-65',
    'tag-default-selected-delete-button-hover-background-color': 'color-informative-10',
    'tag-default-selected-delete-button-hover-icon-color': 'color-informative-70',

    'tag-decorative-01-background-color': 'color-decorative-01-05',
    'tag-decorative-01-border-color': 'color-decorative-01-50',
    'tag-decorative-01-text-color': 'color-decorative-01-70',
    'tag-decorative-02-background-color': 'color-decorative-02-05',
    'tag-decorative-02-border-color': 'color-decorative-02-50',
    'tag-decorative-02-text-color': 'color-decorative-02-70',
    'tag-decorative-03-background-color': 'color-decorative-03-05',
    'tag-decorative-03-border-color': 'color-decorative-03-50',
    'tag-decorative-03-text-color': 'color-decorative-03-70',
    'tag-decorative-04-background-color': 'color-decorative-04-05',
    'tag-decorative-04-border-color': 'color-decorative-04-50',
    'tag-decorative-04-text-color': 'color-decorative-04-70',
    'tag-decorative-05-background-color': 'color-decorative-05-05',
    'tag-decorative-05-border-color': 'color-decorative-05-50',
    'tag-decorative-05-text-color': 'color-decorative-05-70',
    'tag-decorative-06-background-color': 'color-decorative-06-05',
    'tag-decorative-06-border-color': 'color-decorative-06-50',
    'tag-decorative-06-text-color': 'color-decorative-06-70',
    'tag-decorative-07-background-color': 'color-decorative-07-05',
    'tag-decorative-07-border-color': 'color-decorative-07-50',
    'tag-decorative-07-text-color': 'color-decorative-07-70',
    'tag-decorative-08-background-color': 'color-decorative-08-05',
    'tag-decorative-08-border-color': 'color-decorative-08-50',
    'tag-decorative-08-text-color': 'color-decorative-08-70',
    'tag-decorative-09-background-color': 'color-decorative-09-05',
    'tag-decorative-09-border-color': 'color-decorative-09-50',
    'tag-decorative-09-text-color': 'color-decorative-09-70',
    'tag-decorative-10-background-color': 'color-decorative-10-05',
    'tag-decorative-10-border-color': 'color-decorative-10-50',
    'tag-decorative-10-text-color': 'color-decorative-10-70',
};
