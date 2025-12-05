import { RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { type DeviceType } from '../components';
import { renderWithProviders as testingLibRender } from './testing-library';

// TODO: merge with renderWithProviders from ./testing-library file
export function renderWithProviders(
    component: ReactElement,
    device: DeviceType | undefined = undefined,
    language: string = 'en',
): RenderResult {
    return testingLibRender(component, {}, { language, staticDevice: device });
}
