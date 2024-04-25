import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type AccordionTokens =
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
    | 'accordion-header-disabled-icon-color'
    | 'accordion-header-focus-box-shadow-inset-color';

export type AccordionTokenValue = AliasTokens | RefTokens;

export type AccordionTokenMap = {
    [Token in AccordionTokens]: AccordionTokenValue;
};

export const defaultAccordionTokens: AccordionTokenMap = {
    'accordion-panel-background-color': 'color-neutral-02',
    'accordion-panel-border-color': 'color-neutral-15',
    'accordion-panel-text-color': 'color-neutral-90',
    'accordion-header-background-color': 'color-white',
    'accordion-header-border-color': 'color-neutral-15',
    'accordion-header-text-color': 'color-neutral-90',
    'accordion-header-hover-background-color': 'color-neutral-15',
    'accordion-header-hover-border-color': 'color-black',
    'accordion-header-hover-text-color': 'color-black',
    'accordion-header-disabled-background-color': 'color-neutral-05',
    'accordion-header-disabled-border-color': 'color-neutral-15',
    'accordion-header-disabled-text-color': 'color-neutral-30',
    'accordion-header-disabled-icon-color': 'color-neutral-30',
    'accordion-header-focus-box-shadow-inset-color': 'color-brand-20',
};
