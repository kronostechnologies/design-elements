import React, { ComponentType, ElementType, ReactElement } from 'react';

export type Decorator = (Story: React.ComponentType) => ReactElement;

export function decorateWith(Component: ElementType): Decorator {
    return (Story: ComponentType) => (
        <Component>
            <Story />
        </Component>
    );
}
