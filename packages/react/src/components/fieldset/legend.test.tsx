import { DeviceType } from '../device-context-provider';
import { renderWithProviders } from '../../test-utils/renderer';
import { Legend, type LegendSize } from './legend';

describe('Legend', () => {
    const sizes: LegendSize[] = ['small', 'medium', 'large'];
    const boldStates = [true, false];
    const devices: DeviceType[] = ['mobile', 'desktop'];

    describe('Styling', () => {
        describe.each(devices)('Device: %s', (device) => {
            describe.each(sizes)('Size: %s', (size) => {
                it.each(boldStates)('Bold: %s', (bold) => {
                    const { asFragment } = renderWithProviders(
                        <Legend size={size} bold={bold}>Sample Legend</Legend>,
                        device,
                    );
                    expect(asFragment()).toMatchSnapshot();
                });
            });
        });
    });
});
