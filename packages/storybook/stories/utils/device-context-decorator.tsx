import { DeviceContextProvider } from '@equisoft/design-elements-react';
import React, { ComponentType } from 'react';
import { decorateWith, Decorator } from './decorator';

export const DeviceContextDecorator: Decorator = decorateWith(DeviceContextProvider);

export const DesktopDecorator: Decorator = (Story: ComponentType) => (
    <DeviceContextProvider staticDevice="desktop"><Story /></DeviceContextProvider>
);
export const MobileDecorator: Decorator = (Story: ComponentType) => (
    <DeviceContextProvider staticDevice="mobile"><Story /></DeviceContextProvider>
);
