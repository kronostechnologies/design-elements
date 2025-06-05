import { shallow } from 'enzyme';
import { StepperInput } from '~/components/stepper-input/stepper-input';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';

describe('Stepper input', () => {
    it('onChange callback should be called when input value changes', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<StepperInput onChange={callback} />);

        getByTestId(wrapper, 'stepper-input').simulate('change', { target: { value: 3 } });

        expect(callback).toHaveBeenCalledWith(3);
    });

    it('onBlur callback should be called when input is blurred', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<StepperInput onBlur={callback} />);

        getByTestId(wrapper, 'stepper-input').simulate('blur');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onFocus callback should be called when input is focused', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperInput onFocus={callback} />);

        getByTestId(wrapper, 'stepper-input').simulate('focus');

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
