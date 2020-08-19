import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState  } from 'react';
import { breakpoints } from '../../tokens/breakpoints';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';
interface Props {
    children: ReactNode;
    staticDevice?: DeviceType;
}

export interface DeviceContextProps {
    device: DeviceType;
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
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
    };

    if (deviceName) {
        if (deviceName === 'desktop') isDesktop = true;
        else if (deviceName === 'tablet') isTablet = true;
        else if (deviceName === 'mobile') isMobile = true;

        return {
            device: deviceName,
            isDesktop: isDesktop,
            isTablet: isTablet,
            isMobile: isMobile,
        };
    } else return defaultContext;
};

const getDevice = (screenWidth: number): DeviceType => {
    let currentDevice: DeviceType = 'desktop';
    if (screenWidth >= breakpoints.desktop) currentDevice = 'desktop';
    else if (screenWidth < breakpoints.desktop && screenWidth > breakpoints.mobile) currentDevice = 'tablet';
    else if (screenWidth <= breakpoints.mobile) currentDevice = 'mobile';

    return currentDevice;
};

const DeviceContext = createContext<DeviceContextProps>(getDeviceContext());

export const DeviceContextProvider = ({ children, staticDevice }: Props): ReactElement => {
    const [device, setDevice] = useState<DeviceContextProps>(getDeviceContext(staticDevice));

    if (!staticDevice) {
        useEffect(() => {
            handleScreenResize();
            window.addEventListener('resize', handleScreenResize);
            return () => {
                window.removeEventListener('resize', handleScreenResize);
            };
        }, []);

        const handleScreenResize = () => {
            const screenWidth = (window.innerWidth || document.documentElement.clientWidth);
            const currentDevice = getDevice(screenWidth);

            setDevice(getDeviceContext(currentDevice));
        };
    }

    return (
        <DeviceContext.Provider value={device}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDeviceContext = () => useContext(DeviceContext);
