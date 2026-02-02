import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { breakpoints, Breakpoints } from '../../legacy-constants/breakpoints';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export interface DeviceContextProviderProps {
    staticDevice?: DeviceType;
}

export interface DeviceContextProps {
    device: DeviceType;
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
    breakpoints: Breakpoints;
}

const getDeviceContext = (deviceName: DeviceType | undefined = undefined): DeviceContextProps => {
    let isDesktop = false;
    let isTablet = false;
    let isMobile = false;
    const defaultContext: DeviceContextProps = {
        device: 'desktop',
        isDesktop: true,
        isTablet: false,
        isMobile: false,
        breakpoints,
    };

    if (deviceName) {
        if (deviceName === 'desktop') {
            isDesktop = true;
        } else if (deviceName === 'tablet') {
            isTablet = true;
        } else if (deviceName === 'mobile') {
            isMobile = true;
        }

        return {
            device: deviceName,
            isDesktop,
            isTablet,
            isMobile,
            breakpoints,
        };
    }
    return defaultContext;
};

const getDevice = (screenWidth: number): DeviceType => {
    let currentDevice: DeviceType = 'desktop';
    if (screenWidth >= breakpoints.desktop) {
        currentDevice = 'desktop';
    } else if (screenWidth < breakpoints.desktop && screenWidth > breakpoints.mobile) {
        currentDevice = 'tablet';
    } else if (screenWidth <= breakpoints.mobile) {
        currentDevice = 'mobile';
    }

    return currentDevice;
};

const DeviceContext = createContext<DeviceContextProps>(getDeviceContext());

/**
 * @deprecated Use {@link DesignSystem} instead
 */
export const DeviceContextProvider: FunctionComponent<PropsWithChildren<DeviceContextProviderProps>> = ({
    children,
    staticDevice,
}) => {
    const [device, setDevice] = useState<DeviceContextProps>(getDeviceContext(staticDevice));

    function handleScreenResize(): void {
        const screenWidth = (window.innerWidth || document.documentElement.clientWidth);
        const currentDevice = getDevice(screenWidth);

        setDevice(getDeviceContext(currentDevice));
    }

    useEffect(() => {
        if (!staticDevice) {
            handleScreenResize();
            window.addEventListener('resize', handleScreenResize);
            return () => {
                window.removeEventListener('resize', handleScreenResize);
            };
        }
        return undefined;
    }, [staticDevice]);

    return (
        <DeviceContext.Provider value={device}>
            {children}
        </DeviceContext.Provider>
    );
};

DeviceContextProvider.displayName = 'DeviceContextProvider';

export function useDeviceContext(): DeviceContextProps {
    return useContext(DeviceContext);
}
