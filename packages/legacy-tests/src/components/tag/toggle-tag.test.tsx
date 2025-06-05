import { shallow } from 'enzyme';
import { ToggleTag, ToggleTagProps } from '~/components/tag/toggle-tag';
import { getByTestId } from '../../test-utils/enzyme-selectors';

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
        });
    });
});
