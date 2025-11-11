import { screen, waitFor, within } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { FilterMulti } from './filter-multi';
import type { FilterOption } from './filter-option';

const options: FilterOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
];

const moreThanTenOptions: FilterOption[] = Array.from({ length: 15 }, (_, i) => ({
    value: `option${i + 1}`,
    label: `Option ${i + 1}`,
}));

function getDropdownButton(): HTMLElement {
    return screen.getByRole('button');
}

async function openDropdown(user: UserEvent): Promise<void> {
    await user.click(getDropdownButton());
}

async function getClearButton(): Promise<HTMLElement> {
    return screen.findByText('Clear filter');
}

describe('FilterMulti', () => {
    describe('rendering', () => {
        it('renders button with label', () => {
            const { container } = renderWithProviders(<FilterMulti label="Status" options={options} />);

            expect(container).toMatchSnapshot();
        });

        it('shows \'All\' when no selected values', () => {
            renderWithProviders(<FilterMulti label="Status" options={options} />);

            expect(getDropdownButton()).toHaveTextContent('All');
        });

        it('shows option label when single selected value', () => {
            renderWithProviders(<FilterMulti label="Status" options={options} value={['option1']} />);

            expect(getDropdownButton()).toHaveTextContent('Option 1');
        });

        it('shows count when multiple values selected', () => {
            renderWithProviders(<FilterMulti label="Status" options={options} value={['option1', 'option2']} />);

            expect(getDropdownButton()).toHaveTextContent('(2)');
        });

        it('applies active styling when filters are applied', () => {
            const { container } = renderWithProviders(
                <FilterMulti label="Status" options={options} value={['option1']} />,
            );

            expect(container).toMatchSnapshot();
        });
    });

    describe('dropdown menu', () => {
        it('opens dropdown when button is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterMulti label="Status" options={options} />);

            await openDropdown(user);

            await waitFor(() => {
                expect(screen.getByRole('listbox')).toBeInTheDocument();
            });
        });

        it('displays all options in dropdown', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterMulti label="Status" options={options} />);

            await openDropdown(user);

            await waitFor(() => {
                expect(screen.getAllByRole('option')).toHaveLength(options.length);
                options.forEach((option) => {
                    expect(screen.getByText(option.label)).toBeInTheDocument();
                });
            });
        });

        it('displays search box when more than 10 options', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterMulti label="Status" options={moreThanTenOptions} />);

            await openDropdown(user);

            await waitFor(() => {
                expect(screen.getByRole('searchbox')).toBeInTheDocument();
            });
        });

        it('does not display search box when 10 or fewer options', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <FilterMulti label="Status" options={options} />,
            );

            await openDropdown(user);

            await waitFor(() => {
                expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
            });
        });

        it('closes dropdown when clicking outside', async () => {
            const user = userEvent.setup();
            const { baseElement } = renderWithProviders(
                <FilterMulti label="Status" options={options} />,
            );

            await openDropdown(user);
            await waitFor(() => {
                expect(screen.getByRole('listbox')).toBeInTheDocument();
            });

            await user.click(baseElement);
            await waitFor(() => {
                expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
            });
        });
    });

    describe('option selection', () => {
        it('calls onChange for each selection in non-async mode', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<FilterMulti label="Status" options={options} onChange={onChange} />);

            await openDropdown(user);
            await user.click(screen.getByText('Option 1'));
            await user.click(screen.getByText('Option 2'));

            expect(onChange).toHaveBeenCalledWith(['option1']);
            expect(onChange).toHaveBeenCalledWith(['option1', 'option2']);
        });

        it('deselects option when clicked again in non-async mode', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(
                <FilterMulti label="Status" options={options} value={['option1']} onChange={onChange} />,
            );

            await openDropdown(user);

            const listbox = screen.getByRole('listbox');
            const option1 = within(listbox).getByText('Option 1');
            await user.click(option1);

            expect(onChange).toHaveBeenCalledWith([]);
        });

        it('maintains selected options when dropdown reopens', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <FilterMulti label="Status" options={options} value={['option1', 'option2']} />,
            );

            await openDropdown(user);

            await waitFor(() => {
                const option1 = screen.getByText('Option 1').closest('[role="option"]');
                const option2 = screen.getByText('Option 2').closest('[role="option"]');
                expect(option1).toHaveAttribute('aria-selected', 'true');
                expect(option2).toHaveAttribute('aria-selected', 'true');
            });
        });
    });

    describe('search', () => {
        it('filters options based on search input', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterMulti label="Status" options={moreThanTenOptions} />);

            await openDropdown(user);

            const searchBox = await screen.findByRole('searchbox');
            await user.type(searchBox, '1');

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument();
                expect(screen.getByText('Option 10')).toBeInTheDocument();
                expect(screen.getByText('Option 11')).toBeInTheDocument();
                expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
            });
        });

        it('shows no results message when search matches nothing', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <FilterMulti label="Status" options={moreThanTenOptions} />,
            );

            await openDropdown(user);

            const searchBox = await screen.findByRole('searchbox');
            await user.type(searchBox, 'nonexistent');

            await waitFor(() => {
                expect(screen.getByText('No matching results')).toBeInTheDocument();
            });
        });

        it('search is case insensitive', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <FilterMulti label="Status" options={moreThanTenOptions} />,
            );

            await openDropdown(user);

            const searchBox = await screen.findByRole('searchbox');
            await user.type(searchBox, 'option 1');

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument();
            });
        });

        it('clears search when dropdown is closed', async () => {
            const user = userEvent.setup();
            const { baseElement } = renderWithProviders(<FilterMulti label="Status" options={moreThanTenOptions} />);

            await openDropdown(user);

            let searchBox = await screen.findByRole('searchbox');
            await user.type(searchBox, 'test');

            await user.click(baseElement);
            await openDropdown(user);

            searchBox = await screen.findByRole('searchbox');
            expect(searchBox).toHaveValue('');
        });
    });

    describe('clear filters', () => {
        it('clears all selected filters when clear button is clicked', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(
                <FilterMulti label="Status" options={options} value={['option1', 'option2']} onChange={onChange} />,
            );

            await openDropdown(user);

            const clearButton = await screen.findByText('Clear filters');
            await user.click(clearButton);

            expect(onChange).toHaveBeenCalledWith([]);
        });

        it('clear button is disabled when no filters selected', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterMulti label="Status" options={options} />);

            await openDropdown(user);

            const clearButton = await getClearButton();
            expect(clearButton.closest('[role=button]')).toHaveAttribute('aria-disabled', 'true');
        });

        it('clear button is enabled when filters are selected', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterMulti label="Status" options={options} value={['option1']} />);

            await openDropdown(user);

            const clearButton = await getClearButton();
            expect(clearButton.closest('[role=button]')).toHaveAttribute('aria-disabled', 'false');
        });

        it.each([['[Enter]'], ['[Space]']])('clear button can be activated with %s key', async (key) => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(
                <FilterMulti label="Status" options={options} value={['option1']} onChange={onChange} />,
            );

            await openDropdown(user);

            const clearButton = await getClearButton();
            clearButton.focus();
            await user.keyboard(key);

            expect(onChange).toHaveBeenCalledWith([]);
        });
    });

    describe('async mode', () => {
        it('does not call onChange immediately when selecting options', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<FilterMulti label="Status" options={options} onChange={onChange} async />);

            await openDropdown(user);
            await user.click(screen.getByText('Option 1'));

            expect(onChange).not.toHaveBeenCalled();
        });

        it('shows Apply and Cancel buttons in async mode', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterMulti label="Status" options={options} async />);

            await openDropdown(user);

            await waitFor(() => {
                expect(screen.getByTestId('apply-button')).toBeInTheDocument();
                expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
            });
        });

        it('calls onChange when Apply button is clicked', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<FilterMulti label="Status" options={options} onChange={onChange} async />);

            await openDropdown(user);
            await user.click(screen.getByText('Option 1'));
            await user.click(screen.getByText('Option 2'));

            await user.click(screen.getByTestId('apply-button'));

            expect(onChange).toHaveBeenCalledWith(['option1', 'option2']);
        });

        it('closes dropdown when Apply is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterMulti label="Status" options={options} async />);

            await openDropdown(user);
            await user.click(screen.getByText('Option 1'));
            await user.click(screen.getByTestId('apply-button'));

            await waitFor(() => {
                expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
            });
        });

        it('closes Dropdown without calling onChange when Cancel button is clicked', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(
                <FilterMulti label="Status" options={options} value={['option1']} onChange={onChange} async />,
            );

            await openDropdown(user);

            await user.click(screen.getByText('Option 2'));
            await user.click(screen.getByTestId('cancel-button'));

            expect(onChange).not.toHaveBeenCalled();

            await waitFor(() => {
                expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
            });
        });

        it('does not show Apply and Cancel buttons in non-async mode', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterMulti label="Status" options={options} />);

            await openDropdown(user);

            await waitFor(() => {
                expect(screen.queryByTestId('apply-button')).not.toBeInTheDocument();
                expect(screen.queryByTestId('cancel-button')).not.toBeInTheDocument();
            });
        });

        it('clear filters calls onChange only after apply', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(
                <FilterMulti
                    label="Status"
                    options={options}
                    value={['option1', 'option2']}
                    onChange={onChange}
                    async
                />,
            );

            await openDropdown(user);

            const clearButton = await screen.findByText('Clear filters');
            await user.click(clearButton);
            expect(onChange).not.toHaveBeenCalled();

            await user.click(screen.getByTestId('apply-button'));

            expect(onChange).toHaveBeenCalledWith([]);
        });
    });

    describe('maxSelectableOptions', () => {
        it('disables unselected options when max is reached', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(
                <FilterMulti
                    label="Status"
                    onChange={onChange}
                    options={options}
                    maxSelectableOptions={2}
                    value={['option1', 'option2']}
                />,
            );

            await openDropdown(user);
            await user.click(screen.getByText('Option 3'));

            await waitFor(() => {
                ['Option 3', 'Option 4', 'Option 5'].forEach((label) => {
                    const option = screen.getByText(label).closest('[role="option"]');
                    expect(option).toHaveAttribute('aria-disabled', 'true');
                });
            });
            expect(onChange).not.toHaveBeenCalled();
        });

        it('allows selecting up to max options', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(
                <FilterMulti
                    label="Status"
                    options={options}
                    maxSelectableOptions={2}
                    onChange={onChange}
                />,
            );

            await openDropdown(user);

            await user.click(screen.getByText('Option 1'));
            await user.click(screen.getByText('Option 2'));
            await user.click(screen.getByText('Option 3'));

            expect(onChange).toHaveBeenCalledWith(['option1', 'option2']);
        });

        it('re-enables options when selection count drops below max', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(
                <FilterMulti
                    label="Status"
                    options={options}
                    maxSelectableOptions={2}
                    value={['option1', 'option2']}
                    onChange={onChange}
                />,
            );

            await openDropdown(user);

            await waitFor(async () => {
                const option3Before = screen.getByText('Option 3').closest('[role="option"]');
                expect(option3Before).toHaveAttribute('aria-disabled', 'true');
            });

            await user.click(screen.getByText('Option 1'));

            await waitFor(() => {
                const option3After = screen.getByText('Option 3').closest('[role="option"]');
                expect(option3After).not.toHaveAttribute('aria-disabled', 'true');
            });
        });
    });

    describe('disabled options', () => {
        it('renders disabled options', async () => {
            const user = userEvent.setup();
            const optionsWithDisabled: FilterOption[] = [
                ...options,
                { value: 'disabled', label: 'Disabled Option', disabled: true },
            ];

            renderWithProviders(<FilterMulti label="Status" options={optionsWithDisabled} />);

            await openDropdown(user);

            await waitFor(() => {
                const disabledOption = screen.getByText('Disabled Option').closest('[role="option"]');
                expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
            });
        });

        it('does not select disabled options when clicked', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            const optionsWithDisabled: FilterOption[] = [
                ...options,
                { value: 'disabled', label: 'Disabled Option', disabled: true },
            ];

            renderWithProviders(<FilterMulti label="Status" options={optionsWithDisabled} onChange={onChange} />);

            await openDropdown(user);

            const disabledOption = screen.getByText('Disabled Option');
            await user.click(disabledOption);

            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe('keyboard navigation', () => {
        it.each([['[Enter]'], ['[Space]']])('opens dropdown with %s key', async (key) => {
            const user = userEvent.setup();
            renderWithProviders(
                <FilterMulti label="Status" options={options} />,
            );

            getDropdownButton().focus();
            await user.keyboard(key);

            await waitFor(() => {
                expect(screen.getByRole('listbox')).toBeInTheDocument();
            });
        });
    });
});
