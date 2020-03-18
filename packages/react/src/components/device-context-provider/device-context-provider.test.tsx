import { mount } from 'enzyme';
import React, { ReactElement } from 'react';
import { DeviceContextProvider, DeviceType, useDeviceContext } from './device-context-provider';

const TestComponent = (): ReactElement => {
    const deviceContext = useDeviceContext();
    return <button value={deviceContext} />;
};

const setup = (staticDevice?: DeviceType) => (
    mount(
        <DeviceContextProvider staticDevice={staticDevice}>
            <TestComponent/>
        </DeviceContextProvider>,
    )
);

const setScreenWidth = (width: number) =>
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });

describe('Device Context Provider', () => {
    test('Default value is desktop', () => {
        const wrapper = mount(<TestComponent/>);
        const element = wrapper.find('button');

        expect(element.props().value).toEqual('desktop');
    });

    test('Should return desktop', () => {
        setScreenWidth(1000);
        const wrapper = setup();
        const element = wrapper.find('button');

        expect(element.props().value).toEqual('desktop');
    });

    test('Should return tablet', () => {
        setScreenWidth(700);
        const wrapper = setup();
        const element = wrapper.find('button');

        expect(element.props().value).toEqual('tablet');
    });

    test('Should return mobile', () => {
        setScreenWidth(500);
        const wrapper = setup();
        const element = wrapper.find('button');

        expect(element.props().value).toEqual('mobile');
    });

    test('Should return staticDevice value (tablet)', () => {
        setScreenWidth(1000);
        const wrapper = setup('tablet');
        const element = wrapper.find('button');

        expect(element.props().value).toEqual('tablet');
    });
})