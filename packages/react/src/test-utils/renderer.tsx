import { ThemeWrapped } from '@design-elements/test-utils/theme-wrapped';
import { mount, ReactWrapper, render } from 'enzyme';
import React, { Component, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DeviceContextProvider, DeviceType } from '../components/device-context-provider/device-context-provider';

export function mountWithProviders<C extends Component, P = C['props'], S = C['state']>(
    component: ReactElement<P>,
): ReactWrapper<P, S, C> {
    return mount(component, {
        wrappingComponent: AllProviders,
    });
}

export function renderWithProviders(
    component: ReactElement,
    device?: DeviceType,
): Cheerio {
    return render(<AllProviders device={device}>{component}</AllProviders>);
}

export function AllProviders({ children, device }: { children: ReactElement, device?: DeviceType }): ReactElement {
    return (
        <MemoryRouter>
            <DeviceContextProvider staticDevice={device}>
                {ThemeWrapped(children)}
            </DeviceContextProvider>
        </MemoryRouter>
    );
}
