import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { type Overflow } from '../../hooks/use-overflow';
import { renderWithProviders } from '../../test-utils/renderer';
import { DropdownList } from './dropdown-list';

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (children: ReactNode, _: Element | DocumentFragment) => (
        <div data-testid="mock-portal">{children}</div>
    ),
}));

jest.mock('../toast/toast-provider', () => ({
    ToastProvider: ({ children }: { children: ReactNode }) => children,
}));

jest.mock('../../hooks/use-overflow', () => ({
    useOverflow: (): Overflow => ({
        horizontal: false,
        vertical: false,
    }),
}));

const provinces = [
    { value: 'ab', label: 'Alberta' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'mb', label: 'Manitoba' },
    { value: 'nb', label: 'New Brunswick' },
    { value: 'nl', label: 'Newfoundland and Labrador' },
    { value: 'nt', label: 'Northwest Territories' },
    { value: 'ns', label: 'Nova Scotia' },
    { value: 'nu', label: 'Nunavut' },
    { value: 'on', label: 'Ontario' },
    { value: 'pe', label: 'Prince Edward Island' },
    { value: 'qc', label: 'Quebec' },
    { value: 'sk', label: 'Saskatchewan' },
    { value: 'yt', label: 'Yukon' },
];

describe('Dropdown list', () => {
    async function clickDropdownListOption(id: string): Promise<void> {
        const user = userEvent.setup();
        const option = screen.getByTestId(id);
        await user.click(option);
    }

    describe('opening and closing the listbox', () => {
        it('is closed by default', () => {
            renderWithProviders(<DropdownList options={provinces} />);

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('is open when defaultOpen is true', () => {
            renderWithProviders(<DropdownList options={provinces} defaultOpen />);

            expect(screen.getByRole('listbox')).toBeInTheDocument();
        });

        it('opens when clicking the textbox', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} />);

            await user.click(screen.getByTestId('textbox'));

            expect(screen.getByRole('listbox')).toBeInTheDocument();
        });

        it('closes when clicking the textbox', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} defaultOpen />);

            await user.click(screen.getByTestId('textbox'));

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('closes when clicking outside', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} defaultOpen />);

            await user.click(document.body);

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('doesn\'t open when disabled', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} disabled />);

            await user.click(screen.getByTestId('textbox'));

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('callback is fired when the textbox is closed', async () => {
            const callback = jest.fn();
            const user = userEvent.setup();
            renderWithProviders(
                <DropdownList options={provinces} onClose={callback} defaultOpen />,
            );
            screen.getByTestId('textbox').focus();

            await user.keyboard('{Escape}');

            expect(callback).toHaveBeenCalledTimes(1);
        });
    });

    describe('readonly state', () => {
        it('renders correctly with readOnly enabled', () => {
            renderWithProviders(
                <DropdownList options={provinces} readOnly label="ReadOnly Dropdown" />,
            );

            const textbox = screen.getByTestId('textbox');

            expect(textbox).toHaveAttribute('aria-readonly', 'true');
        });

        it('does not open listbox when clicked in readOnly mode', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <DropdownList options={provinces} readOnly label="ReadOnly Dropdown" />,
            );

            await user.click(screen.getByTestId('textbox'));

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('does not respond to keyboard events in readOnly mode', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <DropdownList options={provinces} readOnly label="ReadOnly Dropdown" />,
            );

            screen.getByTestId('textbox').focus();
            await user.keyboard('{ArrowDown}');

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('readonly mode prevents option selection', async () => {
            const onChangeMock = jest.fn();
            const user = userEvent.setup();

            renderWithProviders(
                <DropdownList
                    options={provinces}
                    readOnly
                    onChange={onChangeMock}
                    label="ReadOnly Dropdown"
                />,
            );

            await user.click(screen.getByTestId('textbox'));

            expect(screen.queryByTestId('listitem-qc')).not.toBeInTheDocument();
            expect(onChangeMock).not.toHaveBeenCalled();
        });
    });

    describe('default value', () => {
        it('defaultValue assigns this value to the input', () => {
            renderWithProviders(<DropdownList options={provinces} defaultValue="qc" />);

            expect(screen.getByTestId('input')).toHaveValue('qc');
        });

        it('the corresponding option is selected and focused when expanding the listbox', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} defaultValue="qc" />);

            await user.click(screen.getByTestId('textbox'));

            expect(screen.getByTestId('listitem-qc')).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByRole('listbox')).toHaveAttribute(
                'aria-activedescendant',
                expect.stringContaining('listbox_qc'),
            );
        });

        it('defaultValue can select an empty value', () => {
            const options = provinces.concat([{ value: '', label: '' }]);
            renderWithProviders(<DropdownList options={options} defaultValue="" />);

            expect(screen.getByTestId('input')).toHaveValue('');
        });

        it('no defaultValues are displayed when not specified and list is multiselect', () => {
            renderWithProviders(<DropdownList options={provinces} multiselect />);

            expect(screen.getByTestId('tag-wrapper').children).toHaveLength(0);
            expect(screen.getByTestId('input')).toHaveValue('');
        });

        it('the specified defaultValues are independently displayed when list is multiselect', () => {
            renderWithProviders(<DropdownList options={provinces} defaultValue={['nl', 'qc']} multiselect />);

            expect(screen.queryByTestId('listboxtag-qc')).toBeInTheDocument();
            expect(screen.queryByTestId('listboxtag-nl')).toBeInTheDocument();
            expect(screen.getByTestId('tag-wrapper').children).toHaveLength(2);
            expect(screen.getByTestId('input')).toHaveValue('nl|qc');
        });
    });

    describe('option selection', () => {
        it('clicking an option selects it and updates the input value', async () => {
            renderWithProviders(<DropdownList options={provinces} defaultOpen />);

            await clickDropdownListOption('listitem-qc');

            expect(screen.getByTestId('input')).toHaveValue('qc');
        });

        it('the selected value is still focused when expanding the listbox', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} defaultOpen />);

            await clickDropdownListOption('listitem-qc');
            await user.click(screen.getByTestId('textbox'));

            expect(screen.getByTestId('listitem-qc')).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByRole('listbox')).toHaveAttribute(
                'aria-activedescendant',
                expect.stringContaining('listbox_qc'),
            );
        });

        it('the focused option is selected when clicking outside', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} defaultOpen defaultValue="ab" />);

            screen.getByTestId('textbox').focus();
            await user.keyboard('{ArrowDown}');
            await user.click(document.body);

            expect(screen.getByTestId('input')).toHaveValue('bc');
        });

        it('clicking an option selects it and adds it to the input values when list is multiselect', async () => {
            renderWithProviders(<DropdownList options={provinces} defaultOpen multiselect />);

            await clickDropdownListOption('listitem-nl');
            await clickDropdownListOption('listitem-qc');

            expect(screen.getByTestId('input')).toHaveValue('nl|qc');
        });

        it('options are disabled when max number of selectable options is reached', async () => {
            renderWithProviders(
                <DropdownList options={provinces} defaultOpen multiselect maxSelectableOptions={2} />,
            );

            await clickDropdownListOption('listitem-on');
            await clickDropdownListOption('listitem-qc');

            const disabledOptions = [
                screen.getByTestId('listitem-ab'),
                screen.getByTestId('listitem-bc'),
                screen.getByTestId('listitem-mb'),
                screen.getByTestId('listitem-nb'),
                screen.getByTestId('listitem-nl'),
                screen.getByTestId('listitem-nt'),
                screen.getByTestId('listitem-ns'),
                screen.getByTestId('listitem-nu'),
                screen.getByTestId('listitem-pe'),
                screen.getByTestId('listitem-sk'),
                screen.getByTestId('listitem-yt'),
            ];
            disabledOptions.forEach((option) => {
                expect(option).toHaveAttribute('aria-disabled', 'true');
            });
        });

        it('selected options are not disabled when max number of selectable options is reached', async () => {
            renderWithProviders(
                <DropdownList options={provinces} defaultOpen multiselect maxSelectableOptions={2} />,
            );

            await clickDropdownListOption('listitem-on');
            await clickDropdownListOption('listitem-qc');

            const selectedOptions = [
                screen.getByTestId('listitem-on'),
                screen.getByTestId('listitem-qc'),
            ];
            selectedOptions.forEach((option) => {
                expect(option).toHaveAttribute('aria-disabled', 'false');
            });
        });
    });

    describe('component is controlled', () => {
        it('the input value is set according to the value prop', () => {
            renderWithProviders(<DropdownList options={provinces} value="qc" />);

            expect(screen.getByTestId('input')).toHaveValue('qc');
        });

        it('the input value is updated when the value prop changes', () => {
            const { rerender } = renderWithProviders(<DropdownList options={provinces} value="qc" />);

            rerender(<DropdownList options={provinces} value="ns" />);

            expect(screen.getByTestId('input')).toHaveValue('ns');
        });

        it('the input value is set according to the value prop using an empty value', () => {
            const options = provinces.concat([{ value: '', label: '' }]);
            renderWithProviders(<DropdownList options={options} defaultValue="qc" value="" />);

            expect(screen.getByTestId('input')).toHaveValue('');
        });
    });

    describe('icon is handled', () => {
        it('the icon is set according to the iconName prop', () => {
            renderWithProviders(<DropdownList options={provinces} iconName="menu" />);

            const icon = screen.getByTestId('textbox-icon');
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveAttribute('icon-name', 'menu');
        });

        it('the icon is not set when the iconName prop is undefined', () => {
            renderWithProviders(<DropdownList options={provinces} />);

            expect(screen.queryByTestId('textbox-icon')).not.toBeInTheDocument();
        });
    });

    describe('onChange callback', () => {
        it('callback is fired when an option is selected', async () => {
            const callback = jest.fn();
            renderWithProviders(<DropdownList onChange={callback} options={provinces} defaultOpen />);

            await clickDropdownListOption('listitem-qc');

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(expect.objectContaining({ value: 'qc' }));
        });

        it('callback is not fired when setting default value', () => {
            const callback = jest.fn();
            renderWithProviders(<DropdownList options={provinces} onChange={callback} defaultValue="qc" />);

            expect(callback).not.toHaveBeenCalled();
        });

        it('callback is not fired when the value prop is changed', () => {
            const callback = jest.fn();
            const { rerender } = renderWithProviders(
                <DropdownList options={provinces} onChange={callback} value="qc" />,
            );

            rerender(<DropdownList options={provinces} onChange={callback} value="ns" />);

            expect(callback).not.toHaveBeenCalled();
        });

        it('callback is not fired when the option is already selected', async () => {
            const callback = jest.fn();
            renderWithProviders(
                <DropdownList options={provinces} onChange={callback} defaultValue="qc" defaultOpen />,
            );

            await clickDropdownListOption('listitem-qc');

            expect(callback).not.toHaveBeenCalled();
        });

        it('callback received the selected option when fired', async () => {
            const callback = jest.fn();
            renderWithProviders(<DropdownList options={provinces} onChange={callback} defaultOpen />);

            await clickDropdownListOption('listitem-qc');

            expect(callback).toHaveBeenCalledWith({ value: 'qc', label: 'Quebec' });
        });
    });

    describe('keyboard navigation', () => {
        ['Enter', ' ', 'ArrowUp', 'ArrowDown', 'Home', 'End'].forEach((key) => {
            it(`${key === ' ' ? 'Space' : key} opens the listbox`, async () => {
                const user = userEvent.setup();
                renderWithProviders(<DropdownList options={provinces} />);

                screen.getByTestId('textbox').focus();
                await user.keyboard(`{${key}}`);

                expect(screen.getByRole('listbox')).toBeInTheDocument();
            });
        });

        ['ArrowDown', 'Home'].forEach((key) => {
            it(`${key} also focuses the first option when it opens the listbox`, async () => {
                const user = userEvent.setup();
                renderWithProviders(<DropdownList options={provinces} />);

                screen.getByTestId('textbox').focus();
                await user.keyboard(`{${key}}`);

                expect(screen.getByRole('listbox')).toHaveAttribute(
                    'aria-activedescendant',
                    expect.stringContaining('listbox_ab'),
                );
            });
        });

        it('End also focuses the last option when it opens the listbox', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} />);

            screen.getByTestId('textbox').focus();
            await user.keyboard('{End}');

            expect(screen.getByRole('listbox')).toHaveAttribute(
                'aria-activedescendant',
                expect.stringContaining('listbox_yt'),
            );
        });

        it('ArrowUp focuses the previous option', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} defaultOpen defaultValue="qc" />);

            screen.getByTestId('textbox').focus();
            await user.keyboard('{ArrowUp}');

            expect(screen.getByRole('listbox')).toHaveAttribute(
                'aria-activedescendant',
                expect.stringContaining('listbox_pe'),
            );
        });

        it('ArrowDown focuses the next option', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} defaultOpen defaultValue="qc" />);

            screen.getByTestId('textbox').focus();
            await user.keyboard('{ArrowDown}');

            expect(screen.getByRole('listbox')).toHaveAttribute(
                'aria-activedescendant',
                expect.stringContaining('listbox_sk'),
            );
        });

        it('Home focuses the first option', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} defaultOpen />);

            screen.getByTestId('textbox').focus();
            await user.keyboard('{Home}');

            expect(screen.getByRole('listbox')).toHaveAttribute(
                'aria-activedescendant',
                expect.stringContaining('listbox_ab'),
            );
        });

        it('End focuses the last option', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} defaultOpen />);

            screen.getByTestId('textbox').focus();
            await user.keyboard('{End}');

            expect(screen.getByRole('listbox')).toHaveAttribute(
                'aria-activedescendant',
                expect.stringContaining('listbox_yt'),
            );
        });

        it('Escape closes the listbox', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} defaultOpen />);

            screen.getByTestId('textbox').focus();
            await user.keyboard('{Escape}');

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('Enter selects the focused option', async () => {
            const user = userEvent.setup();
            renderWithProviders(<DropdownList options={provinces} defaultOpen defaultValue="qc" />);

            screen.getByTestId('textbox').focus();
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{Enter}');

            expect(screen.getByTestId('input')).toHaveValue('sk');
        });

        describe('when typing printable characters', () => {
            it('listbox opens when typing printable characters', async () => {
                const user = userEvent.setup();
                renderWithProviders(<DropdownList options={provinces} />);

                screen.getByTestId('textbox').focus();
                await user.keyboard('a');

                expect(screen.getByRole('listbox')).toBeInTheDocument();
            });

            it('typing a letter focuses the first option starting with that letter', async () => {
                const user = userEvent.setup();
                renderWithProviders(<DropdownList options={provinces} defaultOpen />);

                screen.getByTestId('textbox').focus();
                await user.keyboard('q');

                expect(screen.getByRole('listbox')).toHaveAttribute(
                    'aria-activedescendant',
                    expect.stringContaining('listbox_qc'),
                );
            });

            it('typing a letter focuses the next option starting with that letter', async () => {
                const user = userEvent.setup();
                renderWithProviders(<DropdownList options={provinces} defaultOpen defaultValue="nb" />);

                screen.getByTestId('textbox').focus();
                await user.keyboard('n');
                await user.keyboard('n');

                expect(screen.getByRole('listbox')).toHaveAttribute(
                    'aria-activedescendant',
                    expect.stringContaining('listbox_nt'),
                );
            });

            it('typing letters in rapid succession focuses the next option starting with that sequence', async () => {
                const user = userEvent.setup();
                renderWithProviders(<DropdownList options={provinces} defaultOpen />);

                screen.getByTestId('textbox').focus();
                await user.keyboard('n');
                await user.keyboard('o');

                expect(screen.getByRole('listbox')).toHaveAttribute(
                    'aria-activedescendant',
                    expect.stringContaining('listbox_nt'),
                );
            });

            it('typing a letter that matches no option doesn\'t move the focus', async () => {
                const user = userEvent.setup();
                renderWithProviders(<DropdownList options={provinces} defaultOpen defaultValue="qc" />);

                screen.getByTestId('textbox').focus();
                await user.keyboard('z');

                expect(screen.getByRole('listbox')).toHaveAttribute(
                    'aria-activedescendant',
                    expect.stringContaining('listbox_qc'),
                );
            });
        });

        it('Enter removes the focused Tag when list is multiselect', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <DropdownList options={provinces} defaultValue={['ab', 'bc']} defaultOpen multiselect />,
            );

            screen.getByTestId('textbox').focus();
            await user.keyboard('{Enter}');

            expect(screen.getByTestId('input')).toHaveValue('ab');
        });
    });

    it('input should have controllable data-testid', () => {
        renderWithProviders(
            <DropdownList data-testid="a-controlled-id" options={provinces} defaultValue="qc" />,
        );

        expect(screen.getByTestId('a-controlled-id')).toHaveAttribute('role', 'combobox');
    });

    it('matches the snapshot', () => {
        const { container } = renderWithProviders(
            <DropdownList
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
            <DropdownList
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
            <DropdownList
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
            <DropdownList
                defaultOpen
                options={provinces}
            />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches the snapshot (multiselect)', () => {
        const { container } = renderWithProviders(
            <DropdownList
                defaultOpen
                options={provinces}
                multiselect
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches the snapshot (icon)', () => {
        const { container } = renderWithProviders(
            <DropdownList
                defaultOpen
                label="Select an option"
                hint="Hint"
                options={provinces}
                iconName="menu"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
