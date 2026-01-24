import { generateComponentClasses } from '../../utils/component-classes';

const COMPONENT_NAME = 'Badge';

export interface BadgeClasses {
    root: string;
}

export type BadgeClassKeys = keyof BadgeClasses;

export const badgeClasses: BadgeClasses = generateComponentClasses(
    COMPONENT_NAME,
    [
        'root',
    ],
);
