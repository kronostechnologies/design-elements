import { mountWithProviders } from '../../test-utils/renderer';
import { DeviceContextProviderProps } from '../device-context-provider/device-context-provider';
import { Legend } from './legend';
import { LegendSize } from './types';

describe('Legend Component', () => {
    const sizes: LegendSize[] = ['xxsmall', 'xsmall', 'small', 'medium', 'large'];
    const boldStates = [true, false];
    const devices: DeviceContextProviderProps['staticDevice'][] = ['mobile', 'desktop'];

    describe('Styling', () => {
        describe.each(devices)('Device: %s', (device) => {
            describe.each(sizes)('Size: %s', (size) => {
                it.each(boldStates)('Bold: %s', (bold) => {
                    const tree = mountWithProviders(
                        <Legend size={size} bold={bold}>Sample Legend</Legend>,
                        { wrappingComponentProps: { staticDevice: device } },
                    );
                    expect(tree).toMatchSnapshot();
                });
            });
        });
    });
});
