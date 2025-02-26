import { render as testingLibRender, RenderResult } from '@testing-library/react';
import { CommonWrapper, mount, MountRendererProps, ReactWrapper, render } from 'enzyme';
import { act, Component, FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DesignSystem, DesignSystemProps } from '../components/design-system';
import { DeviceType } from '../components/device-context-provider/device-context-provider';
import { ThemeWrapper } from '../components/theme-wrapper/theme-wrapper';

export const AllProviders: FunctionComponent<PropsWithChildren<DesignSystemProps>> = ({
    children,
    language,
    theme,
    staticDevice,
}) => (
    <MemoryRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
        <DesignSystem language={language} staticDevice={staticDevice} theme={theme}>
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
        wrappingComponent: AllProviders as Options['wrappingComponent'],
    });
}

export function mountWithTheme<C extends Component, P = C['props'], S = C['state']>(
    component: ReactElement<P>,
    options?: MountRendererProps,
): ReactWrapper<P, S, C> {
    return mount(component, {
        wrappingComponent: ThemeWrapper as MountRendererProps['wrappingComponent'],
        ...options,
    });
}

export function renderWithProviders(
    component: ReactElement,
    device?: DeviceType,
): RenderResult {
    return testingLibRender(<AllProviders staticDevice={device}>{component}</AllProviders>);
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

export function rerenderPortalWithProviders(
    component: ReactElement,
    rerender: RenderResult['rerender'],
    device?: DeviceType,
): void {
    rerender(<AllProviders staticDevice={device}>{component}</AllProviders>);
}
