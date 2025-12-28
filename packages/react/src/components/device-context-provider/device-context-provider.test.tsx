import { render, screen } from '@testing-library/react';
import type { FC } from 'react';
import { breakpoints } from '../../legacy-constants/breakpoints';
import { DeviceContextProps, DeviceContextProvider, DeviceType, useDeviceContext } from './device-context-provider';

const TestComponent: FC = () => {
    const deviceContext = useDeviceContext();
    return <div data-testid="device-context" data-context={JSON.stringify(deviceContext)} />;
};

function getContextObject(
    device: DeviceType,
    isDesktop: boolean,
    isTablet: boolean,
    isMobile: boolean,
): DeviceContextProps {
    return {
        device,
        isDesktop,
        isTablet,
        isMobile,
        breakpoints,
    };
}

function setScreenWidth(width: number): void {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
    window.dispatchEvent(new Event('resize'));
}

describe('Device Context Provider', () => {
    it('default value is desktop', () => {
        render(<DeviceContextProvider><TestComponent /></DeviceContextProvider>);
        const element = screen.getByTestId('device-context');

        const context = JSON.parse(element.getAttribute('data-context')!);

        expect(context).toEqual(getContextObject('desktop', true, false, false));
    });

    it('should return desktop when screen width is larger than 1024px', () => {
        setScreenWidth(1100);
        render(<DeviceContextProvider><TestComponent /></DeviceContextProvider>);
        const element = screen.getByTestId('device-context');

        const context = JSON.parse(element.getAttribute('data-context')!);

        expect(context).toEqual(getContextObject('desktop', true, false, false));
    });

    it('should return tablet when screen width is larger than 480px and smaller than 1024px', () => {
        setScreenWidth(700);
        render(<DeviceContextProvider><TestComponent /></DeviceContextProvider>);
        const element = screen.getByTestId('device-context');

        const context = JSON.parse(element.getAttribute('data-context')!);

        expect(context).toEqual(getContextObject('tablet', false, true, false));
    });

    it('should return mobile when screen width is smaller than 480px', () => {
        setScreenWidth(400);
        render(<DeviceContextProvider><TestComponent /></DeviceContextProvider>);
        const element = screen.getByTestId('device-context');

        const context = JSON.parse(element.getAttribute('data-context')!);

        expect(context).toEqual(getContextObject('mobile', false, false, true));
    });

    it('should return staticDevice value (tablet)', () => {
        setScreenWidth(1200);
        render(<DeviceContextProvider staticDevice="tablet"><TestComponent /></DeviceContextProvider>);
        const element = screen.getByTestId('device-context');

        const context = JSON.parse(element.getAttribute('data-context')!);

        expect(context).toEqual(getContextObject('tablet', false, true, false));
    });
});
