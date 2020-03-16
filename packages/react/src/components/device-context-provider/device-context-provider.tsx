import { Context, createContext, useEffect, useState  } from 'react';
import { breakpoints } from '../../tokens/breakpoints';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

function DeviceContextProvider(): Context<DeviceType> {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth);
    const [device, setDevice] = useState<DeviceType>('desktop');
    const DeviceContext = createContext<DeviceType>(device);

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

    const handleScreenResize = (): void => {
        setScreenWidth(window.innerWidth || document.documentElement.clientWidth);
    };

    return DeviceContext;
}

export { DeviceContextProvider };
