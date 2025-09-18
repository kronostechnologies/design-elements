import { act } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Combobox } from './combobox';

const provinces = [
    { value: 'Alberta' },
    { value: 'British Columbia' },
    { value: 'Manitoba' },
    { value: 'New Brunswick' },
    { value: 'Newfoundland and Labrador' },
    { value: 'Northwest Territories' },
    { value: 'Nova Scotia' },
    { value: 'Nunavut' },
    { value: 'Ontario' },
    { value: 'Prince Edward Island' },
    { value: 'Quebec' },
    { value: 'Saskatchewan' },
    { value: 'Yukon' },
];

describe('Combobox', () => {
    test('matches the snapshot', () => {
        const { container } = renderWithProviders(
            <Combobox
                defaultOpen
                label="Select an option"
                hint="Hint"
                options={provinces}
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches the snapshot (invalid)', () => {
        const { container } = renderWithProviders(
            <Combobox
                defaultOpen
                label="Select an option"
                options={provinces}
                valid={false}
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches the snapshot (disabled)', () => {
        const { container } = renderWithProviders(
            <Combobox
                defaultOpen
                label="Select an option"
                options={provinces}
                disabled
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches the snapshot (mobile)', () => {
        const { container } = renderWithProviders(
            <Combobox
                defaultOpen
                options={provinces}
            />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('with defaultValue and options with label renders default option label as input value', () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox defaultValue="bar" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('Bar Label');
    });

    test('with value and options with label, renders default option label as input value', () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox value="foo" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('Foo Label');
    });

    test('with defaultValue and options without label, renders default option value as input value', () => {
        const options = [
            { value: 'foo' },
            { value: 'bar' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox defaultValue="bar" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('bar');
    });

    test('with value and options without label, renders default option value as input value', () => {
        const options = [
            { value: 'foo' },
            { value: 'bar' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox value="foo" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('foo');
    });

    test('calls onChange with option value when selecting option with label', async () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];
        const onChange = jest.fn();

        const { getByTestId, getByText } = renderWithProviders(
            <Combobox options={options} onChange={onChange} />,
        );
        getByTestId('textbox').focus();
        await act(() => getByTestId('arrow').click());
        getByText('Bar Label').click();

        expect(onChange).toHaveBeenCalledWith('bar');
    });

    test('calls onChange with option value when selecting option without label', async () => {
        const options = [
            { value: 'foo' },
            { value: 'bar' },
        ];
        const onChange = jest.fn();

        const { getByTestId, getByText } = renderWithProviders(
            <Combobox options={options} onChange={onChange} />,
        );
        getByTestId('textbox').focus();
        await act(() => getByTestId('arrow').click());
        getByText('bar').click();

        expect(onChange).toHaveBeenCalledWith('bar');
    });

    test('displays option label in input when value matches option with label', () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox value="foo" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('Foo Label');
    });

    test('displays option value in input when value matches option without label', () => {
        const options = [
            { value: 'foo' },
            { value: 'bar' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox value="foo" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('foo');
    });

    test('displays empty input when value does not match any option', () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox value="baz" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('');
    });

    test('calls onChange with empty string when cleared', () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        const onChange = jest.fn();
        const { getByTestId } = renderWithProviders(
            <Combobox value="foo" options={options} onChange={onChange} />,
        );
        getByTestId('clear').click();

        expect(onChange).toHaveBeenCalledWith('');
    });

    test('does not call onChange when selecting disabled option', async () => {
        const options = [
            { value: 'foo', label: 'Foo Label', disabled: true },
            { value: 'bar', label: 'Bar Label' },
        ];
        const onChange = jest.fn();

        const { getByTestId, getByText } = renderWithProviders(
            <Combobox options={options} onChange={onChange} />,
        );
        getByTestId('textbox').focus();
        await act(() => getByTestId('arrow').click());
        getByText('Foo Label').click();

        expect(onChange).not.toHaveBeenCalledWith('foo');
    });
});
