import { mountWithProviders } from '../../test-utils/renderer';
import { DeviceContextProviderProps } from '../device-context-provider/device-context-provider';
import { Legend } from './legend';
import { LegendSize } from './types';

describe('Legend Component', () => {
    const sizes: LegendSize[] = ['small', 'medium', 'large'];
    const boldStates = [true, false];
    const devices: DeviceContextProviderProps['staticDevice'][] = ['mobile', 'desktop'];
    const disabledStates = [true, false];

    describe.each(devices)('Device: %s', (device) => {
        it.each(sizes)('renders with size %s', (size) => {
            const tree = mountWithProviders(
                <Legend size={size}>Sample Legend</Legend>,
                { wrappingComponentProps: { staticDevice: device } },
            );
            expect(tree).toMatchSnapshot();
        });

        it.each(boldStates)('renders with bold %s', (bold) => {
            const tree = mountWithProviders(
                <Legend bold={bold}>Sample Legend</Legend>,
                { wrappingComponentProps: { staticDevice: device } },
            );
            expect(tree).toMatchSnapshot();
        });

        it.each(disabledStates)('renders with disabled %s', (disabled) => {
            const tree = mountWithProviders(
                <Legend disabled={disabled}>Sample Legend</Legend>,
                { wrappingComponentProps: { staticDevice: device } },
            );
            expect(tree).toMatchSnapshot();
        });

        it('renders with all combinations of props', () => {
            sizes.forEach((size) => {
                boldStates.forEach((bold) => {
                    disabledStates.forEach((disabled) => {
                        const tree = mountWithProviders(
                            <Legend size={size} bold={bold} disabled={disabled}>Sample Legend</Legend>,
                            { wrappingComponentProps: { staticDevice: device } },
                        );
                        expect(tree).toMatchSnapshot();
                    });
                });
            });
        });
    });
});
