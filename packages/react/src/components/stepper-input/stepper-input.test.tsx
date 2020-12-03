import { shallow } from 'enzyme';
import React from 'react';

import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { renderWithProviders } from '@design-elements/test-utils/renderer';
import { StepperInput } from './stepper-input';

jest.mock('uuid/v4');

describe('Stepper input', () => {
    test('onChange callback should be called when input value changes', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperInput onChange={callback} />);

        getByTestId(wrapper, 'stepper-input').simulate('change', { value: 3 });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onBlur callback should be called when input is blurred', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperInput onBlur={callback} />);

        getByTestId(wrapper, 'stepper-input').simulate('blur');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onFocus callback should be called when input is focused', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperInput onFocus={callback} />);

        getByTestId(wrapper, 'stepper-input').simulate('focus');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('matches snapshot', () => {
        const tree = renderWithProviders(<StepperInput label="test" />);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (mobile)', () => {
        const tree = renderWithProviders(<StepperInput label="test" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (invalid)', () => {
        const tree = renderWithProviders(<StepperInput label="test" valid={false} />);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (disabled)', () => {
        const tree = renderWithProviders(<StepperInput label="test" disabled />);

        expect(tree).toMatchSnapshot();
    });
});
