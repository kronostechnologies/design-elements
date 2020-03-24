import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState  } from 'react';
import { breakpoints } from '../../tokens/breakpoints';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';
interface Props {
    children: ReactNode;
    staticDevice?: DeviceType;
}

const DeviceContext = createContext<DeviceType>('desktop');

export const DeviceContextProvider = ({ children, staticDevice }: Props): ReactElement => {
    const [device, setDevice] = useState<DeviceType>(staticDevice || 'desktop');

    if (!staticDevice) {
        useEffect(() => {
            handleScreenResize();
            window.addEventListener('resize', handleScreenResize);
            return () => {
                window.removeEventListener('resize', handleScreenResize);
            };
        }, []);
    }

    const handleScreenResize = (): void => {
        const screenWidth = (window.innerWidth || document.documentElement.clientWidth);

        if (screenWidth >= breakpoints.desktop) setDevice('desktop');
        else if (screenWidth < breakpoints.desktop && screenWidth > breakpoints.mobile) setDevice('tablet');
        else if (screenWidth <= breakpoints.mobile) setDevice('mobile');
    };

    return (
        <DeviceContext.Provider value={device}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDeviceContext = () => useContext(DeviceContext);
