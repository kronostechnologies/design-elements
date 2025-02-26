import { fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { StepperInput } from './stepper-input';

describe('Stepper input', () => {
    test('should not show validation message when input is empty and required onBlur', () => {
        const { getByTestId: byTestId, queryByTestId } = renderWithProviders(
            <form>
                <StepperInput label="test" required validationErrorMessage="This field is required" />
                <button data-testid="submit-button" type="submit">Submit</button>
            </form>,
        );

        fireEvent.blur(byTestId('stepper-input'), { target: { value: '' } });
        expect(queryByTestId('invalid-field')).toBeNull();

        fireEvent.click(byTestId('submit-button'));
        expect(byTestId('invalid-field')).not.toBeNull();
    });

    test('onChange callback should be called when input value changes', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<StepperInput onChange={callback} />);

        getByTestId(wrapper, 'stepper-input').simulate('change', { target: { value: 3 } });

        expect(callback).toHaveBeenCalledWith(3);
    });

    test('onBlur callback should be called when input is blurred', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<StepperInput onBlur={callback} />);

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
        const { container } = renderWithProviders(<StepperInput label="test" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (mobile)', () => {
        const { container } = renderWithProviders(<StepperInput label="test" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (invalid)', () => {
        const { container } = renderWithProviders(<StepperInput label="test" valid={false} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (disabled)', () => {
        const { container } = renderWithProviders(<StepperInput label="test" disabled />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
