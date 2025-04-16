import { generateComponentClasses } from '../../utils/generate-component-classes';

const COMPONENT_NAME = 'Accordion';

export interface AccordionClasses {
    body: string;
    button: string;
    heading: string;
    section: string;
}

export type AccordionClassKeys = keyof AccordionClasses;

export const accordionClasses: AccordionClasses = generateComponentClasses(
    COMPONENT_NAME,
    [
        'body',
        'button',
        'heading',
        'section',
    ],
);
