import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { PhoneInput } from './phone-input';

describe('PhoneInput', () => {
    test('should not show validation message when input is empty and required onBlur', () => {
        const { getByTestId: byTestId, queryByTestId } = renderWithProviders(
            <form>
                <PhoneInput
                    pattern="(___) ___-____"
                    label="test"
                    required
                    validationErrorMessage="This field is required"
                />
                <button data-testid="submit-button" type="submit">Submit</button>
            </form>,
        );

        fireEvent.blur(byTestId('phone-text-input'), { target: { value: '' } });
        expect(queryByTestId('invalid-field')).toBeNull();

        fireEvent.click(byTestId('submit-button'));
        expect(byTestId('invalid-field')).not.toBeNull();
    });
});
