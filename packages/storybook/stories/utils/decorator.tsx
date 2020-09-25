import React, { ComponentType, ElementType, ReactElement } from 'react';

export function decorateWith(Decorator: ElementType): (Story: ComponentType) => ReactElement {
    return (Story: ComponentType) => <Decorator> <Story /> </Decorator>;
}
