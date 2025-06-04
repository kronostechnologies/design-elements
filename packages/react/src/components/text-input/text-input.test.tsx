import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { TextInput } from './text-input';

describe('TextInput', () => {
    test('should not show validation message when input is empty and required onBlur', () => {
        const { getByTestId: byTestId, queryByTestId } = renderWithProviders(
            <form>
                <TextInput label="test" required validationErrorMessage="This field is required" />
                <button data-testid="submit-button" type="submit">Submit</button>
            </form>,
        );

        fireEvent.blur(byTestId('text-input'), { target: { value: '' } });
        expect(queryByTestId('invalid-field')).toBeNull();

        fireEvent.click(byTestId('submit-button'));
        expect(byTestId('invalid-field')).not.toBeNull();
    });
});
