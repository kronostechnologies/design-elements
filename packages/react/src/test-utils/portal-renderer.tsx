import { DeviceType } from '@design-elements/components/device-context-provider/device-context-provider';
import { render, RenderResult } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { AllProviders } from './renderer';

export function renderPortalWithProviders(
    component: ReactElement,
    device?: DeviceType,
): RenderResult {
    return render(<AllProviders device={device}>{component}</AllProviders>);
}
