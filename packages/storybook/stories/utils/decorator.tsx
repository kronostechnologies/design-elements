import { ComponentType, ElementType, ReactElement } from 'react';

export type Decorator = (Story: ComponentType) => ReactElement;

export function decorateWith(Component: ElementType): Decorator {
    return (Story: ComponentType) => (
        <Component>
            <Story />
        </Component>
    );
}
