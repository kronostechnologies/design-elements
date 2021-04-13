import React, { FunctionComponent } from 'react';
import { DeviceContextProvider, DeviceContextProviderProps } from './device-context-provider/device-context-provider';
import { IntlProvider, IntlProviderProps } from './internationalization-provider/internationalization-provider';
import { ThemeWrapper, ThemeWrapperProps } from './theme-wrapper/theme-wrapper';

export type DesignSystemProps = ThemeWrapperProps & DeviceContextProviderProps & IntlProviderProps;

export const DesignSystem: FunctionComponent<DesignSystemProps> = (props) => (
    <DeviceContextProvider staticDevice={props.staticDevice}>
        <ThemeWrapper theme={props.theme} isolateStyles={props.isolateStyles}>
            <IntlProvider language={props.language}>
                {props.children}
            </IntlProvider>
        </ThemeWrapper>
    </DeviceContextProvider>
);
