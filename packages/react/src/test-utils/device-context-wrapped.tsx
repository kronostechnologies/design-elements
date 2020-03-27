import React, { ReactElement } from 'react';
import { DeviceContextProvider, DeviceType } from '../components/device-context-provider/device-context-provider';

export function DeviceContextWrapped(children: ReactElement, device?: DeviceType): ReactElement {
    return (
        <DeviceContextProvider staticDevice={device}>
            {children}
        </DeviceContextProvider>
    );
}
