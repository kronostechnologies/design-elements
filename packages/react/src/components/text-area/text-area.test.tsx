import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { TextArea } from './text-area';

describe('TextArea', () => {
    test('should not show validation message when input is empty and required onBlur', () => {
        const { getByTestId: byTestId, queryByTestId } = renderWithProviders(
            <form>
                <TextArea label="test" required validationErrorMessage="This field is required" />
                <button data-testid="submit-button" type="submit">Submit</button>
            </form>,
        );

        fireEvent.blur(byTestId('textarea'), { target: { value: '' } });
        expect(queryByTestId('invalid-field')).toBeNull();

        fireEvent.click(byTestId('submit-button'));
        expect(byTestId('invalid-field')).not.toBeNull();
    });
});
