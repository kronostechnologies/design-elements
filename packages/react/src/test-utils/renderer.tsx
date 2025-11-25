import { render as testingLibRender, RenderResult } from '@testing-library/react';
import { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DesignSystem, type DesignSystemProps, type DeviceType } from '../components';

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

export function renderWithProviders(
    component: ReactElement,
    device?: DeviceType,
): RenderResult {
    return testingLibRender(<AllProviders staticDevice={device}>{component}</AllProviders>);
}

export function rerenderWithProviders(
    component: ReactElement,
    rerender: RenderResult['rerender'],
    device?: DeviceType,
): void {
    rerender(<AllProviders staticDevice={device}>{component}</AllProviders>);
}
