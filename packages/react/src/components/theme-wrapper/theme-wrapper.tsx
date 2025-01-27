import { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import { useStyle } from '../../styles';
import { buildTheme, equisoftThemeCustomization, ThemeCustomization, TokenContext } from '../../themes';
import { ShadowWrapper } from '../shadow-wrapper/shadow-wrapper';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';

export interface DisplayPreferences {
    // User-provided preferences for display (density, contrast, motion, etc.)
}

export interface ThemeWrapperProps {
    /**
     * When true, components are mounted in the Shadow DOM
     * @default false
     */
    isolateStyles?: boolean;
    themeCustomization?: ThemeCustomization;
    displayPreferences?: DisplayPreferences;
}

// Context values should be added in order of importance. Later values will be applied over earlier values.
function getTokenContext(
    deviceContext: DeviceContextProps,
    // @ts-ignore Future use
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    displayPreferences?: DisplayPreferences,
): TokenContext[] {
    const context: TokenContext[] = [];

    if (deviceContext.isMobile) {
        context.push('mobile');
    }

    if (deviceContext.isTablet) {
        context.push('tablet');
    }

    if (deviceContext.isDesktop) {
        context.push('desktop');
    }

    return context;
}

export const ThemeWrapper: FunctionComponent<PropsWithChildren<ThemeWrapperProps>> = ({
    children,
    isolateStyles = false,
    themeCustomization = equisoftThemeCustomization,
    displayPreferences,
}) => {
    const deviceContext = useDeviceContext();

    const resolvedTheme = buildTheme(
        themeCustomization,
        getTokenContext(deviceContext, displayPreferences),
    );

    useStyle(isolateStyles);

    return (
        <ThemeProvider theme={resolvedTheme}>
            {isolateStyles
                ? <ShadowWrapper>{children}</ShadowWrapper>
                : children}
        </ThemeProvider>
    );
};
