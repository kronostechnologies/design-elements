import { ThemeWrapped } from '@design-elements/test-utils/theme-wrapped';
import { mount, ReactWrapper, render } from 'enzyme';
import React, { Component, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DeviceContextProvider } from '../components/device-context-provider/device-context-provider';

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
            <DeviceContextProvider>
                {ThemeWrapped(children)}
            </DeviceContextProvider>
        </MemoryRouter>
    );
}
