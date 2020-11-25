import { DeviceContextProvider } from '@equisoft/design-elements-react';
import React, { ComponentType } from 'react';
import { decorateWith } from './decorator';

export const DeviceContextDecorator = decorateWith(DeviceContextProvider);

export const DesktopDecorator = (Story: ComponentType) => (
    <DeviceContextProvider staticDevice="desktop"><Story /></DeviceContextProvider>
);
export const MobileDecorator = (Story: ComponentType) => (
    <DeviceContextProvider staticDevice="mobile"><Story /></DeviceContextProvider>
);
