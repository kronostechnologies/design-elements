import { Palette, AliasTokens } from './';

type RefTokens = Palette;

export interface ComponentTokens {
    'button-primary-background-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-border-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-text-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-hover-background-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-hover-border-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-hover-text-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-disabled-background-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-disabled-border-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-disabled-text-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-focus-background-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-focus-border-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-focus-text-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-background-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-border-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-text-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-hover-background-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-hover-border-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-hover-text-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-focus-background-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-focus-border-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-focus-text-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-disabled-background-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-disabled-border-color': keyof AliasTokens | keyof RefTokens;
    'button-primary-inverted-disabled-text-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-background-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-border-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-text-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-hover-background-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-hover-border-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-hover-text-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-disabled-background-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-disabled-border-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-disabled-text-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-focus-background-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-focus-border-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-focus-text-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-background-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-border-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-text-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-hover-background-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-hover-border-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-hover-text-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-focus-background-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-focus-border-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-focus-text-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-disabled-background-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-disabled-border-color': keyof AliasTokens | keyof RefTokens;
    'button-secondary-inverted-disabled-text-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-background-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-border-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-text-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-hover-background-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-hover-border-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-hover-text-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-disabled-background-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-disabled-border-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-disabled-text-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-focus-background-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-focus-border-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-focus-text-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-background-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-border-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-text-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-hover-background-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-hover-border-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-hover-text-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-focus-background-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-focus-border-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-focus-text-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-disabled-background-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-disabled-border-color': keyof AliasTokens | keyof RefTokens;
    'button-tertiary-inverted-disabled-text-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-background-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-border-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-text-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-hover-background-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-hover-border-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-hover-text-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-disabled-background-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-disabled-border-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-disabled-text-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-focus-background-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-focus-border-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-focus-text-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-background-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-border-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-text-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-hover-background-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-hover-border-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-hover-text-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-focus-background-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-focus-border-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-focus-text-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-disabled-background-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-disabled-border-color': keyof AliasTokens | keyof RefTokens;
    'button-destructive-inverted-disabled-text-color': keyof AliasTokens | keyof RefTokens;
    'button-search-background-color': keyof AliasTokens | keyof RefTokens;
    'button-search-border-color': keyof AliasTokens | keyof RefTokens;
    'button-search-text-color': keyof AliasTokens | keyof RefTokens;
    'button-search-hover-background-color': keyof AliasTokens | keyof RefTokens;
    'button-search-hover-text-color': keyof AliasTokens | keyof RefTokens;
    'button-search-disabled-background-color': keyof AliasTokens | keyof RefTokens;
    'button-search-disabled-border-color': keyof AliasTokens | keyof RefTokens;
    'button-search-disabled-text-color': keyof AliasTokens | keyof RefTokens;
    'focus-box-shadow': keyof AliasTokens | keyof RefTokens;
    'focus-box-shadow-inset'?: keyof AliasTokens | keyof RefTokens;
    'focus-border-box-shadow': keyof AliasTokens | keyof RefTokens;
    'focus-border-box-shadow-inset': keyof AliasTokens | keyof RefTokens;
    'focus-border': keyof AliasTokens | keyof RefTokens;
    'modal-overlay-background-color': keyof AliasTokens | keyof RefTokens;
    'overlay-box-shadow': keyof AliasTokens | keyof RefTokens;
}
