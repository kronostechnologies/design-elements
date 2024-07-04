import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type BreadcrumbTokens =
    | 'breadcrumb-link-color'
    | 'breadcrumb-link-hover-color'
    | 'breadcrumb-link-active-color'
    | 'breadcrumb-link-disabled-color'
    | 'breadcrumb-separator-color';

export type BreadcrumbTokensValue = AliasTokens | RefTokens;

export type BreadcrumbTokensMap = {
    [Token in BreadcrumbTokens]: BreadcrumbTokensValue;
};

export const defaultBreadcrumbTokens : BreadcrumbTokensMap = {
    'breadcrumb-link-active-color': 'color-content',
    'breadcrumb-link-color': 'color-content-subtle',
    'breadcrumb-link-disabled-color': 'color-content-disabled',
    'breadcrumb-link-hover-color': 'color-content-hover',
    'breadcrumb-separator-color': 'color-content-subtle',
};
