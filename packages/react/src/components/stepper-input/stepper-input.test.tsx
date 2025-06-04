import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
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
