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

function focusInTextbox(): void {
    screen.getByTestId('textbox').focus();
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

        await userEvent.click(screen.getByTestId('arrow'));
        await userEvent.click(screen.getByText('Bar Label'));

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
        await userEvent.click(screen.getByTestId('arrow'));
        await userEvent.click(screen.getByText('bar'));

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

    it('calls onChange with empty string when cleared', async () => {
        const options: ComboboxOption[] = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
        ];
        const onChange = jest.fn();
        renderWithProviders(<Combobox value="foo" options={options} onChange={onChange} />);

        await userEvent.click(screen.getByTestId('clear'));

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
        await userEvent.click(screen.getByTestId('arrow'));
        await userEvent.click(screen.getByText('Foo Label'));

        expect(onChange).not.toHaveBeenCalledWith('foo');
    });

    it('calls onInputChange when typing in input', async () => {
        const onInputChange = jest.fn();
        renderWithProviders(<Combobox options={provinces} onInputChange={onInputChange} />);

        await userEvent.type(screen.getByTestId('textbox'), 'some option');

        expect(onInputChange).toHaveBeenCalledWith('some option');
    });

    describe('opening and closing the listbox', () => {
        it('is closed by default', () => {
            renderWithProviders(<Combobox options={provinces} />);

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('is open when defaultOpen is true', () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen />);

            expect(getListbox()).toBeInTheDocument();
        });

        it('opens when clicking the arrow button', async () => {
            renderWithProviders(<Combobox options={provinces} />);

            await userEvent.click(screen.getByTestId('arrow'));

            expect(getListbox()).toBeInTheDocument();
        });

        it('closes when clicking the arrow button', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen />);

            await userEvent.click(screen.getByTestId('arrow'));

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('opens when clicking the textbox', async () => {
            renderWithProviders(<Combobox options={provinces} />);

            await userEvent.click(screen.getByTestId('textbox'));

            expect(getListbox()).toBeInTheDocument();
        });

        it('closes when clicking the textbox', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen />);
            expect(getListbox()).toBeInTheDocument();

            await userEvent.click(screen.getByTestId('textbox'));

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('closes when clicking outside', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen />);
            focusInTextbox();
            expect(getListbox()).toBeInTheDocument();

            await userEvent.click(document.body);

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('doesn\'t open when disabled', async () => {
            renderWithProviders(<Combobox options={provinces} disabled />);

            await expect(userEvent.click(screen.getByTestId('arrow'))).toReject();
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });
    });

    describe('default value', () => {
        it('setting the prop assigns this value to the input', () => {
            renderWithProviders(<Combobox options={provinces} defaultValue="Quebec" />);

            expect(screen.getByTestId('textbox')).toHaveValue('Quebec');
        });

        it('the corresponding option is selected and focused when expanding the listbox', async () => {
            renderWithProviders(<Combobox options={provinces} defaultValue="Quebec" />);

            await userEvent.click(screen.getByTestId('arrow'));

            const option = screen.getByRole('option', { name: 'Quebec' });
            expect(option).toHaveAttribute('aria-selected', 'true');
            expectOptionToBeFocused('Quebec');
        });

        it('setting the prop to an arbitrary value rejects the input', () => {
            renderWithProviders(<Combobox options={provinces} defaultValue="Nowhere" />);

            expect(screen.getByTestId('textbox')).toHaveValue('');
        });

        describe('when allowing a custom value', () => {
            it('setting the prop to an arbitrary value assigns this value to the input', () => {
                renderWithProviders(<Combobox options={provinces} allowCustomValue defaultValue="Nowhere" />);

                expect(screen.getByTestId('textbox')).toHaveValue('Nowhere');
            });
        });
    });

    describe('option selection', () => {
        it('clicking an option selects it and updates the input value', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen />);

            await userEvent.click(screen.getByText('Quebec'));

            expect(screen.getByTestId('textbox')).toHaveValue('Quebec');
        });

        it('the selected value is still focused when expanding the listbox', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen />);
            await userEvent.click(screen.getByText('Quebec'));
            await userEvent.click(screen.getByTestId('textbox'));

            const option = screen.getByRole('option', { name: 'Quebec' });
            expect(option).toHaveAttribute('aria-selected', 'true');
            expectOptionToBeFocused('Quebec');
        });

        it('the focused option is selected when clicking outside', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen />);

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, '{ArrowDown}{ArrowDown}');
            await userEvent.click(document.body);

            expect(textbox).toHaveValue('British Columbia');
        });

        it('clearing the input removes the value from textbox', async () => {
            renderWithProviders(<Combobox options={provinces} defaultValue="Quebec" />);

            await userEvent.click(screen.getByTestId('clear'));

            expect(screen.getByTestId('textbox')).toHaveValue('');
        });

        it('clearing the input deselects the corresponding option', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);
            await userEvent.click(screen.getByTestId('clear'));

            const option = screen.getByRole('option', { name: 'Quebec' });
            expect(option).toHaveAttribute('aria-selected', 'false');
        });

        it('does not select the corresponding option when typing an exact match', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen />);
            await userEvent.type(screen.getByTestId('textbox'), 'quebec');

            const option = screen.getByRole('option', { name: 'Quebec' });
            expect(option).toHaveAttribute('aria-selected', 'false');
        });

        it('selects the corresponding option when typing an exact match with autoSelectMatchingOption', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen autoSelectMatchingOption />);
            await userEvent.type(screen.getByTestId('textbox'), 'quebec');

            const option = screen.getByRole('option', { name: 'Quebec' });
            expect(option).toHaveAttribute('aria-selected', 'true');
        });
    });

    describe('list filtering', () => {
        it('typing a valid letter opens the listbox', async () => {
            renderWithProviders(<Combobox options={provinces} />);

            await userEvent.type(screen.getByTestId('textbox'), 'q');

            expect(getListbox()).toBeInTheDocument();
        });

        it('typing an invalid letter opens the listbox with the no option placeholder', async () => {
            renderWithProviders(<Combobox options={provinces} />);
            await userEvent.type(screen.getByTestId('textbox'), 'z');

            const listbox = getListbox();
            expect(listbox).toBeInTheDocument();
            const options = within(listbox).getAllByRole('option');
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveAttribute('aria-disabled', 'true');
            expect(options[0]).toHaveTextContent('No result for "z"');
        });

        it('typing a letter filters the list', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen />);

            await userEvent.type(screen.getByTestId('textbox'), 'q');

            const listbox = getListbox();
            const options = within(listbox).getAllByRole('option');
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveTextContent('Quebec');
        });

        it('erasing characters updates the list to match the remaining input', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen defaultValue="New B" />);
            const textbox = screen.getByTestId('textbox');

            await userEvent.clear(textbox);
            await userEvent.type(textbox, 'New');

            const listbox = getListbox();
            const options = within(listbox).getAllByRole('option');
            expect(options).toHaveLength(2);
            expect(options[0]).toHaveTextContent('New Brunswick');
            expect(options[1]).toHaveTextContent('Newfoundland and Labrador');
        });

        it('when a value is selected the list contains all options on open', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);

            const listbox = getListbox();
            const options = within(listbox).getAllByRole('option');
            expect(options).toHaveLength(provinces.length);
        });

        describe('disabled filtering', () => {
            it('typing a letter does not filter the list', async () => {
                renderWithProviders(<Combobox options={provinces} disableListFiltering defaultOpen />);
                await userEvent.type(screen.getByTestId('textbox'), 'q');

                const listbox = getListbox();
                const options = within(listbox).getAllByRole('option');
                expect(options).toHaveLength(provinces.length);
            });
        });
    });

    describe('empty options list', () => {
        it('the listbox contains the empty message', () => {
            const emptyListMessage = 'The list is empty';
            renderWithProviders(<Combobox options={[]} emptyListMessage={emptyListMessage} defaultOpen />);

            const listbox = getListbox();
            const options = within(listbox).getAllByRole('option');
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveTextContent(emptyListMessage);
            expect(options[0]).toHaveAttribute('aria-disabled', 'true');
        });

        it('the empty message is not removed if custom values are not allowed', async () => {
            const emptyListMessage = 'The list is empty';
            renderWithProviders(<Combobox options={[]} emptyListMessage={emptyListMessage} defaultOpen />);

            await userEvent.type(screen.getByTestId('textbox'), 'q');

            const listbox = getListbox();
            const options = within(listbox).getAllByRole('option');
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveTextContent(emptyListMessage);
        });

        it('the empty message is removed if custom values are allowed', async () => {
            const emptyListMessage = 'The list is empty';
            renderWithProviders(
                <Combobox options={[]} emptyListMessage={emptyListMessage} defaultOpen allowCustomValue />,
            );

            await userEvent.type(screen.getByTestId('textbox'), 'q');

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });
    });

    describe('loading state', () => {
        it('when active the listbox only contains the loading message', () => {
            renderWithProviders(<Combobox options={provinces} isLoading defaultOpen />);

            const listbox = getListbox();
            const options = within(listbox).getAllByRole('option');
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveTextContent('Loading...');
            expect(options[0]).toHaveAttribute('aria-disabled', 'true');
        });
    });

    describe('value handling', () => {
        it('clicking outside reverts to previous valid value', async () => {
            renderWithProviders(<Combobox options={provinces} defaultValue="Quebec" />);
            focusInTextbox();

            await userEvent.keyboard('z');
            await userEvent.click(document.body);

            await waitFor(() => expect(screen.getByTestId('textbox')).toHaveValue('Quebec'));
        });

        it('arbitrary value is kept when allowing custom values', async () => {
            renderWithProviders(<Combobox options={provinces} defaultValue="Quebec" allowCustomValue />);
            const textbox = screen.getByTestId('textbox');

            await userEvent.clear(textbox);
            await userEvent.type(textbox, 'z');
            await userEvent.click(document.body);

            expect(textbox).toHaveValue('z');
        });
    });

    describe('inline autocomplete', () => {
        it('typing a valid letter opens the listbox', async () => {
            renderWithProviders(<Combobox options={provinces} inlineAutoComplete />);

            await userEvent.type(screen.getByTestId('textbox'), 'q');

            expect(getListbox()).toBeInTheDocument();
        });

        it('typing the first letter of an existing option autocompletes the input', async () => {
            renderWithProviders(<Combobox options={provinces} inlineAutoComplete />);

            await userEvent.type(screen.getByTestId('textbox'), 'q');

            expect(screen.getByTestId('textbox')).toHaveValue('Quebec');
        });

        it('the suggested part of the input is highlighted', async () => {
            renderWithProviders(<Combobox options={provinces} inlineAutoComplete />);
            const textbox = screen.getByTestId('textbox') as HTMLInputElement;
            await userEvent.type(textbox, 'q');

            expect(textbox.selectionStart).toBe(1);
            expect(textbox.selectionEnd).toBe(6);
        });

        it('erasing characters removes the suggestion', async () => {
            renderWithProviders(<Combobox options={provinces} inlineAutoComplete defaultValue="Que" />);
            const textbox = screen.getByTestId('textbox') as HTMLInputElement;

            await userEvent.clear(textbox);
            await userEvent.type(textbox, 'Qu');
            await userEvent.keyboard('{backspace}');

            expect(textbox).toHaveValue('Qu');
            expect(textbox.selectionStart).toBe(2);
            expect(textbox.selectionEnd).toBe(2);
        });

        it('focusing an option with ArrowUp fills the input with its value', async () => {
            renderWithProviders(<Combobox options={provinces} inlineAutoComplete />);
            const textbox = screen.getByTestId('textbox');
            await userEvent.click(textbox);
            await waitFor(() => expect(getListbox()).toBeInTheDocument());

            await userEvent.keyboard('{ArrowUp}');

            await waitFor(() => expect(textbox).toHaveValue('Yukon'));
        });

        it('focusing an option with ArrowDown fills the input with its value', async () => {
            renderWithProviders(<Combobox options={provinces} inlineAutoComplete />);
            const textbox = screen.getByTestId('textbox');
            await userEvent.click(textbox);
            await waitFor(() => expect(getListbox()).toBeInTheDocument());

            await userEvent.keyboard('{ArrowDown}');

            expect(screen.getByTestId('textbox')).toHaveValue('Alberta');
        });
    });

    describe('component is controlled', () => {
        it('the input value is set according to the value prop', () => {
            renderWithProviders(<Combobox options={provinces} value="Quebec" />);

            expect(screen.getByTestId('textbox')).toHaveValue('Quebec');
        });

        it('the input value is updated when the value prop changes', () => {
            const { rerender } = renderWithProviders(<Combobox options={provinces} value="Quebec" />);

            rerender(<Combobox options={provinces} value="Nova Scotia" />);

            expect(screen.getByTestId('textbox')).toHaveValue('Nova Scotia');
        });

        it('the input value is updated when the value prop changes to an arbitrary value', () => {
            const { rerender } = renderWithProviders(<Combobox options={provinces} allowCustomValue value="Quebec" />);

            rerender(<Combobox options={provinces} allowCustomValue value="Nowhere" />);

            expect(screen.getByTestId('textbox')).toHaveValue('Nowhere');
        });

        it('the input value is set according to the value prop using an empty value', () => {
            const options = provinces.concat([{ value: '' }]);

            renderWithProviders(<Combobox options={options} defaultValue="Quebec" value="" />);

            expect(screen.getByTestId('textbox')).toHaveValue('');
        });
    });

    describe('onChange callback', () => {
        it('callback is not fired when setting default value', () => {
            const callback = jest.fn();

            renderWithProviders(<Combobox options={provinces} onChange={callback} defaultValue="Quebec" />);

            expect(callback).not.toHaveBeenCalled();
        });

        it('callback is not fired when the value prop is changed', () => {
            const callback = jest.fn();
            const { rerender } = renderWithProviders(
                <Combobox options={provinces} onChange={callback} value="Quebec" />,
            );

            rerender(<Combobox options={provinces} onChange={callback} value="Nova Scotia" />);

            expect(callback).not.toHaveBeenCalled();
        });

        it('callback is not fired when the option is already selected', async () => {
            const callback = jest.fn();
            renderWithProviders(<Combobox options={provinces} onChange={callback} defaultValue="Quebec" defaultOpen />);

            await userEvent.click(screen.getByText('Quebec'));

            expect(callback).not.toHaveBeenCalled();
        });

        it(
            'callback should not be fired when characters are typed in the input and does not match an option',
            async () => {
                const onChange = jest.fn();
                const onInputChange = jest.fn();
                renderWithProviders(
                    <Combobox options={provinces} onChange={onChange} onInputChange={onInputChange} />,
                );

                await userEvent.type(screen.getByTestId('textbox'), 'q');

                expect(onChange).not.toHaveBeenCalled();
                expect(onInputChange).toHaveBeenCalledWith('q');
            },
        );

        it('callback does not receive the suggestion when fired', async () => {
            const onChange = jest.fn();
            const onInputChange = jest.fn();
            renderWithProviders(
                <Combobox
                    options={provinces}
                    inlineAutoComplete
                    onChange={onChange}
                    onInputChange={onInputChange}
                />,
            );

            await userEvent.type(screen.getByTestId('textbox'), 'q');

            expect(onChange).not.toHaveBeenCalled();
            expect(onInputChange).toHaveBeenCalledWith('q');
        });
    });

    describe('keyboard navigation', () => {
        ['ArrowUp', 'ArrowDown'].forEach((key) => {
            it(`${key} opens the listbox`, async () => {
                renderWithProviders(<Combobox options={provinces} />);

                await userEvent.type(screen.getByTestId('textbox'), `{${key}}`);

                expect(getListbox()).toBeInTheDocument();
            });
        });

        it('ArrowDown focuses the first option when it opens the listbox', async () => {
            renderWithProviders(<Combobox options={provinces} />);

            await userEvent.type(screen.getByTestId('textbox'), '{ArrowDown}');

            expectOptionToBeFocused('Alberta');
        });

        it('ArrowUp focuses the last option when it opens the listbox', async () => {
            renderWithProviders(<Combobox options={provinces} />);

            await userEvent.type(screen.getByTestId('textbox'), '{ArrowUp}');

            expectOptionToBeFocused('Yukon');
        });

        it('ArrowUp focuses the previous option', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);
            screen.getByTestId('textbox').focus();

            await userEvent.keyboard('{ArrowUp}');

            expectOptionToBeFocused('Prince Edward Island');
        });

        it('ArrowDown focuses the next option', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);
            focusInTextbox();

            await userEvent.keyboard('{ArrowDown}');

            expectOptionToBeFocused('Saskatchewan');
        });

        it('Escape closes the listbox', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen />);
            focusInTextbox();
            expect(getListbox()).toBeInTheDocument();

            await userEvent.keyboard('{Escape}');

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('Escape does not clear the value when the listbox is open', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);
            focusInTextbox();
            expect(getListbox()).toBeInTheDocument();

            await userEvent.keyboard('{Escape}');

            expect(screen.getByTestId('textbox')).toHaveValue('Quebec');
        });

        it('Escape clears the textbox when the listbox is closed', async () => {
            renderWithProviders(<Combobox options={provinces} defaultValue="Test" />);

            await userEvent.type(screen.getByTestId('textbox'), '{Escape}');

            expect(screen.getByTestId('textbox')).toHaveValue('');
        });

        it('Enter selects the focused option', async () => {
            renderWithProviders(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);
            focusInTextbox();

            await userEvent.keyboard('{ArrowDown}{Enter}');

            expect(screen.getByTestId('textbox')).toHaveValue('Saskatchewan');
        });

        it('Enter closes the listbox if custom values are allowed', async () => {
            renderWithProviders(<Combobox options={provinces} allowCustomValue defaultOpen defaultValue="New" />);

            await userEvent.type(screen.getByTestId('textbox'), '{Enter}');

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });
    });

    it('input should have controllable data-test-id', () => {
        renderWithProviders(<Combobox data-testid="a-controlled-id" options={provinces} defaultValue="Quebec" />);

        expect(screen.getByTestId('a-controlled-id')).toHaveValue('Quebec');
    });

    describe('multiselect', () => {
        const options: ComboboxOption[] = [
            { value: 'foo', label: 'Foo Label' },
            { value: 'bar', label: 'Bar Label' },
            { value: 'baz', label: 'Baz Label' },
        ];

        const onChange = jest.fn();

        function renderMultiselectCombobox(props: Partial<ComboboxProps> = {}): RenderResult {
            return renderWithProviders(
                <Combobox multiselect onChange={onChange} options={options} {...props} />,
            );
        }

        it('renders with defaultValue as array', () => {
            renderMultiselectCombobox({ defaultValue: ['foo', 'baz'] });

            expect(screen.getByTestId('listboxtag-foo')).toBeInTheDocument();
            expect(screen.getByTestId('listboxtag-baz')).toBeInTheDocument();
            expect(screen.queryByTestId('listboxtag-bar')).toBeNull();
        });

        it('renders with values overriding defaultValue as array', () => {
            renderMultiselectCombobox({ defaultValue: ['foo', 'baz'], value: ['bar'] });

            expect(screen.getByTestId('listboxtag-bar')).toBeInTheDocument();
            expect(screen.queryByTestId('listboxtag-foo')).toBeNull();
            expect(screen.queryByTestId('listboxtag-baz')).toBeNull();
        });

        it('calls onChange with array of values when selecting multiple options (multiselect)', async () => {
            renderMultiselectCombobox({ });

            screen.getByTestId('textbox').focus();
            await userEvent.click(screen.getByTestId('arrow'));
            await userEvent.click(screen.getByText('Foo Label'));

            expect(onChange).toHaveBeenCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('removes tag when clicking the remove button (multiselect)', async () => {
            renderMultiselectCombobox({ defaultValue: ['foo', 'bar'] });

            const tagRemoveButton = screen.getByTestId('Foo Label-remove-button');
            await userEvent.click(tagRemoveButton);

            expect(onChange).toHaveBeenLastCalledWith([
                { value: 'bar', label: 'Bar Label' },
            ]);
        });

        it('does not remove tag when clicking the remove button when readOnly (multiselect)', async () => {
            renderMultiselectCombobox({ defaultValue: ['foo', 'bar'], readOnly: true });

            expect(screen.queryByTestId('Foo Label-remove-button')).toBeNull();
            expect(screen.queryByTestId('Bar Label-remove-button')).toBeNull();
        });

        it('adds a custom value as a tag when allowCustomValue is true (multiselect)', async () => {
            renderMultiselectCombobox({ allowCustomValue: true });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'custom');
            await userEvent.keyboard('{Enter}');

            expect(onChange).toHaveBeenLastCalledWith([
                { value: 'custom', label: 'custom' },
            ]);
        });

        it('does not add a custom value as a tag when allowCustomValue is false (multiselect)', async () => {
            renderMultiselectCombobox({ allowCustomValue: false });

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
            renderMultiselectCombobox({ });

            screen.getByTestId('textbox').focus();
            await userEvent.click(screen.getByTestId('arrow'));

            const fooLabel = screen.getByText('Foo Label');
            await userEvent.click(fooLabel);
            await userEvent.click(fooLabel);

            expect(onChange.mock.calls).toEqual([
                [[{ value: 'foo', label: 'Foo Label' }]],
                [[]],
            ]);
        });

        it('auto selects matching option when typing in input (multiselect)', async () => {
            renderMultiselectCombobox({ autoSelectMatchingOption: true });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'Foo Label');

            expect(onChange).toHaveBeenLastCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('unselect matching option when typing in input if already selected (multiselect)', async () => {
            renderMultiselectCombobox({
                defaultValue: ['foo'],
                autoSelectMatchingOption: true,
            });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'Foo Label');

            expect(onChange).toHaveBeenCalledWith([]);
        });

        it('does not auto select matching option when autoSelectMatchingOption is false (multiselect)', async () => {
            renderMultiselectCombobox({ autoSelectMatchingOption: false });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'Foo Label');

            expect(onChange).not.toHaveBeenCalled();
        });

        it('opens listbox when pressing Enter key with closed listbox', async () => {
            renderMultiselectCombobox({ });

            const textbox = screen.getByTestId('textbox');
            textbox.focus();

            expect(screen.queryByTestId('listbox')).not.toBeInTheDocument();

            await userEvent.keyboard('{Enter}');

            expect(getListbox()).toBeInTheDocument();
        });

        it('keeps listbox open after selecting an option', async () => {
            renderMultiselectCombobox({ });

            const textbox = screen.getByTestId('textbox');
            textbox.focus();
            await userEvent.click(screen.getByTestId('arrow'));

            await userEvent.click(screen.getByText('Foo Label'));
            const listbox = getListbox();
            await userEvent.click(within(listbox).getByText('Foo Label'));

            expect(listbox).toBeInTheDocument();
        });

        it('clears input value after selecting an option', async () => {
            renderMultiselectCombobox({ });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'Foo');

            await userEvent.click(within(getListbox()).getByText('Foo Label'));

            await waitFor(() => expect(screen.getByTestId('textbox')).toHaveValue(''));
        });

        it('allows multiple sequential selections without closing listbox', async () => {
            renderMultiselectCombobox({ });

            await userEvent.click(screen.getByTestId('textbox'));

            const withinListbox = within(getListbox());
            await userEvent.click(withinListbox.getByText('Foo Label'));
            await userEvent.click(withinListbox.getByText('Bar Label'));
            await userEvent.click(withinListbox.getByText('Baz Label'));

            expect(onChange).toHaveBeenCalledTimes(3);
            expect(getListbox()).toBeInTheDocument();
        });

        it('does not show clear button in multiselect mode', async () => {
            renderMultiselectCombobox({ defaultValue: ['foo'] });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'test');

            expect(screen.queryByTestId('clear')).not.toBeInTheDocument();
        });

        it('does not select disabled option when clicked', async () => {
            const optionsWithDisabled: ComboboxOption[] = [
                { value: 'foo', label: 'Foo Label', disabled: true },
                { value: 'bar', label: 'Bar Label' },
            ];
            renderMultiselectCombobox({
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
            renderMultiselectCombobox({ });

            const textbox = screen.getByTestId('textbox');
            await userEvent.click(textbox);
            await userEvent.type(textbox, 'Foo');

            const withinListbox = within(getListbox());
            expect(withinListbox.getByText('Foo Label')).toBeInTheDocument();
            expect(withinListbox.queryByText('Bar Label')).not.toBeInTheDocument();
            expect(withinListbox.queryByText('Baz Label')).not.toBeInTheDocument();
        });

        it('closes listbox when pressing Escape key', async () => {
            renderMultiselectCombobox({ });

            await userEvent.click(screen.getByRole('combobox'));
            expect(getListbox()).toBeInTheDocument();

            await userEvent.keyboard('{Escape}');

            await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
        });

        it('clears input but keeps tags when pressing Escape with text', async () => {
            renderMultiselectCombobox({ defaultValue: ['foo'] });

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
            renderMultiselectCombobox({ });

            const textbox = screen.getByTestId('textbox');
            await userEvent.click(textbox);
            await userEvent.keyboard('{ArrowDown}');

            await waitFor(() => expect(getListbox()).toBeInTheDocument());
            expectOptionToBeFocused('Foo Label');

            await userEvent.keyboard('{ArrowDown}');
            expectOptionToBeFocused('Bar Label');
        });

        it('navigates options with ArrowUp key', async () => {
            renderMultiselectCombobox({ });

            const textbox = screen.getByTestId('textbox');
            await userEvent.click(textbox);
            await userEvent.keyboard('{ArrowUp}');

            await waitFor(() => expect(getListbox()).toBeInTheDocument());
            expectOptionToBeFocused('Baz Label');

            await userEvent.keyboard('{ArrowUp}');
            expectOptionToBeFocused('Bar Label');
        });

        it('selects focused option with Enter key', async () => {
            renderMultiselectCombobox({ });

            const textbox = screen.getByTestId('textbox');
            await userEvent.click(textbox);
            await userEvent.keyboard('{ArrowDown}');
            await userEvent.keyboard('{Enter}');

            expect(onChange).toHaveBeenCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('updates tags when controlled value prop changes', () => {
            const { rerender } = renderMultiselectCombobox({
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
            const { rerender } = renderMultiselectCombobox({ });

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
            renderMultiselectCombobox({ allowCustomValue: true });

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'my custom value');
            await userEvent.keyboard('{Enter}');

            expect(onChange).toHaveBeenCalledWith([
                { value: 'my custom value', label: 'my custom value' },
            ]);
        });

        it('does not add custom value when allowCustomValue is false and Enter is pressed', async () => {
            renderMultiselectCombobox({ allowCustomValue: false });

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
            renderMultiselectCombobox({ defaultValue: ['foo', 'bar'] });

            expect(screen.getByTestId('listboxtag-foo')).toBeInTheDocument();
            expect(screen.getByTestId('listboxtag-bar')).toBeInTheDocument();

            const removeButton = screen.getByTestId('Bar Label-remove-button');
            await userEvent.click(removeButton);

            expect(onChange).toHaveBeenCalledWith([
                { value: 'foo', label: 'Foo Label' },
            ]);
        });

        it('deselects option when clicking on a selected option', async () => {
            renderMultiselectCombobox({ defaultValue: ['foo', 'bar'] });
            await userEvent.click(screen.getByTestId('textbox'));

            await userEvent.click(within(getListbox()).getByText('Foo Label'));

            expect(onChange).toHaveBeenCalledWith([
                { value: 'bar', label: 'Bar Label' },
            ]);
        });

        it('does not trigger onChange when closing the listbox', async () => {
            renderMultiselectCombobox({ defaultValue: ['foo', 'bar'] });
            await userEvent.click(screen.getByTestId('textbox'));

            await userEvent.click(document.body);

            expect(onChange).not.toHaveBeenCalled();
        });

        it('does not trigger onChange when typing into the input', async () => {
            renderMultiselectCombobox({ defaultValue: ['foo', 'bar'] });
            await userEvent.click(screen.getByTestId('textbox'));

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'a');
            await userEvent.type(textbox, 'b');

            expect(onChange).not.toHaveBeenCalled();
        });

        it('does not trigger onChange when closing the listbox with allowCustomValue', async () => {
            renderMultiselectCombobox({ defaultValue: ['foo', 'bar'], allowCustomValue: true });
            await userEvent.click(screen.getByTestId('textbox'));

            await userEvent.click(document.body);

            expect(onChange).not.toHaveBeenCalled();
        });

        it('does not trigger onChange when typing into the input with allowCustomValue', async () => {
            renderMultiselectCombobox({ defaultValue: ['foo', 'bar'], allowCustomValue: true });
            await userEvent.click(screen.getByTestId('textbox'));

            const textbox = screen.getByTestId('textbox');
            await userEvent.type(textbox, 'a');
            await userEvent.type(textbox, 'b');

            expect(onChange).not.toHaveBeenCalled();
        });
    });
});
