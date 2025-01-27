import { FunctionComponent, PropsWithChildren } from 'react';
import { DeviceContextProvider, DeviceContextProviderProps } from './device-context-provider/device-context-provider';
import { IntlProvider, IntlProviderProps } from './internationalization-provider/internationalization-provider';
import { ThemeWrapper, ThemeWrapperProps } from './theme-wrapper/theme-wrapper';
import { ToastProvider } from './toast/toast-provider';

export type DesignSystemProps = ThemeWrapperProps & DeviceContextProviderProps & IntlProviderProps;

export const DesignSystem: FunctionComponent<PropsWithChildren<DesignSystemProps>> = (props) => (
    <DeviceContextProvider staticDevice={props.staticDevice}>
        <ThemeWrapper
            isolateStyles={props.isolateStyles}
            themeCustomization={props.themeCustomization}
            displayPreferences={props.displayPreferences}
        >
            <IntlProvider language={props.language}>
                <ToastProvider>
                    {props.children}
                </ToastProvider>
            </IntlProvider>
        </ThemeWrapper>
    </DeviceContextProvider>
);
