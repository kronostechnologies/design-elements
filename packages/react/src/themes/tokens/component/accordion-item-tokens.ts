import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type AccordionItemTokens =
    | 'accordion-item-section-background-color'
    | 'accordion-item-section-border-color'
    | 'accordion-item-body-background-color'
    | 'accordion-item-body-color'
    | 'accordion-item-button-border-color'
    | 'accordion-item-button-color'
    | 'accordion-item-button-aria-extended-background-color'
    | 'accordion-item-button-aria-extended-color'
    | 'accordion-item-button-focus-box-shadow-inset-color'
    | 'accordion-item-button-focus-color'
    | 'accordion-item-button-hover-background-color'
    | 'accordion-item-button-hover-border-color'
    | 'accordion-item-button-hover-color'
    | 'accordion-item-button-disabled-background-color'
    | 'accordion-item-button-disabled-hover-border-color'
    | 'accordion-item-button-disabled-hover-color'
    | 'accordion-item-button-disabled-svg-color';

export type AccordionItemTokenValue = AliasTokens | RefTokens;

export type AccordionItemTokenMap = {
    [Token in AccordionItemTokens]: AccordionItemTokenValue;
};

export const defaultAccordionItemTokens: AccordionItemTokenMap = {
    'accordion-item-section-background-color': 'color-neutral-02',
    'accordion-item-section-border-color': 'color-neutral-15',
    'accordion-item-body-background-color': 'color-neutral-02',
    'accordion-item-body-color': 'color-neutral-90',
    'accordion-item-button-border-color': 'color-neutral-15',
    'accordion-item-button-color': 'color-neutral-90',
    'accordion-item-button-aria-extended-background-color': 'color-white',
    'accordion-item-button-aria-extended-color': 'color-neutral-90',
    'accordion-item-button-focus-box-shadow-inset-color': 'color-brand-20',
    'accordion-item-button-focus-color': 'color-neutral-90',
    'accordion-item-button-hover-background-color': 'color-neutral-15',
    'accordion-item-button-hover-border-color': 'color-neutral-90',
    'accordion-item-button-hover-color': 'color-neutral-90',
    'accordion-item-button-disabled-background-color': 'color-neutral-05',
    'accordion-item-button-disabled-hover-border-color': 'color-neutral-15',
    'accordion-item-button-disabled-hover-color': 'color-neutral-30',
    'accordion-item-button-disabled-svg-color': 'color-neutral-30',
};
