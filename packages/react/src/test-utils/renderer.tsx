import { ThemeWrapped } from '@design-elements/test-utils/theme-wrapped';
import { mount, ReactWrapper, render } from 'enzyme';
import React, { Component, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

export function mountWithProviders<C extends Component, P = C['props'], S = C['state']>(
    component: ReactElement<P>,
): ReactWrapper<P, S, C> {
    return mount(component, {
        wrappingComponent: AllProviders,
    });
}

export function renderWithProviders(
    component: ReactElement,
): Cheerio {
    return render(<AllProviders>{component}</AllProviders>);
}

function AllProviders({ children }: { children: ReactElement }): ReactElement {
    return (
        <MemoryRouter>
            {ThemeWrapped(children)}
        </MemoryRouter>
    );
}
