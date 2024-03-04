import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type AccordionTokens =
    | 'accordion-content-background-color'
    | 'accordion-content-border-color'
    | 'accordion-content-color'
    | 'accordion-header-border-color'
    | 'accordion-header-color'
    | 'accordion-header-extended-background-color'
    | 'accordion-header-extended-color'
    | 'accordion-header-focus-box-shadow-inset-color'
    | 'accordion-header-focus-color'
    | 'accordion-header-hover-background-color'
    | 'accordion-header-hover-border-color'
    | 'accordion-header-hover-color'
    | 'accordion-header-disabled-background-color'
    | 'accordion-header-disabled-hover-border-color'
    | 'accordion-header-disabled-hover-color'
    | 'accordion-header-disabled-svg-color';

export type AccordionTokenValue = AliasTokens | RefTokens;

export type AccordionTokenMap = {
    [Token in AccordionTokens]: AccordionTokenValue;
};

export const defaultAccordionTokens: AccordionTokenMap = {
    'accordion-content-background-color': 'color-neutral-02',
    'accordion-content-border-color': 'color-neutral-15',
    'accordion-content-color': 'color-neutral-90',
    'accordion-header-border-color': 'color-neutral-15',
    'accordion-header-color': 'color-neutral-90',
    'accordion-header-extended-background-color': 'color-white',
    'accordion-header-extended-color': 'color-neutral-90',
    'accordion-header-focus-box-shadow-inset-color': 'color-brand-20',
    'accordion-header-focus-color': 'color-neutral-90',
    'accordion-header-hover-background-color': 'color-neutral-15',
    'accordion-header-hover-border-color': 'color-neutral-90',
    'accordion-header-hover-color': 'color-neutral-90',
    'accordion-header-disabled-background-color': 'color-neutral-05',
    'accordion-header-disabled-hover-border-color': 'color-neutral-15',
    'accordion-header-disabled-hover-color': 'color-neutral-30',
    'accordion-header-disabled-svg-color': 'color-neutral-30',
};
