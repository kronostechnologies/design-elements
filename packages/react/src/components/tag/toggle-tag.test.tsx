import { renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider';
import { ToggleTag, ToggleTagProps } from './toggle-tag';

describe('ToggleTag', () => {
    const tagSizes: ToggleTagProps['size'][] = ['small', 'medium'];
    tagSizes.forEach((size) => {
        describe(`ToggleTag ${size}`, () => {
            (['mobile', 'desktop'] as DeviceType[]).forEach((deviceType) => {
                it(`matches snapshot (${deviceType})`, () => {
                    const { container } = renderWithProviders(
                        <ToggleTag size={size} value={{ label: 'Test' }} />,
                        'desktop',
                    );

                    expect(container.firstChild).toMatchSnapshot();
                });

                it(`matches snapshot (${deviceType})`, () => {
                    const { container } = renderWithProviders(
                        <ToggleTag size={size} value={{ label: 'Test' }} />,
                        'mobile',
                    );

                    expect(container.firstChild).toMatchSnapshot();
                });

                it(`matches snapshot (${deviceType} with icons)`, () => {
                    const { container } = renderWithProviders(
                        <ToggleTag
                            size={size}
                            iconName="home"
                            value={{ label: 'Test' }}
                        />,
                    );

                    expect(container.firstChild).toMatchSnapshot();
                });

                it(`matches snapshot (${deviceType} clickable)`, () => {
                    const { container } = renderWithProviders(
                        <ToggleTag
                            size={size}
                            value={{ label: 'Test' }}
                            onClick={jest.fn()}
                        />,
                    );

                    expect(container.firstChild).toMatchSnapshot();
                });
            });
        });
    });
});
