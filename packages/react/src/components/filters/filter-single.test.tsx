import { screen, waitFor, within } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { renderWithProviders, rerenderWithProviders } from '../../test-utils/renderer';
import type { FilterOption } from './filter-option';
import { FilterSingle } from './filter-single';

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

describe('FilterSingle', () => {
    describe('rendering', () => {
        it('renders button with label', () => {
            const { container } = renderWithProviders(<FilterSingle label="Status" options={options} />);

            expect(container).toMatchSnapshot();
        });

        it('shows \'All\' when no selected value', () => {
            renderWithProviders(<FilterSingle label="Status" options={options} />);

            expect(getDropdownButton()).toHaveTextContent('All');
        });

        it('shows option label when value is selected', () => {
            renderWithProviders(<FilterSingle label="Status" options={options} value="option1" />);

            expect(getDropdownButton()).toHaveTextContent('Option 1');
        });

        it('applies active styling when filter is applied', () => {
            const { container } = renderWithProviders(
                <FilterSingle label="Status" options={options} value="option1" />,
            );

            expect(container).toMatchSnapshot();
        });

        it('updates value when props change', () => {
            const { rerender } = renderWithProviders(
                <FilterSingle label="Status" options={options} value="option1" />,
            );
            expect(getDropdownButton()).toHaveTextContent('Option 1');

            rerenderWithProviders(<FilterSingle label="Status" options={options} value="option2" />, rerender);
            expect(getDropdownButton()).toHaveTextContent('Option 2');

            rerenderWithProviders(<FilterSingle label="Status" options={options} value={undefined} />, rerender);
            expect(getDropdownButton()).toHaveTextContent('All');
        });
    });

    describe('dropdown menu', () => {
        it('opens dropdown when button is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={options} />);

            await openDropdown(user);

            await waitFor(() => {
                expect(screen.getByRole('listbox')).toBeInTheDocument();
            });
        });

        it('displays all options in dropdown', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={options} />);

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
            renderWithProviders(<FilterSingle label="Status" options={moreThanTenOptions} />);

            await openDropdown(user);

            await waitFor(() => {
                expect(screen.getByRole('searchbox')).toBeInTheDocument();
            });
        });

        it('does not display search box when 10 or fewer options', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={options} />);

            await openDropdown(user);

            await waitFor(() => {
                expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
            });
        });

        it('closes dropdown when clicking outside', async () => {
            const user = userEvent.setup();
            const { baseElement } = renderWithProviders(<FilterSingle label="Status" options={options} />);

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
        it('calls onChange with selected value and closes dropdown', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<FilterSingle label="Status" options={options} onChange={onChange} />);

            await openDropdown(user);
            await user.click(screen.getByText('Option 1'));

            expect(onChange).toHaveBeenCalledWith('option1');
            await waitFor(() => {
                expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
            });
        });

        it('replaces previous selection when selecting new option', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(
                <FilterSingle label="Status" options={options} value="option1" onChange={onChange} />,
            );

            await openDropdown(user);
            await user.click(screen.getByText('Option 2'));

            expect(onChange).toHaveBeenCalledWith('option2');
        });

        it('maintains selected option when dropdown reopens', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={options} value="option1" />);

            await openDropdown(user);

            await waitFor(() => {
                const listbox = screen.getByRole('listbox');
                const option1 = within(listbox).getByText('Option 1').closest('[role="option"]');
                expect(option1).toHaveAttribute('aria-selected', 'true');
            });
        });
    });

    describe('search', () => {
        it('filters options based on search input', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={moreThanTenOptions} />);

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
            renderWithProviders(<FilterSingle label="Status" options={moreThanTenOptions} />);

            await openDropdown(user);

            const searchBox = await screen.findByRole('searchbox');
            await user.type(searchBox, 'nonexistent');

            await waitFor(() => {
                expect(screen.getByText('No matching results')).toBeInTheDocument();
            });
        });

        it('search is case insensitive', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={moreThanTenOptions} />);

            await openDropdown(user);

            const searchBox = await screen.findByRole('searchbox');
            await user.type(searchBox, 'option 1');

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument();
            });
        });

        it('clears search when dropdown is closed', async () => {
            const user = userEvent.setup();
            const { baseElement } = renderWithProviders(<FilterSingle label="Status" options={moreThanTenOptions} />);

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
        it('clears selected filter when clear button is clicked', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<FilterSingle label="Status" options={options} value="option1" onChange={onChange} />);

            await openDropdown(user);

            const clearButton = await screen.findByText('Clear filter');
            await user.click(clearButton);

            expect(onChange).toHaveBeenCalledWith(null);
            await waitFor(() => {
                expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
            });
        });

        it('clear button is disabled when no filter selected', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={options} />);

            await openDropdown(user);

            const clearButton = await getClearButton();
            expect(clearButton.closest('[role=button]')).toHaveAttribute('aria-disabled', 'true');
        });

        it('clear button is enabled when filter is selected', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={options} value="option1" />);

            await openDropdown(user);

            const clearButton = await getClearButton();
            expect(clearButton.closest('[role=button]')).toHaveAttribute('aria-disabled', 'false');
        });

        it.each([['[Enter]'], ['[Space]']])('clear button can be activated with %s key', async (key) => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<FilterSingle label="Status" options={options} value="option1" onChange={onChange} />);

            await openDropdown(user);

            const clearButton = await getClearButton();
            clearButton.closest('div')!.focus();
            await user.keyboard(key);

            expect(onChange).toHaveBeenCalledWith(null);
        });
    });

    describe('disabled options', () => {
        it('renders disabled options', async () => {
            const user = userEvent.setup();
            const optionsWithDisabled: FilterOption[] = [
                ...options,
                { value: 'disabled', label: 'Disabled Option', disabled: true },
            ];

            renderWithProviders(<FilterSingle label="Status" options={optionsWithDisabled} />);

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

            renderWithProviders(<FilterSingle label="Status" options={optionsWithDisabled} onChange={onChange} />);

            await openDropdown(user);

            const disabledOption = screen.getByText('Disabled Option');
            await user.click(disabledOption);

            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe('keyboard navigation', () => {
        it.each([['[Enter]'], ['[Space]']])('opens dropdown with %s key', async (key) => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={options} />);

            getDropdownButton().focus();
            await user.keyboard(key);

            await waitFor(() => {
                expect(screen.getByRole('listbox')).toBeInTheDocument();
            });
        });
    });
});
