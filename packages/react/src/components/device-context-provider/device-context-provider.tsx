import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState  } from 'react';
import { breakpoints } from '../../tokens/breakpoints';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';
interface Props {
    children: ReactNode;
    staticDevice?: DeviceType;
}
const DeviceContext = createContext<DeviceType>('desktop');

function DeviceContextProvider({ children, staticDevice }: Props): ReactElement {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth);
    const [device, setDevice] = useState<DeviceType>(staticDevice || 'desktop');

    if (!staticDevice) {
        useEffect(() => {
            window.addEventListener('resize', handleScreenResize);
            return () => {
                window.removeEventListener('resize', handleScreenResize);
            };
        }, []);

        useEffect(() => {
            const isDesktop = screenWidth > breakpoints.tablet;
            const isTablet = screenWidth <= breakpoints.tablet && screenWidth > breakpoints.mobile;
            const isMobile = screenWidth <= breakpoints.mobile;

            if (isDesktop) setDevice('desktop');
            else if (isTablet) setDevice('tablet');
            else if (isMobile) setDevice('mobile');
        }, [screenWidth]);
    }

    const handleScreenResize = (): void => {
        setScreenWidth(window.innerWidth || document.documentElement.clientWidth);
    };

    return (
        <DeviceContext.Provider value={device}>
            {children}
        </DeviceContext.Provider>
    );
}

export { DeviceContextProvider };
export const useDeviceContext = () => useContext(DeviceContext);
