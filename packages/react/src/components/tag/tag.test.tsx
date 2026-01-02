import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

                    it(`calls onRemove callback when delete-button is clicked (${deviceType})`, async () => {
                        const callback = jest.fn();
                        const user = userEvent.setup();
                        renderWithProviders(
                            <Tag
                                size={size}
                                color={color}
                                value={{ label: 'Test' }}
                                onRemove={callback}
                            />,
                            deviceType,
                        );

                        await user.click(screen.getByTestId('Test-remove-button'));

                        expect(callback).toHaveBeenCalledTimes(1);
                    });

                    it(
                        `has aria-hidden="false" and an icon aria-label when label is not the same as iconName (${deviceType})`,
                        () => {
                            renderWithProviders(
                                <Tag
                                    size={size}
                                    color={color}
                                    iconName="home"
                                    value={{ label: 'Test' }}
                                />,
                                deviceType,
                            );

                            const icon = screen.getByTestId('Test-icon');

                            expect(icon).toHaveAttribute('aria-label', 'home');
                            expect(icon).toHaveAttribute('aria-hidden', 'false');
                        },
                    );

                    it(
                        `has aria-hidden="true" and no label on icon when the label is the same as the iconName (${deviceType})`,
                        () => {
                            renderWithProviders(
                                <Tag
                                    size={size}
                                    color={color}
                                    iconName="home"
                                    value={{ label: 'Home' }}
                                />,
                                deviceType,
                            );

                            const icon = screen.getByTestId('Home-icon');

                            expect(icon).not.toHaveAttribute('aria-label');
                            expect(icon).toHaveAttribute('aria-hidden', 'true');
                        },
                    );
                });
            });
        });
    });
});
