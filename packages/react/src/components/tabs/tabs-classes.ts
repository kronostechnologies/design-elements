import { generateComponentClasses } from '../../utils/component-classes';

const COMPONENT_NAME = 'Tabs';

export interface TabsClasses {
    tablistContainer: string;
}

export type TabsClassKeys = keyof TabsClasses;

export const tabsClasses: TabsClasses = generateComponentClasses(
    COMPONENT_NAME,
    [
        'tablistContainer',
    ],
);
