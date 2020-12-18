import { shallow } from 'enzyme';
import React from 'react';

import { getByTestId } from '../../test-utils/enzyme-selectors';
import { StepperButtons } from './stepper-buttons';

describe('Stepper buttons', () => {
    test('onIncrement callback should be called when button-increment is clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperButtons onIncrement={callback} />);

        getByTestId(wrapper, 'stepper-button-increment').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onDecrement callback should be called when button-decrement is clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperButtons onDecrement={callback} />);

        getByTestId(wrapper, 'stepper-button-decrement').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
