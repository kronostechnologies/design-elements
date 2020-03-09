import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import { themeProvider, ThemeWrapped } from '../../test-utils/theme-wrapped';
import { MoneyInput } from './money-input';
jest.mock('uuid/v4');

describe('CurrencyInput Component', () => {
    it('should remove formatting on focus', () => {
        const { container } = render(<MoneyInput precision={2} value={12345.25} />, { wrapper: themeProvider() });
        const input = getInputElement(container);

        fireEvent.focus(input);

        expect(input.value).toEqual('12345.25');
    });

    it('should format on blur', () => {
        const { container } = render(
            <MoneyInput precision={2} value={12345.25} />, { wrapper: themeProvider() },
        );
        const input = getInputElement(container);

        fireEvent.focus(input);
        fireEvent.blur(input);

        expect(input.value).toMatchFormattedMoney('12 345,25 $');
    });

    it('should remove fractions when precision is 0 and changing value', () => {
        const { container } = render(<MoneyInput precision={0} value={12345.25} />, { wrapper: themeProvider() });
        const input = getInputElement(container);

        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: '12345' } });
        fireEvent.blur(input);

        expect(input.value).toMatchFormattedMoney('12 345 $');
    });

    it('should use precision when changing value', () => {
        const { container } = render(<MoneyInput precision={2} value={null} />, { wrapper: themeProvider() });
        const input = getInputElement(container);

        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: '123.457' } });
        fireEvent.blur(input);

        expect(input.value).toMatchFormattedMoney('123,46 $');
    });

    it('should format according to locale when changing value', () => {
        const { container } = render(<MoneyInput precision={2} language="en" />, { wrapper: themeProvider() });
        const input = getInputElement(container);

        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: '12345' } });
        fireEvent.blur(input);

        expect(input.value).toMatchFormattedMoney('$12,345.00');
    });

    it('should format provided value', () => {
        const { container } = render(<MoneyInput precision={2} value={12345.25} />, { wrapper: themeProvider() });
        const input = getInputElement(container);

        expect(input.value).toMatchFormattedMoney('12 345,25 $');
    });

    it('should select all text on focus', () => {
        const { container } = render(<MoneyInput precision={2} value={12345} />, { wrapper: themeProvider() });
        const input = getInputElement(container);

        fireEvent.focus(input);

        expect(input.selectionStart).toEqual(0);
        expect(input.selectionEnd).toEqual(5);
    });

    it('should respect fractions when calling change handler', () => {
        const handleChange = jest.fn();
        const { container } = render(<MoneyInput language="en" precision={0} value={0} onChange={handleChange} />,
            { wrapper: themeProvider() });
        const input = getInputElement(container);

        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 12.345 } });
        fireEvent.blur(input);

        expect(input.value).toMatchFormattedMoney('$12');
        expect(handleChange).toBeCalledWith(12, '$12');
    });

    it('should allow 0 as a value', () => {
        const { container } = render(<MoneyInput precision={0} value={0} />, { wrapper: themeProvider() });
        const input = getInputElement(container);

        fireEvent.focus(input);
        fireEvent.blur(input);

        expect(input.value).toMatchFormattedMoney('0 $');
    });

    it('should allow to be empty', () => {
        const { container } = render(<MoneyInput precision={0} value={0} />, { wrapper: themeProvider() });
        const input = getInputElement(container);

        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.blur(input);

        expect(input.value).toMatchFormattedMoney('');
    });

    it('matches snapshot (fr)', () => {
        const tree = renderer.create(
            ThemeWrapped(<MoneyInput value={100} />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('matches snapshot (en)', () => {
        const tree = renderer.create(
            ThemeWrapped(<MoneyInput value={100} language="en" />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

});

function getInputElement(container: HTMLElement): HTMLInputElement {
    // tslint:disable-next-line: no-unnecessary-type-assertion
    return container.querySelector('input') as HTMLInputElement;
}
