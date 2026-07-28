import { generateComponentClasses } from '../../utils/component-classes';

const COMPONENT_NAME = 'DropdownMenuButton';

interface DropdownMenuButtonClasses {
    button: string;
    expandIcon: string;
}

export type DropdownMenuButtonClassKeys = keyof DropdownMenuButtonClasses;

export const dropdownMenuButtonClasses: DropdownMenuButtonClasses = generateComponentClasses(
    COMPONENT_NAME,
    [
        'button',
        'expandIcon',
    ],
);
