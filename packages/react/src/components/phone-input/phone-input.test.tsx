import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { PhoneInput } from './phone-input';

describe('PhoneInput', () => {
    it('should not show validation message when input is empty and required onBlur', async () => {
        const user = userEvent.setup();
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

        await user.clear(byTestId('phone-text-input'));
        await user.tab();
        expect(queryByTestId('invalid-field')).toBeNull();

        await user.click(byTestId('submit-button'));
        expect(byTestId('invalid-field')).not.toBeNull();
    });

    it('should have controllable data-testid', () => {
        const customDataTestId = 'some-data-test-id';
        renderWithProviders(
            <PhoneInput
                data-testid={customDataTestId}
                pattern="(___) ___-____"
                defaultValue="(123) 456-7890"
            />,
        );

        expect(screen.getByTestId(customDataTestId)).toBeInTheDocument();
    });

    it('should display the defaultValue', () => {
        renderWithProviders(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890" />);

        const phoneInput = screen.getByTestId('phone-text-input');

        expect(phoneInput).toHaveValue('(123) 456-7890');
    });

    it('should trimmed defaultValue chars that exceed input max length', () => {
        renderWithProviders(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890 123" />);

        const phoneInput = screen.getByTestId('phone-text-input');

        expect(phoneInput).toHaveValue('(123) 456-7890');
    });

    it('should format and display the first tab panel by default', () => {
        renderWithProviders(<PhoneInput pattern="(___) ___-____" defaultValue="1234567890" />);

        const phoneInput = screen.getByTestId('phone-text-input');

        expect(phoneInput).toHaveValue('(123) 456-7890');
    });

    it('should format value on change', async () => {
        const user = userEvent.setup();
        renderWithProviders(<PhoneInput pattern="(___) ___-____" />);

        const phoneInput = screen.getByTestId('phone-text-input');
        await user.type(phoneInput, '123');

        expect(phoneInput).toHaveValue('(123) ');
    });

    it('should format new inserted value when phone input is already complete but trim last character', async () => {
        const user = userEvent.setup();
        renderWithProviders(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890" />);

        const phoneInput = screen.getByTestId('phone-text-input') as HTMLInputElement;
        phoneInput.focus();
        phoneInput.setSelectionRange(6, 6);
        await user.keyboard('0');

        expect(phoneInput).toHaveValue('(123) 045-6789');
    });

    it('should remove previous digit following mask char removal when removing char with backspace', async () => {
        const user = userEvent.setup();
        renderWithProviders(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890" />);

        const phoneInput = screen.getByTestId('phone-text-input') as HTMLInputElement;
        phoneInput.focus();
        phoneInput.setSelectionRange(5, 5);
        await user.keyboard('{backspace}');

        expect(phoneInput).toHaveValue('(124) 567-890');
    });

    it('should remove next digit following mask char removal when removing char with delete', async () => {
        const user = userEvent.setup();
        renderWithProviders(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890" />);

        const phoneInput = screen.getByTestId('phone-text-input') as HTMLInputElement;
        phoneInput.focus();
        phoneInput.setSelectionRange(4, 4);
        await user.keyboard('{delete}');

        expect(phoneInput).toHaveValue('(123) 567-890');
    });

    it('should reinsert mask char when removing a mask char at the beginning of the input', async () => {
        const user = userEvent.setup();
        renderWithProviders(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890" />);

        const phoneInput = screen.getByTestId('phone-text-input') as HTMLInputElement;
        phoneInput.focus();
        phoneInput.setSelectionRange(1, 1);
        await user.keyboard('{backspace}');

        expect(phoneInput).toHaveValue('(123) 456-7890');
    });
});
