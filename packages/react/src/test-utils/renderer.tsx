import { render as testingLibRender, RenderResult } from '@testing-library/react';
import { CommonWrapper, mount, MountRendererProps, ReactWrapper, render } from 'enzyme';
import { Component, FunctionComponent, ReactElement, ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { DesignSystem, DesignSystemProps } from '../components/design-system';
import { DeviceType } from '../components/device-context-provider/device-context-provider';
import { ThemeWrapper } from '../components/theme-wrapper/theme-wrapper';

export const AllProviders: FunctionComponent<DesignSystemProps> = ({ children, staticDevice }) => (
    <MemoryRouter>
        <DesignSystem staticDevice={staticDevice}>
            {children}
        </DesignSystem>
    </MemoryRouter>
);

interface WrappingComponentProps {
    wrappingComponentProps?: DesignSystemProps;
}

type Options = MountRendererProps & WrappingComponentProps;

export function mountWithProviders<C extends Component, P = C['props'], S = C['state']>(
    component: ReactElement<P>,
    options: Options = {},
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
    const oldPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = () => null as unknown as ReactPortal;
    try {
        return render(<AllProviders staticDevice={device}>{component}</AllProviders>);
    } finally {
        ReactDOM.createPortal = oldPortal;
    }
}

export function renderWithTheme(
    component: ReactElement,
): cheerio.Cheerio {
    return render(
        <ThemeWrapper>
            {component}
        </ThemeWrapper>,
    );
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

export function renderPortalWithProviders(
    component: ReactElement,
    device?: DeviceType,
): RenderResult {
    return testingLibRender(<AllProviders staticDevice={device}>{component}</AllProviders>);
}
