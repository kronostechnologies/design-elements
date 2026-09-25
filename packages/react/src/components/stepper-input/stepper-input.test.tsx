import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { StepperInput } from './stepper-input';

const VALIDATION_ERROR_MESSAGE = 'This field is required';
const INVALID_FIELD_TEST_ID = 'invalid-field';

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

    it('matches snapshot (error)', () => {
        const { container } = renderWithProviders(
            <StepperInput
                label="test"
                valid={false}
                validationErrorMessage={VALIDATION_ERROR_MESSAGE}
                value={0}
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (error, mobile)', () => {
        const { container } = renderWithProviders(
            <StepperInput
                label="test"
                valid={false}
                validationErrorMessage={VALIDATION_ERROR_MESSAGE}
                value={0}
            />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (disabled)', () => {
        const { container } = renderWithProviders(<StepperInput label="test" disabled />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (read-only)', () => {
        const { container } = renderWithProviders(<StepperInput label="test" readOnly value={3} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders stepper buttons on mobile', () => {
        renderWithProviders(<StepperInput label="test" />, 'mobile');

        expect(screen.getByTestId('stepper-button-decrement')).toBeInTheDocument();
        expect(screen.getByTestId('stepper-button-increment')).toBeInTheDocument();
    });

    it('does not render stepper buttons when read-only', () => {
        renderWithProviders(<StepperInput label="test" readOnly value={2} />);

        expect(screen.queryByTestId('stepper-button-decrement')).toBeNull();
        expect(screen.queryByTestId('stepper-button-increment')).toBeNull();
        expect(screen.getByTestId('stepper-input-readonly')).toBeInTheDocument();
    });

    it('disables increment button when value equals max', () => {
        renderWithProviders(<StepperInput max={5} value={5} />);

        expect(screen.getByTestId('stepper-button-increment')).toBeDisabled();
        expect(screen.getByTestId('stepper-button-decrement')).not.toBeDisabled();
    });

    it('disables decrement button when value equals min', () => {
        renderWithProviders(<StepperInput min={0} value={0} />);

        expect(screen.getByTestId('stepper-button-decrement')).toBeDisabled();
        expect(screen.getByTestId('stepper-button-increment')).not.toBeDisabled();
    });

    it('shows validation error message when valid is false', () => {
        renderWithProviders(
            <StepperInput
                label="test"
                valid={false}
                validationErrorMessage={VALIDATION_ERROR_MESSAGE}
            />,
        );

        expect(screen.getByTestId(INVALID_FIELD_TEST_ID)).toHaveTextContent(VALIDATION_ERROR_MESSAGE);
    });
});
