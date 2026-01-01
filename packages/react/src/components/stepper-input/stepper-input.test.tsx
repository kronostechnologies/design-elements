import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { StepperInput } from './stepper-input';

describe('Stepper input', () => {
    it('should not show validation message when input is empty and required onBlur', async () => {
        renderWithProviders(
            <form>
                <StepperInput label="test" required validationErrorMessage="This field is required" />
                <button data-testid="submit-button" type="submit">Submit</button>
            </form>,
        );

        const input = screen.getByTestId('stepper-input');
        await userEvent.clear(input);
        await userEvent.tab();
        expect(screen.queryByTestId('invalid-field')).toBeNull();

        await userEvent.click(screen.getByTestId('submit-button'));
        expect(screen.getByTestId('invalid-field')).not.toBeNull();
    });

    it('calls onChange callback when input value changes', async () => {
        const callback = jest.fn();
        renderWithProviders(<StepperInput onChange={callback} />);

        const input = screen.getByTestId('stepper-input');
        await userEvent.type(input, '3');

        expect(callback).toHaveBeenCalledWith(3);
    });

    it('calls onBlur callback when input is blurred', async () => {
        const callback = jest.fn();
        renderWithProviders(<StepperInput onBlur={callback} />);

        const input = screen.getByTestId('stepper-input');
        await userEvent.click(input);
        await userEvent.tab();

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus callback when input is focused', async () => {
        const callback = jest.fn();
        renderWithProviders(<StepperInput onFocus={callback} />);

        const input = screen.getByTestId('stepper-input');
        await userEvent.click(input);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('matches snapshot', () => {
        const { container } = renderWithProviders(<StepperInput label="test" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (mobile)', () => {
        const { container } = renderWithProviders(<StepperInput label="test" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (invalid)', () => {
        const { container } = renderWithProviders(<StepperInput label="test" valid={false} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (disabled)', () => {
        const { container } = renderWithProviders(<StepperInput label="test" disabled />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
