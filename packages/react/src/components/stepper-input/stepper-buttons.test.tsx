import { shallow } from 'enzyme';

import { getByTestId } from '../../test-utils/enzyme-selectors';
import { StepperButtons } from './stepper-buttons';

describe('Stepper buttons', () => {
    test('onIncrement callback should be called when button-increment is mouse down clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperButtons onIncrement={callback} />);

        getByTestId(wrapper, 'stepper-button-increment').invoke('onMouseDown')(
            new MouseEvent('mousedown'),
        );

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onDecrement callback should be called when button-decrement is mouse down clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperButtons onDecrement={callback} />);

        getByTestId(wrapper, 'stepper-button-decrement').invoke('onMouseDown')(
            new MouseEvent('mousedown'),
        );

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onStop callback should be called when button-increment is mouse up clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperButtons onStop={callback} />);

        getByTestId(wrapper, 'stepper-button-increment').invoke('onMouseUp')(
            new MouseEvent('mouseup'),
        );

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onStop callback should be called when button-decrement is mouse up clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperButtons onStop={callback} />);

        getByTestId(wrapper, 'stepper-button-decrement').invoke('onMouseUp')(
            new MouseEvent('mouseup'),
        );

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onStop callback should be called when button-increment is mouse leave clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperButtons onStop={callback} />);

        getByTestId(wrapper, 'stepper-button-increment').invoke('onMouseLeave')(
            new MouseEvent('mouseLeave'),
        );

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onStop callback should be called when button-decrement is mouse leave clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<StepperButtons onStop={callback} />);

        getByTestId(wrapper, 'stepper-button-decrement').invoke('onMouseLeave')(
            new MouseEvent('mouseLeave'),
        );

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
