import { DeviceContextProviderProps } from '~/components/device-context-provider/device-context-provider';
import { Legend } from '~/components/fieldset/legend';
import { LegendSize } from '~/components/fieldset/types';
import { mountWithProviders } from '../../test-utils/renderer';

describe('Legend Component', () => {
    const sizes: LegendSize[] = ['small', 'medium', 'large'];
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
