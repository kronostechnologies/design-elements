import { act, RenderResult, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { Combobox, type ComboboxOption, type ComboboxProps } from './combobox';

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

function getListbox(): HTMLElement {
    return screen.getByRole('listbox');
}

function expectOptionToBeFocused(optionText: string): void {
    expect(document.querySelector(`#${getListbox().getAttribute('aria-activedescendant')}`))
        .toHaveTextContent(optionText);
}

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
        const options: ComboboxOption[] = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        renderWithProviders(<Combobox defaultValue="bar" options={options} />);

        expect(screen.getByTestId('textbox')).toHaveValue('Bar Label');
    });

    it('with value and options with label, renders default option label as input value', () => {
        const options: ComboboxOption[] = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        renderWithProviders(<Combobox value="foo" options={options} />);

        expect(screen.getByTestId('textbox')).toHaveValue('Foo Label');
    });

    it('with defaultValue and options without label, renders default option value as input value', () => {
        const options: ComboboxOption[] = [
            { value: 'foo' },
            { value: 'bar' },
        ];

        renderWithProviders(<Combobox defaultValue="bar" options={options} />);

        expect(screen.getByTestId('textbox')).toHaveValue('bar');
    });

    it('with value and options without label, renders default option value as input value', () => {
        const options: ComboboxOption[] = [
            { value: 'foo' },
            { value: 'bar' },
        ];

        renderWithProviders(<Combobox value="foo" options={options} />);

        expect(screen.getByTestId('textbox')).toHaveValue('foo');
    });

    it('calls onChange with option value when selecting option with label', async () => {
        const options: ComboboxOption[] = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];
        const onChange = jest.fn();
        renderWithProviders(<Combobox options={options} onChange={onChange} />);

        screen.getByTestId('textbox').focus();
        act(() => screen.getByTestId('arrow').click());
        screen.getByText('Bar Label').click();

        expect(onChange).toHaveBeenCalledWith('bar');
    });

    it('calls onChange with option value when selecting option without label', async () => {
        const options: ComboboxOption[] = [
            { value: 'foo' },
            { value: 'bar' },
        ];
        const onChange = jest.fn();
        renderWithProviders(<Combobox options={options} onChange={onChange} />);

        screen.getByTestId('textbox').focus();
        act(() => screen.getByTestId('arrow').click());
        screen.getByText('bar').click();

        expect(onChange).toHaveBeenCalledWith('bar');
    });

    it('displays option label in input when value matches option with label', () => {
        const options: ComboboxOption[] = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        renderWithProviders(<Combobox value="foo" options={options} />);

        expect(screen.getByTestId('textbox')).toHaveValue('Foo Label');
    });

    it('displays option value in input when value matches option without label', () => {
        const options: ComboboxOption[] = [
            { value: 'foo' },
            { value: 'bar' },
        ];

        renderWithProviders(<Combobox value="foo" options={options} />);

        expect(screen.getByTestId('textbox')).toHaveValue('foo');
    });

    it('displays empty input when value does not match any option', () => {
        const options: ComboboxOption[] = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];

        renderWithProviders(<Combobox value="baz" options={options} />);

        expect(screen.getByTestId('textbox')).toHaveValue('');
    });

    it('calls onChange with empty string when cleared', () => {
        const options: ComboboxOption[] = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];
        const onChange = jest.fn();
        renderWithProviders(<Combobox value="foo" options={options} onChange={onChange} />);

        screen.getByTestId('clear').click();

        expect(onChange).toHaveBeenCalledWith('');
    });

    it('does not call onChange when selecting disabled option', async () => {
        const options: ComboboxOption[] = [
            { value: 'foo', label: 'Foo Label', disabled: true },
            { value: 'bar', label: 'Bar Label' },
        ];
        const onChange = jest.fn();
        renderWithProviders(<Combobox options={options} onChange={onChange} />);

        screen.getByTestId('textbox').focus();
        act(() => screen.getByTestId('arrow').click());
        screen.getByText('Foo Label').click();

        expect(onChange).not.toHaveBeenCalledWith('foo');
    });

    it('calls onInputChange when typing in input', async () => {
        const onInputChange = jest.fn();
        renderWithProviders(<Combobox options={provinces} onInputChange={onInputChange} />);

        await userEvent.type(screen.getByTestId('textbox'), 'some option');

        expect(onInputChange).toHaveBeenCalledWith('some option');
    });

    describe('multiselect', () => {
        const options: ComboboxOption[] = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
            { value: 'baz', label: 'Baz Label' },
        ];

        const onChange = jest.fn();

        function renderCombo(props: Partial<ComboboxProps> = {}): RenderResult {
            return renderWithProviders(
                <Combobox onChange={onChange} options={options} {...props} />,
            );
        }

        it('renders with defaultValue as array', () => {
            renderCombo({ multiselect: true, defaultValue: ['foo', 'baz'] });

            expect(screen.getByTestId('listboxtag-foo')).toBeInTheDocument();
            expect(screen.getByTestId('listboxtag-baz')).toBeInTheDocument();
            expect(screen.queryByTestId('listboxtag-bar')).toBeNull();
        });

        it('renders with values overriding defaultValue as array', () => {
            renderCombo({ multiselect: true, defaultValue: ['foo', 'baz'], value: ['bar'] });

            expect(screen.getByTestId('listboxtag-bar')).toBeInTheDocument();
            expect(screen.queryByTestId('listboxtag-foo')).toBeNull();
            expect(screen.queryByTestId('listboxtag-baz')).toBeNull();
        });

        it('calls onChange with array of values when selecting multiple options (multiselect)', async () => {
            renderCombo({ multiselect: true });

            screen.getByTestId('textbox').focus();
            act(() => screen.getByTestId('arrow').click());
            screen.getByText('Foo Label').click();

            expect(onChange).toHaveBeenCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('removes tag when clicking the remove button (multiselect)', async () => {
            renderCombo({ multiselect: true, defaultValue: ['foo', 'bar'] });

            const tagRemoveButton = screen.getByTestId('Foo Label-remove-button');
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
            renderCombo({ multiselect: true, allowCustomValue: true });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'custom');
            await userEvent.keyboard('{Enter}');

            expect(onChange).toHaveBeenLastCalledWith([
                { value: 'custom', label: 'custom' },
            ]);
        });

        it('does not add a custom value as a tag when allowCustomValue is false (multiselect)', async () => {
            renderCombo({ multiselect: true, allowCustomValue: false });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'custom');
            await userEvent.keyboard('{Enter}');

            expect(onChange).not.toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ value: 'custom' }),
                ]),
            );
            expect(screen.queryByText('custom')).toBeNull();
        });

        it('does not add duplicate tags when the same option is selected multiple times (multiselect)', async () => {
            renderCombo({ multiselect: true });

            screen.getByTestId('textbox').focus();
            act(() => screen.getByTestId('arrow').click());

            screen.getByText('Foo Label').click();
            screen.getByText('Foo Label').click();

            expect(onChange).toHaveBeenLastCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('auto selects matching option when typing in input (multiselect)', async () => {
            renderCombo({ multiselect: true, autoSelectMatchingOption: true });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'Foo Label');

            expect(onChange).toHaveBeenLastCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('unselect matching option when typing in input if already selected (multiselect)', async () => {
            renderCombo({
                multiselect: true,
                defaultValue: ['foo'],
                autoSelectMatchingOption: true,
            });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'Foo Label');

            expect(onChange).toHaveBeenCalledWith([]);
        });

        it('does not auto select matching option when autoSelectMatchingOption is false (multiselect)', async () => {
            renderCombo({ multiselect: true, autoSelectMatchingOption: false });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'Foo Label');

            expect(onChange).not.toHaveBeenCalled();
        });

        it('opens listbox when pressing Enter key with closed listbox', async () => {
            renderCombo({ multiselect: true });

            const textbox = screen.getByTestId('textbox');
            textbox.focus();

            expect(screen.queryByTestId('listbox')).not.toBeInTheDocument();

            await userEvent.keyboard('{Enter}');

            expect(getListbox()).toBeInTheDocument();
        });

        it('keeps listbox open after selecting an option', async () => {
            renderCombo({ multiselect: true });

            const textbox = screen.getByTestId('textbox');
            textbox.focus();
            await userEvent.click(screen.getByTestId('arrow'));

            await userEvent.click(screen.getByText('Foo Label'));
            const listbox = getListbox();
            await userEvent.click(within(listbox).getByText('Foo Label'));

            expect(listbox).toBeInTheDocument();
        });

        it('clears input value after selecting an option', async () => {
            renderCombo({ multiselect: true });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'Foo');

            await userEvent.click(within(getListbox()).getByText('Foo Label'));

            await waitFor(() => expect(screen.getByTestId('textbox')).toHaveValue(''));
        });

        it('allows multiple sequential selections without closing listbox', async () => {
            renderCombo({ multiselect: true });

            await userEvent.click(screen.getByTestId('textbox'));

            const withinListbox = within(getListbox());
            await userEvent.click(withinListbox.getByText('Foo Label'));
            await userEvent.click(withinListbox.getByText('Bar Label'));
            await userEvent.click(withinListbox.getByText('Baz Label'));

            expect(onChange).toHaveBeenCalledTimes(3);
            expect(getListbox()).toBeInTheDocument();
        });

        it('does not show clear button in multiselect mode', async () => {
            renderCombo({ multiselect: true, defaultValue: ['foo'] });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'test');

            expect(screen.queryByTestId('clear')).not.toBeInTheDocument();
        });

        it('does not select disabled option when clicked', async () => {
            const optionsWithDisabled: ComboboxOption[] = [
                { value: 'foo', label: 'Foo Label', disabled: true },
                { value: 'bar', label: 'Bar Label' },
            ];
            renderCombo({
                multiselect: true,
                options: optionsWithDisabled,
            });

            await userEvent.click(screen.getByTestId('textbox'));
            await userEvent.click(within(getListbox()).getByText('Foo Label'));

            expect(onChange).not.toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ value: 'foo' }),
                ]),
            );
        });

        it('filters options when typing in input', async () => {
            renderCombo({ multiselect: true });

            const textbox = screen.getByTestId('textbox');
            await userEvent.click(textbox);
            await userEvent.type(textbox, 'Foo');

            const withinListbox = within(getListbox());
            expect(withinListbox.getByText('Foo Label')).toBeInTheDocument();
            expect(withinListbox.queryByText('Bar Label')).not.toBeInTheDocument();
            expect(withinListbox.queryByText('Baz Label')).not.toBeInTheDocument();
        });

        it('closes listbox when pressing Escape key', async () => {
            renderCombo({ multiselect: true });

            await userEvent.click(screen.getByRole('combobox'));
            expect(screen.getByRole('listbox')).toBeInTheDocument();

            await userEvent.keyboard('{Escape}');

            await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
        });

        it('clears input but keeps tags when pressing Escape with text', async () => {
            renderCombo({ multiselect: true, defaultValue: ['foo'] });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'some text');

            expect(textbox).toHaveValue('some text');
            expect(within(screen.getByTestId('tags')).getByTestId('listboxtag-foo')).toBeInTheDocument();

            await userEvent.keyboard('{Escape}'); // Closes listbox
            await userEvent.keyboard('{Escape}'); // Clears input

            await waitFor(() => expect(textbox).toHaveValue(''));
            expect(screen.getByTestId('listboxtag-foo')).toBeInTheDocument();
        });

        it('navigates options with ArrowDown key', async () => {
            renderCombo({ multiselect: true });

            const textbox = screen.getByTestId('textbox');
            await userEvent.click(textbox);
            await userEvent.keyboard('{ArrowDown}');

            await waitFor(() => expect(getListbox()).toBeInTheDocument());
            expectOptionToBeFocused('Foo Label');

            await userEvent.keyboard('{ArrowDown}');
            expectOptionToBeFocused('Bar Label');
        });

        it('navigates options with ArrowUp key', async () => {
            renderCombo({ multiselect: true });

            const textbox = screen.getByTestId('textbox');
            await userEvent.click(textbox);
            await userEvent.keyboard('{ArrowUp}');

            await waitFor(() => expect(getListbox()).toBeInTheDocument());
            expectOptionToBeFocused('Baz Label');

            await userEvent.keyboard('{ArrowUp}');
            expectOptionToBeFocused('Bar Label');
        });

        it('selects focused option with Enter key', async () => {
            renderCombo({ multiselect: true });

            const textbox = screen.getByTestId('textbox');
            await userEvent.click(textbox);
            await userEvent.keyboard('{ArrowDown}');
            await userEvent.keyboard('{Enter}');

            expect(onChange).toHaveBeenCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('updates tags when controlled value prop changes', () => {
            const { rerender } = renderCombo({
                multiselect: true,
                value: ['foo'],
            });

            expect(screen.getByTestId('listboxtag-foo')).toBeInTheDocument();
            expect(screen.queryByTestId('listboxtag-bar')).not.toBeInTheDocument();

            rerender(
                <Combobox
                    onChange={onChange}
                    options={options}
                    multiselect
                    value={['bar', 'baz']}
                />,
            );

            expect(screen.queryByTestId('listboxtag-foo')).not.toBeInTheDocument();
            expect(screen.getByTestId('listboxtag-bar')).toBeInTheDocument();
            expect(screen.getByTestId('listboxtag-baz')).toBeInTheDocument();
        });

        it('updates available options when options prop changes', () => {
            const { rerender } = renderCombo({ multiselect: true });

            const textbox = screen.getByTestId('textbox');
            userEvent.click(textbox);
            act(() => screen.getByTestId('arrow').click());

            expect(screen.getByText('Foo Label')).toBeInTheDocument();
            expect(screen.getByText('Bar Label')).toBeInTheDocument();

            const newOptions: ComboboxOption[] = [
                { value: 'new1', label: 'New Option 1' },
                { value: 'new2', label: 'New Option 2' },
            ];

            rerender(
                <Combobox
                    onChange={onChange}
                    options={newOptions}
                    multiselect
                />,
            );

            expect(screen.queryByText('Foo Label')).not.toBeInTheDocument();
            expect(screen.queryByText('Bar Label')).not.toBeInTheDocument();
            expect(screen.getByText('New Option 1')).toBeInTheDocument();
            expect(screen.getByText('New Option 2')).toBeInTheDocument();
        });

        it('adds custom value with allowCustomValue on Enter when no option is focused', async () => {
            renderCombo({ multiselect: true, allowCustomValue: true });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'my custom value');
            await userEvent.keyboard('{Enter}');

            expect(onChange).toHaveBeenCalledWith([
                { value: 'my custom value', label: 'my custom value' },
            ]);
        });

        it('does not add custom value when allowCustomValue is false and Enter is pressed', async () => {
            renderCombo({ multiselect: true, allowCustomValue: false });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'my custom value');
            await userEvent.keyboard('{Enter}');

            expect(onChange).not.toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ value: 'my custom value' }),
                ]),
            );
        });

        it('removes tag and updates onChange when tag remove button is clicked', async () => {
            renderCombo({ multiselect: true, defaultValue: ['foo', 'bar'] });

            expect(screen.getByTestId('listboxtag-foo')).toBeInTheDocument();
            expect(screen.getByTestId('listboxtag-bar')).toBeInTheDocument();

            const removeButton = screen.getByTestId('Bar Label-remove-button');
            await userEvent.click(removeButton);

            expect(onChange).toHaveBeenCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('deselects option when clicking on a selected option', async () => {
            renderCombo({ multiselect: true, defaultValue: ['foo', 'bar'] });
            await userEvent.click(screen.getByTestId('textbox'));

            await userEvent.click(within(getListbox()).getByText('Foo Label'));

            expect(onChange).toHaveBeenCalledWith([
                { value: 'bar', label: 'Bar Label' },
            ]);
        });
    });
});
