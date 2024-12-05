import type { ComponentTokenMap } from '../tokens';

export type BreadcrumbToken =
    | 'breadcrumb-link-color'
    | 'breadcrumb-link-hover-color'
    | 'breadcrumb-link-active-color'
    | 'breadcrumb-link-disabled-color'
    | 'breadcrumb-separator-color';

export const defaultBreadcrumbTokens: ComponentTokenMap<BreadcrumbToken> = {
    'breadcrumb-link-active-color': 'color-content',
    'breadcrumb-link-color': 'color-content-subtle',
    'breadcrumb-link-disabled-color': 'color-content-disabled',
    'breadcrumb-link-hover-color': 'color-content-hover',
    'breadcrumb-separator-color': 'color-content-subtle',
};
