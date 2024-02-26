import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type AccordionTokens =
    | 'accordion-section-background-color'
    | 'accordion-section-border-color'
    | 'accordion-body-background-color'
    | 'accordion-body-color'
    | 'accordion-button-border-color'
    | 'accordion-button-color'
    | 'accordion-button-extended-background-color'
    | 'accordion-button-extended-color'
    | 'accordion-button-focus-box-shadow-inset-color'
    | 'accordion-button-focus-color'
    | 'accordion-button-hover-background-color'
    | 'accordion-button-hover-border-color'
    | 'accordion-button-hover-color'
    | 'accordion-button-disabled-background-color'
    | 'accordion-button-disabled-hover-border-color'
    | 'accordion-button-disabled-hover-color'
    | 'accordion-button-disabled-svg-color';

export type AccordionTokenValue = AliasTokens | RefTokens;

export type AccordionTokenMap = {
    [Token in AccordionTokens]: AccordionTokenValue;
};

export const defaultAccordionTokens: AccordionTokenMap = {
    'accordion-section-background-color': 'color-neutral-02',
    'accordion-section-border-color': 'color-neutral-15',
    'accordion-body-background-color': 'color-neutral-02',
    'accordion-body-color': 'color-neutral-90',
    'accordion-button-border-color': 'color-neutral-15',
    'accordion-button-color': 'color-neutral-90',
    'accordion-button-extended-background-color': 'color-white',
    'accordion-button-extended-color': 'color-neutral-90',
    'accordion-button-focus-box-shadow-inset-color': 'color-brand-20',
    'accordion-button-focus-color': 'color-neutral-90',
    'accordion-button-hover-background-color': 'color-neutral-15',
    'accordion-button-hover-border-color': 'color-neutral-90',
    'accordion-button-hover-color': 'color-neutral-90',
    'accordion-button-disabled-background-color': 'color-neutral-05',
    'accordion-button-disabled-hover-border-color': 'color-neutral-15',
    'accordion-button-disabled-hover-color': 'color-neutral-30',
    'accordion-button-disabled-svg-color': 'color-neutral-30',
};
