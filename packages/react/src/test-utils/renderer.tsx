import { RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
// @ts-expect-error hidden export
import { __PRIVATE__ } from 'styled-components';
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

export function renderGlobalStylesSynchronously(enabled: boolean): void {
    __PRIVATE__.masterSheet.server = enabled;
}
