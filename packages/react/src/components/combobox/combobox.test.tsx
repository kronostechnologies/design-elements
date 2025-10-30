import { act, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    it('matches the snapshot', () => {
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

    it('matches the snapshot (invalid)', () => {
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

    it('matches the snapshot (disabled)', () => {
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

    it('matches the snapshot (mobile)', () => {
        const { container } = renderWithProviders(
            <Combobox
                defaultOpen
                options={provinces}
            />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches the snapshot (multiselect)', () => {
        const { container } = renderWithProviders(
            <Combobox
                defaultOpen
                label="Select options"
                hint="Hint"
                options={provinces}
                multiselect
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches the snapshot (readOnly)', () => {
        const { container } = renderWithProviders(
            <Combobox
                defaultOpen
                label="Select an option"
                hint="Hint"
                options={provinces}
                readOnly
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('with defaultValue and options with label renders default option label as input value', () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox defaultValue="bar" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('Bar Label');
    });

    it('with value and options with label, renders default option label as input value', () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox value="foo" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('Foo Label');
    });

    it('with defaultValue and options without label, renders default option value as input value', () => {
        const options = [
            { value: 'foo' },
            { value: 'bar' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox defaultValue="bar" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('bar');
    });

    it('with value and options without label, renders default option value as input value', () => {
        const options = [
            { value: 'foo' },
            { value: 'bar' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox value="foo" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('foo');
    });

    it('calls onChange with option value when selecting option with label', async () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];
        const onChange = jest.fn();
        const { getByTestId, getByText } = renderWithProviders(
            <Combobox options={options} onChange={onChange} />,
        );

        getByTestId('textbox').focus();
        act(() => getByTestId('arrow').click());
        getByText('Bar Label').click();

        expect(onChange).toHaveBeenCalledWith('bar');
    });

    it('calls onChange with option value when selecting option without label', async () => {
        const options = [
            { value: 'foo' },
            { value: 'bar' },
        ];
        const onChange = jest.fn();
        const { getByTestId, getByText } = renderWithProviders(
            <Combobox options={options} onChange={onChange} />,
        );

        getByTestId('textbox').focus();
        act(() => getByTestId('arrow').click());
        getByText('bar').click();

        expect(onChange).toHaveBeenCalledWith('bar');
    });

    it('displays option label in input when value matches option with label', () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox value="foo" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('Foo Label');
    });

    it('displays option value in input when value matches option without label', () => {
        const options = [
            { value: 'foo' },
            { value: 'bar' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox value="foo" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('foo');
    });

    it('displays empty input when value does not match any option', () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        const { getByTestId } = renderWithProviders(
            <Combobox value="baz" options={options} />,
        );

        expect(getByTestId('textbox')).toHaveValue('');
    });

    it('calls onChange with empty string when cleared', () => {
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

    it('does not call onChange when selecting disabled option', async () => {
        const options = [
            { value: 'foo', label: 'Foo Label', disabled: true },
            { value: 'bar', label: 'Bar Label' },
        ];
        const onChange = jest.fn();
        const { getByTestId, getByText } = renderWithProviders(
            <Combobox options={options} onChange={onChange} />,
        );

        getByTestId('textbox').focus();
        act(() => getByTestId('arrow').click());
        getByText('Foo Label').click();

        expect(onChange).not.toHaveBeenCalledWith('foo');
    });

    it('calls onInputChange when typing in input', async () => {
        const onInputChange = jest.fn();
        const { getByTestId } = renderWithProviders(
            <Combobox options={provinces} onInputChange={onInputChange} />,
        );

        await userEvent.type(getByTestId('textbox'), 'some option');

        expect(onInputChange).toHaveBeenCalledWith('some option');
    });

    describe('multiselect', () => {
        const options = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
            { value: 'baz', label: 'Baz Label' },
        ];

        const onChange = jest.fn();

        function renderCombo(props = {}): RenderResult {
            return renderWithProviders(
                <Combobox onChange={onChange} options={options} {...props} />,
            );
        }

        it('renders with defaultValue as array', () => {
            const { getByTestId } = renderCombo({ multiselect: true, defaultValue: ['foo', 'baz'] });

            expect(getByTestId('listboxtag-foo')).toBeInTheDocument();
            expect(getByTestId('listboxtag-baz')).toBeInTheDocument();
            expect(screen.queryByTestId('listboxtag-bar')).toBeNull();
        });

        it('renders with values overriding defaultValue as array', () => {
            const { getByTestId } = renderCombo({ multiselect: true, defaultValue: ['foo', 'baz'], value: ['bar'] });

            expect(getByTestId('listboxtag-bar')).toBeInTheDocument();
            expect(screen.queryByTestId('listboxtag-foo')).toBeNull();
            expect(screen.queryByTestId('listboxtag-baz')).toBeNull();
        });

        it('calls onChange with array of values when selecting multiple options (multiselect)', async () => {
            const { getByTestId, getByText } = renderCombo({ multiselect: true });

            getByTestId('textbox').focus();
            act(() => getByTestId('arrow').click());
            getByText('Foo Label').click();

            expect(onChange).toHaveBeenCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('removes tag when clicking the remove button (multiselect)', async () => {
            const { getByTestId } = renderCombo({ multiselect: true, defaultValue: ['foo', 'bar'] });

            const tagRemoveButton = getByTestId('Foo Label-remove-button');
            await userEvent.click(tagRemoveButton);

            expect(onChange).toHaveBeenLastCalledWith([
                { value: 'bar', label: 'Bar Label' },
            ]);
        });

        it('does not remove tag when clicking the remove button when readOnly (multiselect)', async () => {
            renderCombo({ multiselect: true, defaultValue: ['foo', 'bar'], readOnly: true });

            expect(screen.queryByTestId('Foo Label-remove-button')).toBeNull();
            expect(screen.queryByTestId('Bar Label-remove-button')).toBeNull();
        });

        it('adds a custom value as a tag when allowCustomValue is true (multiselect)', async () => {
            const { getByTestId } = renderCombo({ multiselect: true, allowCustomValue: true });

            const textbox = getByTestId('textbox');
            await userEvent.type(textbox, 'custom');
            await userEvent.keyboard('{Enter}');

            expect(onChange).toHaveBeenLastCalledWith([
                { value: 'custom', label: 'custom' },
            ]);
        });

        it('does not add a custom value as a tag when allowCustomValue is false (multiselect)', async () => {
            const { getByTestId, queryByText } = renderCombo({ multiselect: true, allowCustomValue: false });

            const textbox = getByTestId('textbox');
            await userEvent.type(textbox, 'custom');
            await userEvent.keyboard('{Enter}');

            expect(onChange).not.toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ value: 'custom' }),
                ]),
            );
            expect(queryByText('custom')).toBeNull();
        });

        it('does not add duplicate tags when the same option is selected multiple times (multiselect)', async () => {
            const { getByTestId, getByText } = renderCombo({ multiselect: true });

            getByTestId('textbox').focus();
            act(() => getByTestId('arrow').click());

            getByText('Foo Label').click();
            getByText('Foo Label').click();

            expect(onChange).toHaveBeenLastCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('auto selects matching option when typing in input (multiselect)', async () => {
            const { getByTestId } = renderCombo({ multiselect: true, autoSelectMatchingOption: true });

            const textbox = getByTestId('textbox');
            await userEvent.type(textbox, 'Foo Label');

            expect(onChange).toHaveBeenLastCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('does not auto select matching option when typing in input if already selected (multiselect)', async () => {
            const { getByTestId } = renderCombo({
                multiselect: true,
                defaultValue: ['foo'],
                autoSelectMatchingOption: true,
            });

            const textbox = getByTestId('textbox');
            await userEvent.type(textbox, 'Foo Label');

            expect(onChange).not.toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ value: 'foo' }),
                ]),
            );
        });

        it('does not auto select matching option when autoSelectMatchingOption is false (multiselect)', async () => {
            const { getByTestId } = renderCombo({ multiselect: true, autoSelectMatchingOption: false });

            const textbox = getByTestId('textbox');
            await userEvent.type(textbox, 'Foo Label');

            expect(onChange).not.toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ value: 'foo' }),
                ]),
            );
        });
    });
});
