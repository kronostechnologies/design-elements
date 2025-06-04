import { shallow } from 'enzyme';
import { Button } from '~/components/buttons/button';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

describe('Button', () => {
    it('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(<Button onClick={callback} buttonType="primary" label="Primary Button" />);

        wrapper.simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onClick callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(
            <Button
                onClick={callback}
                buttonType="primary"
                disabled
                label="Primary Button"
            />,
        );

        wrapper.simulate('click');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    it('focusable button has no tabIndex prop', () => {
        const wrapper = mountWithProviders(<Button buttonType="primary" label="Primary Button" />);

        expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBeNull();
    });

    it('non-focusable button has tabIndex=-1', () => {
        const wrapper = mountWithProviders(<Button buttonType="primary" label="Primary Button" focusable={false} />);

        expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe('-1');
    });

    it('focusable button has focus styles', () => {
        const wrapper = mountWithProviders(<Button buttonType="primary" label="Primary Button" />);

        expect(wrapper).toHaveStyleRule('outline', '2px solid #84C6EA', {
            modifier: ':focus-visible',
        });
    });

    it('non-focusable button does not have focus styles', () => {
        const wrapper = mountWithProviders(<Button buttonType="primary" label="Primary Button" focusable={false} />);

        expect(wrapper).not.toHaveStyleRule('outline', 'none', {
            modifier: ':focus',
        });
    });

    it('icons can be placed left and right of the button', () => {
        const wrapper = shallow(
            <Button
                buttonType="primary"
                label="Primary Button"
                leftIconName="chevronLeft"
                rightIconName="chevronRight"
            />,
        );

        expect(getByTestId(wrapper, 'left-icon')).toHaveLength(1);
        expect(getByTestId(wrapper, 'right-icon')).toHaveLength(1);
    });

    it('icons can be placed on one side of the button', () => {
        const wrapper = shallow(
            <Button
                buttonType="primary"
                label="Primary Button"
                rightIconName="chevronRight"
            />,
        );

        expect(getByTestId(wrapper, 'left-icon')).toHaveLength(0);
        expect(getByTestId(wrapper, 'right-icon')).toHaveLength(1);
    });
});
