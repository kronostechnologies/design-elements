import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type AccordionTokens =
    | 'accordion-panel-background-color'
    | 'accordion-panel-border-color'
    | 'accordion-panel-text-color'
    | 'accordion-header-background-color'
    | 'accordion-header-border-color'
    | 'accordion-header-text-color'
    | 'accordion-header-focus-box-shadow-inset-color'
    | 'accordion-header-focus-text-color'
    | 'accordion-header-hover-background-color'
    | 'accordion-header-hover-border-color'
    | 'accordion-header-hover-text-color'
    | 'accordion-header-disabled-background-color'
    | 'accordion-header-disabled-border-color'
    | 'accordion-header-disabled-text-color'
    | 'accordion-header-disabled-svg-color';

export type AccordionTokenValue = AliasTokens | RefTokens;

export type AccordionTokenMap = {
    [Token in AccordionTokens]: AccordionTokenValue;
};

export const defaultAccordionTokens: AccordionTokenMap = {
    'accordion-panel-background-color': 'color-bg-alternate-subtlest',
    'accordion-panel-border-color': 'color-border',
    'accordion-panel-text-color': 'color-text',
    'accordion-header-background-color': 'color-bg',
    'accordion-header-border-color': 'color-border',
    'accordion-header-text-color': 'color-text',
    'accordion-header-hover-background-color': 'color-bg-hover',
    'accordion-header-hover-border-color': 'color-interactive-border-hover',
    'accordion-header-hover-text-color': 'color-text-hover',
    'accordion-header-disabled-background-color': 'color-bg-disabled',
    'accordion-header-disabled-border-color': 'color-border',
    'accordion-header-disabled-text-color': 'color-text-disabled',
    'accordion-header-disabled-svg-color': 'color-icon-disabled',
    'accordion-header-focus-box-shadow-inset-color': 'color-brand-20',
    'accordion-header-focus-text-color': 'color-neutral-90',
};
