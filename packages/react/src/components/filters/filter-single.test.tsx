import { screen, within } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
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

describe('FilterSingle', () => {
    describe('rendering', () => {
        it('renders button with label', () => {
            const { container } = renderWithProviders(<FilterSingle label="Status" options={options} />);

            expect(container).toMatchSnapshot();
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

            rerender(<FilterSingle label="Status" options={options} value="option2" />);
            expect(getDropdownButton()).toHaveTextContent('Option 2');

            rerender(<FilterSingle label="Status" options={options} value={undefined} />);
            expect(getDropdownButton()).toHaveTextContent('Status');
        });
    });

    describe('dropdown menu', () => {
        it('opens dropdown when button is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={options} />);

            await openDropdown(user);

            expect(screen.getByRole('listbox')).toBeInTheDocument();
        });

        it('displays all options in dropdown', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={options} />);

            await openDropdown(user);

            const items = screen.getAllByRole('option');
            expect(items).toHaveLength(options.length + 1);
            expect(items[0]).toHaveTextContent('All');
            options.forEach((option, i) => {
                expect(items[i + 1]).toHaveTextContent(option.label);
            });
        });

        it('allows customizing "All" option label', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <FilterSingle label="Status" options={options} allOptionLabel="Everything" />,
            );

            await openDropdown(user);

            const allOption = screen.getByRole('option', { name: 'Everything' });
            expect(allOption).toBeInTheDocument();
        });

        it('displays search box when more than 10 options', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={moreThanTenOptions} />);

            await openDropdown(user);

            expect(screen.getByRole('searchbox')).toBeInTheDocument();
        });

        it('does not display search box when 10 or fewer options', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={options} />);

            await openDropdown(user);

            expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
        });

        it('closes dropdown when clicking outside', async () => {
            const user = userEvent.setup();
            const { baseElement } = renderWithProviders(<FilterSingle label="Status" options={options} />);

            await openDropdown(user);
            expect(screen.getByRole('listbox')).toBeInTheDocument();

            await user.click(baseElement);
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
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
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
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

            const listbox = screen.getByRole('listbox');
            const option1 = within(listbox).getByText('Option 1').closest('[role="option"]');
            expect(option1).toHaveAttribute('aria-selected', 'true');
        });
    });

    describe('search', () => {
        it('filters options based on search input', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={moreThanTenOptions} />);

            await openDropdown(user);

            const searchBox = await screen.findByRole('searchbox');
            await user.type(searchBox, '1');

            expect(screen.getByText('Option 1')).toBeInTheDocument();
            expect(screen.getByText('Option 10')).toBeInTheDocument();
            expect(screen.getByText('Option 11')).toBeInTheDocument();
            expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
        });

        it('shows no results message when search matches nothing', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={moreThanTenOptions} />);

            await openDropdown(user);

            const searchBox = await screen.findByRole('searchbox');
            await user.type(searchBox, 'nonexistent');

            expect(screen.getByText('No matching results')).toBeInTheDocument();
        });

        it('search is case insensitive', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterSingle label="Status" options={moreThanTenOptions} />);

            await openDropdown(user);

            const searchBox = await screen.findByRole('searchbox');
            await user.type(searchBox, 'option 1');

            expect(screen.getByText('Option 1')).toBeInTheDocument();
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
        it('clears selected filter when "All" option is selected', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<FilterSingle label="Status" options={options} value="option1" onChange={onChange} />);

            await openDropdown(user);

            const allOption = await screen.findByText('All');
            await user.click(allOption);

            expect(onChange).toHaveBeenCalledWith(null);
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
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

            const disabledOption = screen.getByText('Disabled Option').closest('[role="option"]');
            expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
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

            expect(screen.getByRole('listbox')).toBeInTheDocument();
        });
    });
});
