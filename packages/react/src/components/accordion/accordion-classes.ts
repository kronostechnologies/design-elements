import { generateComponentClasses } from '../../utils/component-classes';

const COMPONENT_NAME = 'Accordion';

export interface AccordionClasses {
    button: string;
    buttonIcon: string;
    content: string;
    heading: string;
    panel: string;
}

export type AccordionClassKeys = keyof AccordionClasses;

export const accordionClasses: AccordionClasses = generateComponentClasses(
    COMPONENT_NAME,
    [
        'button',
        'buttonIcon',
        'content',
        'heading',
        'panel',
    ],
);
