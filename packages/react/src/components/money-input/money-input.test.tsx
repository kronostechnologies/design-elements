import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/testing-library';
import { MoneyInput } from './money-input';

function simulateValueChange(input: HTMLInputElement, value: String): void {
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value } });
    fireEvent.blur(input);
}

function getInputElement(container: Element): HTMLInputElement {
    return container.querySelector('input') as HTMLInputElement;
}

describe('MoneyInput Component', () => {
    it('should remove formatting on focus', () => {
        const { container } = renderWithProviders(
            <MoneyInput value={12345.25} />,
        );
        const input = getInputElement(container);

        fireEvent.focus(input);

        expect(input.value).toEqual('12345.25');
    });

    it('should format on blur', () => {
        const { container } = renderWithProviders(<MoneyInput value={12345.25} />);
        const input = getInputElement(container);

        fireEvent.focus(input);
        fireEvent.blur(input);

        expect(input.value).toMatchFormattedMoney('12 345,25 $');
    });

    it('should remove fractions when precision is 0 and changing value', () => {
        const { container } = renderWithProviders(<MoneyInput precision={0} value={12345.25} />);
        const input = getInputElement(container);

        simulateValueChange(input, '12345.25');
        expect(input.value).toMatchFormattedMoney('12 345 $');
    });

    it('should use precision when changing value', () => {
        const { container } = renderWithProviders(<MoneyInput value={null} precision={2} />);
        const input = getInputElement(container);

        simulateValueChange(input, '123.457');
        expect(input.value).toMatchFormattedMoney('123,46 $');
    });

    it('should format according to locale when changing value', () => {
        const { container } = renderWithProviders(<MoneyInput locale="en-CA" />);
        const input = getInputElement(container);

        simulateValueChange(input, '12345');
        expect(input.value).toMatchFormattedMoney('$12,345.00');
    });

    it('should format provided value', () => {
        const { container } = renderWithProviders(<MoneyInput value={12345.25} />);
        const input = getInputElement(container);

        expect(input.value).toMatchFormattedMoney('12 345,25 $');
    });

    it('should format to provided currency', () => {
        const { container } = renderWithProviders(<MoneyInput value={12345.25} currency="USD" />);
        const input = getInputElement(container);

        expect(input.value).toMatchFormattedMoney('12 345,25 $');
    });

    it('should select all text on focus', () => {
        const { container } = renderWithProviders(<MoneyInput value={12345} />);
        const input = getInputElement(container);

        fireEvent.focus(input);

        expect(input.selectionStart).toEqual(0);
        expect(input.selectionEnd).toEqual(5);
    });

    it('should respect precision and locale when calling change handler', () => {
        const handleChange = jest.fn();
        const { container } = renderWithProviders(
            <MoneyInput locale="en-CA" precision={0} value={0} onChange={handleChange} />,
        );
        const input = getInputElement(container);

        simulateValueChange(input, '12.345');
        expect(handleChange).toBeCalledWith(12, '$12');
    });

    it('should allow 0 as a value', () => {
        const { container } = renderWithProviders(<MoneyInput precision={0} value={0} />);
        const input = getInputElement(container);

        fireEvent.focus(input);
        fireEvent.blur(input);

        expect(input.value).toMatchFormattedMoney('0 $');
    });

    it('should allow to be empty', () => {
        const { container } = renderWithProviders(<MoneyInput precision={0} value={0} />);
        const input = getInputElement(container);

        simulateValueChange(input, '');
        expect(input.value).toMatchFormattedMoney('');
    });

    test('should not show validation message when input is empty and required onBlur', () => {
        const { getByTestId: byTestId, queryByTestId } = renderWithProviders(
            <form>
                <MoneyInput label="test" required validationErrorMessage="This field is required" />
                <button data-testid="submit-button" type="submit">Submit</button>
            </form>,
        );

        fireEvent.blur(byTestId('text-input'), { target: { value: '' } });
        expect(queryByTestId('invalid-field')).toBeNull();

        fireEvent.click(byTestId('submit-button'));
        expect(byTestId('invalid-field')).not.toBeNull();
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
