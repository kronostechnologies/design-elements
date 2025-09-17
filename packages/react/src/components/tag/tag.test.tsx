import { renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider';
import { Tag, TagProps } from './tag';

describe('Tag', () => {
    const tagSizes: TagProps['size'][] = ['small', 'medium'];
    const tagColors: TagProps['color'][] = ['default', 'decorative-01', 'decorative-02'];

    tagSizes.forEach((size) => {
        tagColors.forEach((color) => {
            describe(`Tag size=${size} color=${color}`, () => {
                (['mobile', 'desktop'] as DeviceType[]).forEach((deviceType) => {
                    it(`matches snapshot (${deviceType})`, () => {
                        const { container } = renderWithProviders(
                            <Tag
                                size={size}
                                color={color}
                                value={{ label: 'Test' }}
                            />,
                            deviceType,
                        );

                        expect(container.firstChild).toMatchSnapshot();
                    });

                    it(`matches snapshot (${deviceType} with icons)`, () => {
                        const { container } = renderWithProviders(
                            <Tag
                                size={size}
                                color={color}
                                iconName="home"
                                value={{ label: 'Test' }}
                            />,
                            deviceType,
                        );

                        expect(container.firstChild).toMatchSnapshot();
                    });

                    it(`matches snapshot (${deviceType} removable)`, () => {
                        const { container } = renderWithProviders(
                            <Tag
                                size={size}
                                color={color}
                                value={{ label: 'Test' }}
                                onRemove={jest.fn()}
                            />,
                            deviceType,
                        );

                        expect(container.firstChild).toMatchSnapshot();
                    });
                });
            });
        });
    });
});
