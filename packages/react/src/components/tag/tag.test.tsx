import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { Tag, TagProps } from './tag';

describe('Tag', () => {
    const tagSizes: TagProps['size'][] = ['small', 'medium'];
    const tagColors: TagProps['color'][] = ['default', 'decorative-01', 'decorative-02'];

    tagSizes.forEach((size) => {
        tagColors.forEach((color) => {
            describe(`Tag size=${size} color=${color}`, () => {
                it('should call onRemove callback when delete-button is clicked', () => {
                    const callback = jest.fn();
                    const stopPropagation = jest.fn();
                    const wrapper = shallow(
                        <Tag size={size} color={color} value={{ label: 'Test' }} onRemove={callback} />,
                    );

                    getByTestId(wrapper, 'Test-remove-button').simulate('click', { stopPropagation });

                    expect(callback).toHaveBeenCalledTimes(1);
                });

                it(
                    'should have aria-hidden="false" and an icon aria-label when label is not the same as iconName',
                    () => {
                        const wrapper = shallow(
                            <Tag size={size} color={color} iconName="home" value={{ label: 'Test' }} />,
                        );

                        const testIconWrapper = getByTestId(wrapper, 'Test-icon');
                        expect(testIconWrapper.prop('aria-label')).toBe('home');
                        expect(testIconWrapper.prop('aria-hidden')).toBe(false);
                    },
                );

                it(
                    'should have aria-hidden="true" and no label on icon when the label is the same as the iconName',
                    () => {
                        const wrapper = shallow(
                            <Tag size={size} color={color} iconName="home" value={{ label: 'Home' }} />,
                        );

                        const testIconWrapper = getByTestId(wrapper, 'Home-icon');
                        expect(testIconWrapper.prop('aria-label')).toBe(undefined);
                        expect(testIconWrapper.prop('aria-hidden')).toBe(true);
                    },
                );

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
