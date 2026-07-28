import { generateComponentClasses } from '../../utils/component-classes';

const COMPONENT_NAME = 'Listbox';

export interface ListboxClasses {
    listItem: string;
    listItemContent: string;
}

export type ListboxClassKeys = keyof ListboxClasses;

export const listboxClasses: ListboxClasses = generateComponentClasses(
    COMPONENT_NAME,
    [
        'listItem',
        'listItemContent',
    ],
);
