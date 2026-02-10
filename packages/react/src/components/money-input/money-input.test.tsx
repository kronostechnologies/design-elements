import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/testing-library';
import { MoneyInput } from './money-input';

function normalizeSpaces(value: string): string {
    return value.replace(/\s/g, ' ');
}

describe('MoneyInput Component', () => {
    it('should remove formatting on focus', async () => {
        renderWithProviders(
            <MoneyInput value={12345.25} />,
        );
        const input = screen.getByRole('textbox');
        const user = userEvent.setup();

        await user.click(input);

        expect(input).toHaveValue('12345.25');
    });

    it('should format on blur', async () => {
        renderWithProviders(<MoneyInput value={12345.25} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const user = userEvent.setup();

        await user.click(input);
        await user.tab();

        expect(normalizeSpaces(input.value)).toEqual('12 345,25 $');
    });

    it('should remove fractions when precision is 0 and changing value', async () => {
        renderWithProviders(<MoneyInput precision={0} value={12345.25} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const user = userEvent.setup();

        await user.clear(input);
        await user.type(input, '12345.25');
        await user.tab();

        expect(normalizeSpaces(input.value)).toEqual('12 345 $');
    });

    it('should use precision when changing value', async () => {
        renderWithProviders(<MoneyInput value={null} precision={2} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const user = userEvent.setup();

        await user.type(input, '123.457');
        await user.tab();

        expect(normalizeSpaces(input.value)).toEqual('123,46 $');
    });

    it('should format according to locale when changing value', async () => {
        renderWithProviders(<MoneyInput locale="en-CA" />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const user = userEvent.setup();

        await user.type(input, '12345');
        await user.tab();

        expect(normalizeSpaces(input.value)).toEqual('$12,345.00');
    });

    it('should format provided value', () => {
        renderWithProviders(<MoneyInput value={12345.25} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;

        expect(normalizeSpaces(input.value)).toEqual('12 345,25 $');
    });

    it('should format controlled value', () => {
        const { rerender } = renderWithProviders(<MoneyInput value={12345.25} />);

        rerender(<MoneyInput value={55555.50} />);

        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(normalizeSpaces(input.value)).toEqual('55 555,50 $');
    });

    it('should format controlled value set to 0', () => {
        const { rerender } = renderWithProviders(<MoneyInput value={12345.25} />);

        rerender(<MoneyInput value={0} />);

        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(normalizeSpaces(input.value)).toEqual('0,00 $');
    });

    it('should format to provided currency', () => {
        renderWithProviders(<MoneyInput value={12345.25} currency="USD" />);
        const input = screen.getByRole('textbox') as HTMLInputElement;

        expect(normalizeSpaces(input.value)).toEqual('12 345,25 $');
    });

    it('should select all text on focus', async () => {
        renderWithProviders(<MoneyInput value={12345} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const user = userEvent.setup();

        await user.click(input);

        expect(input.selectionStart).toEqual(0);
        expect(input.selectionEnd).toEqual(5);
    });

    it('should respect precision and locale when calling change handler', async () => {
        const handleChange = jest.fn();
        renderWithProviders(
            <MoneyInput locale="en-CA" precision={0} value={0} onChange={handleChange} />,
        );
        const input = screen.getByRole('textbox');
        const user = userEvent.setup();

        await user.clear(input);
        await user.type(input, '12.345');
        await user.tab();

        expect(handleChange).toHaveBeenCalledWith(12, '$12');
    });

    it('should allow 0 as a value', async () => {
        renderWithProviders(<MoneyInput precision={0} value={0} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const user = userEvent.setup();

        await user.click(input);
        await user.tab();

        expect(normalizeSpaces(input.value)).toEqual('0 $');
    });

    it('should be empty when no value', async () => {
        renderWithProviders(<MoneyInput precision={0} value={null} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;

        expect(normalizeSpaces(input.value)).toEqual('');
    });

    it('should allow to be empty', async () => {
        renderWithProviders(<MoneyInput precision={0} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const user = userEvent.setup();

        await user.clear(input);
        await user.type(input, '100');
        await user.tab();

        expect(normalizeSpaces(input.value)).toEqual('100 $');

        await user.clear(input);
        await user.tab();

        expect(normalizeSpaces(input.value)).toEqual('');
    });

    it('should not show validation message when input is empty and required onBlur', async () => {
        renderWithProviders(
            <form>
                <MoneyInput label="test" required validationErrorMessage="This field is required" />
                <button type="submit">Submit</button>
            </form>,
        );
        const user = userEvent.setup();
        const input = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        await user.click(input);
        await user.tab();

        expect(screen.queryByTestId('invalid-field')).toBeNull();

        await user.click(submitButton);
        expect(screen.getByTestId('invalid-field')).toBeInTheDocument();
    });

    it('matches snapshot (fr-CA)', () => {
        const { container } = renderWithProviders(<MoneyInput value={100} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (en-CA)', () => {
        const { container } = renderWithProviders(<MoneyInput value={100} locale="en-CA" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (en-US)', () => {
        const { container } = renderWithProviders(<MoneyInput value={100} locale="en-CA" />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
