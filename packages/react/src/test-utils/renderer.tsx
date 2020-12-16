import { ThemeWrapper } from '@design-elements/components/theme-wrapper/theme-wrapper';
import { ThemeWrapped } from '@design-elements/test-utils/theme-wrapped';
import { CommonWrapper, mount, MountRendererProps, ReactWrapper, render, shallow, ShallowWrapper } from 'enzyme';
import React, { Component, ReactElement } from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { DeviceContextProvider, DeviceType } from '../components/device-context-provider/device-context-provider';

export function AllProviders({ children, device }: { children: ReactElement, device?: DeviceType }): ReactElement {
    return (
        <MemoryRouter>
            <DeviceContextProvider staticDevice={device}>
                {ThemeWrapped(children)}
            </DeviceContextProvider>
        </MemoryRouter>
    );
}

export function mountWithProviders<C extends Component, P = C['props'], S = C['state']>(
    component: ReactElement<P>,
    options: MountRendererProps = {},
): ReactWrapper<P, S, C> {
    return mount(component, {
        ...options,
        wrappingComponent: AllProviders,
    });
}

export function mountWithTheme<C extends Component, P = C['props'], S = C['state']>(
    component: ReactElement<P>,
    options?: MountRendererProps,
): ReactWrapper<P, S, C> {
    return mount(component, {
        wrappingComponent: ThemeWrapper,
        ...options,
    });
}

export function renderWithProviders(
    component: ReactElement,
    device?: DeviceType,
): cheerio.Cheerio {
    return render(<AllProviders device={device}>{component}</AllProviders>);
}

export function renderWithTheme(
    component: ReactElement,
): cheerio.Cheerio {
    return render(ThemeWrapped(component));
}

export function shallowWithTheme<C extends Component, P = C['props'], S = C['state']>(
    component: ReactElement<P>,
): ShallowWrapper<P, S, C> {
    return shallow(component, {
        wrappingComponent: ThemeWrapper,
    });
}

export async function actUpdate<C extends Component, P = C['props'], S = C['state']>(
    wrapper: CommonWrapper<P, S, C>,
): Promise<void> {
    await act(async () => {
        wrapper.update();
    });
}

export async function actAndWaitForEffects<C extends Component, P = C['props'], S = C['state']>(
    wrapper: ReactWrapper<P, S, C>,
    action: () => void,
): Promise<ReactWrapper<P, S, C>> {
    await act(async () => action());
    await actUpdate(wrapper);
    return wrapper;
}
