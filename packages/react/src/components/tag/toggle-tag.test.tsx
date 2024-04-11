import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { ToggleTag } from './toggle-tag';
import { ToggleTagProps } from './types';

describe('ToggleTag', () => {
    const tagSizes: ToggleTagProps['size'][] = ['small', 'medium'];
    tagSizes.forEach((size) => {
        describe(`ToggleTag ${size}`, () => {
            it('should call onClick callback when tag is clicked', () => {
                const callback = jest.fn();
                const wrapper = shallow(
                    <ToggleTag size={size} value={{ label: 'Test' }} onClick={callback} />,
                );

                wrapper.simulate('click');

                expect(callback).toHaveBeenCalledTimes(1);
            });

            it(
                'should have aria-hidden="false" and an aria-label on icon when the label is not the same as iconName',
                () => {
                    const wrapper = shallow(
                        <ToggleTag size={size} iconName="home" value={{ label: 'Test' }} />,
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
                        <ToggleTag size={size} iconName="home" value={{ label: 'Home' }} />,
                    );

                    const testIconWrapper = getByTestId(wrapper, 'Home-icon');
                    expect(testIconWrapper.prop('aria-label')).toBe(undefined);
                    expect(testIconWrapper.prop('aria-hidden')).toBe(true);
                },
            );

            (['mobile', 'desktop'] as DeviceType[]).forEach((deviceType) => {
                it(`matches snapshot (${deviceType})`, () => {
                    const tree = renderWithProviders(<ToggleTag size={size} value={{ label: 'Test' }} />, 'desktop');

                    expect(tree).toMatchSnapshot();
                });

                it(`matches snapshot (${deviceType})`, () => {
                    const tree = renderWithProviders(<ToggleTag size={size} value={{ label: 'Test' }} />, 'mobile');

                    expect(tree).toMatchSnapshot();
                });

                it(`matches snapshot (${deviceType} with icons)`, () => {
                    const tree = renderWithProviders(
                        <ToggleTag
                            size={size}
                            iconName="home"
                            value={{ label: 'Test' }}
                        />,
                    );

                    expect(tree).toMatchSnapshot();
                });

                it(`matches snapshot (${deviceType} clickable)`, () => {
                    const tree = renderWithProviders(
                        <ToggleTag
                            size={size}
                            value={{ label: 'Test' }}
                            onClick={jest.fn()}
                        />,
                    );

                    expect(tree).toMatchSnapshot();
                });
            });
        });
    });
});
