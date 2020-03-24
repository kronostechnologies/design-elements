import { mount } from 'enzyme';
import React, { ReactElement } from 'react';
import { DeviceContextProvider, DeviceType, useDeviceContext } from './device-context-provider';

const TestComponent = (): ReactElement => {
    const deviceContext = useDeviceContext();
    return <button test-context={deviceContext} />;
};

const mountComponent = (staticDevice?: DeviceType) => (
    mount(
        <DeviceContextProvider staticDevice={staticDevice}>
            <TestComponent/>
        </DeviceContextProvider>,
    )
);

const getContextObject = (
    device: DeviceType,
    desktop: boolean,
    tablet: boolean,
    mobile: boolean,
) => {
    return {
        device: device,
        isDesktop: desktop,
        isTablet: tablet,
        isMobile: mobile,
    };
};

const setScreenWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
};

describe('Device Context Provider', () => {
    test('Default value is desktop', () => {
        const wrapper = mount(<TestComponent/>);
        const element = wrapper.find('button');

        expect(element.prop('test-context')).toEqual(getContextObject('desktop', true, false, false));
    });

    test('Should return desktop when screen width is larger than 1024px', () => {
        setScreenWidth(1100);
        const wrapper = mountComponent();
        const element = wrapper.find('button');

        expect(element.prop('test-context')).toEqual(getContextObject('desktop', true, false, false));
    });

    test('Should return tablet when screen width is larger than 480px and smaller than 1024px', () => {
        setScreenWidth(700);
        const wrapper = mountComponent();
        const element = wrapper.find('button');

        expect(element.prop('test-context')).toEqual(getContextObject('tablet', false, true, false));
    });

    test('Should return mobile when screen width is smaller than 480px', () => {
        setScreenWidth(400);
        const wrapper = mountComponent();
        const element = wrapper.find('button');

        expect(element.prop('test-context')).toEqual(getContextObject('mobile', false, false, true));
    });

    test('Should return staticDevice value (tablet)', () => {
        setScreenWidth(1200);
        const wrapper = mountComponent('tablet');
        const element = wrapper.find('button');

        expect(element.prop('test-context')).toEqual(getContextObject('tablet', false, true, false));
    });
});
