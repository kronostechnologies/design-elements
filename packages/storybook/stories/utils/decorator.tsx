import { ComponentType, ElementType, ReactElement } from 'react';

export type Decorator = (Story: ComponentType) => ReactElement;

export function decorateWith(Component: ElementType): Decorator {
    // eslint-disable-next-line react/function-component-definition
    return (Story: ComponentType) => (
        <Component>
            <Story />
        </Component>
    );
}
