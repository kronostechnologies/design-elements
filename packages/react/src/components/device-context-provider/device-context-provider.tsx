import {
    createContext,
    FunctionComponent,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
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

function getDeviceContext(deviceName: DeviceType): DeviceContextProps {
    return {
        device: deviceName,
        isDesktop: deviceName === 'desktop',
        isTablet: deviceName === 'tablet',
        isMobile: deviceName === 'mobile',
        breakpoints,
    };
}

function getDeviceType(): DeviceType {
    let currentDevice: DeviceType = 'desktop';
    const screenWidth = (window.innerWidth || document.documentElement.clientWidth);

    if (screenWidth >= breakpoints.desktop) {
        currentDevice = 'desktop';
    } else if (screenWidth < breakpoints.desktop && screenWidth > breakpoints.mobile) {
        currentDevice = 'tablet';
    } else if (screenWidth <= breakpoints.mobile) {
        currentDevice = 'mobile';
    }

    return currentDevice;
}

const DeviceContext = createContext<DeviceContextProps>(getDeviceContext(getDeviceType()));

export const DeviceContextProvider: FunctionComponent<PropsWithChildren<DeviceContextProviderProps>> = ({
    children,
    staticDevice,
}) => {
    const deviceType = staticDevice || getDeviceType();

    const previousDeviceType = useRef<DeviceType>(deviceType);
    const previousStaticDevice = useRef<DeviceType | undefined>(staticDevice);
    const [deviceContext, setDeviceContext] = useState<DeviceContextProps>(getDeviceContext(deviceType));

    if (staticDevice !== previousStaticDevice.current) {
        previousStaticDevice.current = staticDevice;
        setDeviceContext(getDeviceContext(deviceType));
    }

    const handleScreenResize = useCallback(() => {
        const currentDeviceType = getDeviceType();

        if (currentDeviceType !== previousDeviceType.current) {
            previousDeviceType.current = currentDeviceType;
            setDeviceContext(getDeviceContext(currentDeviceType));
        }
    }, []);

    useEffect(() => {
        if (!staticDevice) {
            window.addEventListener('resize', handleScreenResize);
            return () => {
                window.removeEventListener('resize', handleScreenResize);
            };
        }
        return undefined;
    }, [handleScreenResize, staticDevice]);

    return (
        <DeviceContext.Provider value={deviceContext}>
            {children}
        </DeviceContext.Provider>
    );
};

export function useDeviceContext(): DeviceContextProps {
    return useContext(DeviceContext);
}
