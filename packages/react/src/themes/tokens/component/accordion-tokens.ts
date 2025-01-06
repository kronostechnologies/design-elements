import type { ComponentTokenMap } from '../tokens';

export type AccordionToken =
    | 'accordion-panel-background-color'
    | 'accordion-panel-border-color'
    | 'accordion-panel-text-color'
    | 'accordion-header-background-color'
    | 'accordion-header-border-color'
    | 'accordion-header-text-color'
    | 'accordion-header-hover-background-color'
    | 'accordion-header-hover-border-color'
    | 'accordion-header-hover-text-color'
    | 'accordion-header-disabled-background-color'
    | 'accordion-header-disabled-border-color'
    | 'accordion-header-disabled-text-color'
    | 'accordion-header-disabled-icon-color';

export const defaultAccordionTokens: ComponentTokenMap<AccordionToken> = {
    'accordion-panel-background-color': 'color-background-isolated',
    'accordion-panel-border-color': 'color-border',
    'accordion-panel-text-color': 'color-content',
    'accordion-header-background-color': 'color-background',
    'accordion-header-border-color': 'color-border',
    'accordion-header-text-color': 'color-content',
    'accordion-header-hover-background-color': 'color-background-hover',
    'accordion-header-hover-border-color': 'color-border-hover',
    'accordion-header-hover-text-color': 'color-content-hover',
    'accordion-header-disabled-background-color': 'color-background-disabled',
    'accordion-header-disabled-border-color': 'color-border-disabled',
    'accordion-header-disabled-text-color': 'color-content-disabled',
    'accordion-header-disabled-icon-color': 'color-content-disabled',
};
