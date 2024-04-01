import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TagTokens =
    | 'tag-background-color'
    | 'tag-border-color'
    | 'tag-text-color'
    | 'tag-icon-color'

    | 'tag-hover-icon-color'
    | 'tag-hover-border-color'
    | 'tag-hover-background-color'
    | 'tag-selected-icon-color'
    | 'tag-selected-border-color'
    | 'tag-selected-background-color'
    | 'tag-selected-text-color'
    | 'tag-selected-hover-background-color'

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
    'tag-background-color': 'color-neutral-05',
    'tag-border-color': 'color-neutral-50',
    'tag-text-color': 'color-neutral-90',
    'tag-icon-color': 'color-neutral-65',

    'tag-hover-background-color': 'color-neutral-15',
    'tag-hover-border-color': 'color-neutral-90',
    'tag-hover-icon-color': 'color-neutral-90',

    'tag-selected-background-color': 'color-brand-05',
    'tag-selected-hover-background-color': 'color-brand-10',
    'tag-selected-border-color': 'color-brand-70',
    'tag-selected-text-color': 'color-brand-70',
    'tag-selected-icon-color': 'color-brand-70',

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
