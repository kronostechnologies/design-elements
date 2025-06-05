import { mount, ReactWrapper } from 'enzyme';
import { ReactElement } from 'react';
import { breakpoints } from '~/components/../legacy-constants/breakpoints';
import {
    DeviceContextProps,
    DeviceContextProvider,
    DeviceType,
    useDeviceContext,
} from '~/components/device-context-provider/device-context-provider';

const TestComponent = (): ReactElement => {
    const deviceContext = useDeviceContext();
    return <button type="button" data-test-context={deviceContext} />;
};

function mountComponent(staticDevice?: DeviceType): ReactWrapper {
    return mount(
        <DeviceContextProvider staticDevice={staticDevice}>
            <TestComponent />
        </DeviceContextProvider>,
    );
}

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
}

describe('Device Context Provider', () => {
    it('Default value is desktop', () => {
        const wrapper = mount(<TestComponent />);
        const element = wrapper.find('button');

        expect(element.prop('data-test-context')).toEqual(getContextObject('desktop', true, false, false));
    });

    it('Should return desktop when screen width is larger than 1024px', () => {
        setScreenWidth(1100);
        const wrapper = mountComponent();
        const element = wrapper.find('button');

        expect(element.prop('data-test-context')).toEqual(getContextObject('desktop', true, false, false));
    });

    it('Should return tablet when screen width is larger than 480px and smaller than 1024px', () => {
        setScreenWidth(700);
        const wrapper = mountComponent();
        const element = wrapper.find('button');

        expect(element.prop('data-test-context')).toEqual(getContextObject('tablet', false, true, false));
    });

    it('Should return mobile when screen width is smaller than 480px', () => {
        setScreenWidth(400);
        const wrapper = mountComponent();
        const element = wrapper.find('button');

        expect(element.prop('data-test-context')).toEqual(getContextObject('mobile', false, false, true));
    });

    it('Should return staticDevice value (tablet)', () => {
        setScreenWidth(1200);
        const wrapper = mountComponent('tablet');
        const element = wrapper.find('button');

        expect(element.prop('data-test-context')).toEqual(getContextObject('tablet', false, true, false));
    });
});
