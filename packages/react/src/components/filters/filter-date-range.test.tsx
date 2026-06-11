import { screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { FilterDateRange, type FilterDateRangePreset, type FilterDateRangeValue } from './filter-date-range';

function getDropdownButton(): HTMLElement {
    return screen.getByTestId('menu-button');
}

async function openDropdown(user: UserEvent): Promise<void> {
    await user.click(getDropdownButton());
}

describe('FilterDateRange', () => {
    const A_LABEL = 'Some Date';

    const presets: FilterDateRangePreset[] = [
        { label: 'Last 7 days', startRelative: { days: -7 }, endRelative: { days: 0 } },
        { label: 'Last 30 days', startRelative: { days: -30 }, endRelative: { days: 0 } },
    ];

    describe('rendering', () => {
        it('renders button with label when no value is set', () => {
            renderWithProviders(<FilterDateRange label={A_LABEL} />);

            expect(getDropdownButton()).toHaveTextContent(A_LABEL);
        });

        it('shows formatted date range on button when both from and to are set', () => {
            const value: FilterDateRangeValue = { from: new Date(2024, 0, 15), to: new Date(2024, 2, 20) };

            renderWithProviders(<FilterDateRange label={A_LABEL} value={value} />);

            expect(getDropdownButton()).toHaveTextContent('2024-01-15 - 2024-03-20');
        });

        it('shows single date on button when from and to are the same day', () => {
            const value: FilterDateRangeValue = { from: new Date(2024, 0, 15), to: new Date(2024, 0, 15) };

            renderWithProviders(<FilterDateRange label={A_LABEL} value={value} />);

            expect(getDropdownButton()).toHaveTextContent(/^2024-01-15$/);
            expect(getDropdownButton()).not.toHaveTextContent('2024-01-15 - 2024-01-15');
        });

        it('shows "From {date}" on button when only from date is set', () => {
            const value: FilterDateRangeValue = { from: new Date(2024, 0, 15), to: null };

            renderWithProviders(<FilterDateRange label={A_LABEL} value={value} />);

            expect(getDropdownButton()).toHaveTextContent('From 2024-01-15');
        });

        it('shows "Up to {date}" on button when only to date is set', () => {
            const value: FilterDateRangeValue = { from: null, to: new Date(2024, 2, 20) };

            renderWithProviders(<FilterDateRange label={A_LABEL} value={value} />);

            expect(getDropdownButton()).toHaveTextContent('Up to 2024-03-20');
        });

        it('updates the displayed label when value changes', () => {
            const { rerender } = renderWithProviders(<FilterDateRange label={A_LABEL} />);
            expect(getDropdownButton()).toHaveTextContent(A_LABEL);

            rerender(<FilterDateRange label={A_LABEL} value={{ from: new Date(2024, 0, 15), to: null }} />);
            expect(getDropdownButton()).toHaveTextContent('From 2024-01-15');

            rerender(<FilterDateRange label={A_LABEL} value={undefined} />);
            expect(getDropdownButton()).toHaveTextContent(A_LABEL);
        });
    });

    describe('dropdown', () => {
        it('opens when button is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterDateRange label={A_LABEL} />);

            await openDropdown(user);

            expect(screen.getByTestId('date-range-panel')).toBeInTheDocument();
        });

        it('closes when clicking outside', async () => {
            const user = userEvent.setup();
            const { baseElement } = renderWithProviders(<FilterDateRange label={A_LABEL} />);

            await openDropdown(user);
            expect(screen.getByTestId('date-range-panel')).toBeInTheDocument();

            await user.click(baseElement);

            expect(screen.queryByTestId('date-range-panel')).not.toBeInTheDocument();
        });
    });

    describe('non-async mode', () => {
        it('does not show Apply and Cancel buttons', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterDateRange label={A_LABEL} />);

            await openDropdown(user);

            expect(screen.queryByTestId('apply-button')).not.toBeInTheDocument();
            expect(screen.queryByTestId('cancel-button')).not.toBeInTheDocument();
        });

        it('does not call onChange when in async mode and a preset is selected', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<FilterDateRange label={A_LABEL} presets={presets} onChange={onChange} async />);

            await openDropdown(user);
            await user.click(screen.getByText('Last 7 days'));

            expect(onChange).not.toHaveBeenCalled();
        });

        it('calls onChange immediately when a preset is selected', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<FilterDateRange label={A_LABEL} presets={presets} onChange={onChange} />);

            await openDropdown(user);
            await user.click(screen.getByText('Last 7 days'));

            expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
                from: expect.any(Date),
                to: expect.any(Date),
            }));
        });
    });

    describe('async mode', () => {
        it('shows Apply and Cancel buttons', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterDateRange label={A_LABEL} async />);

            await openDropdown(user);

            expect(screen.getByTestId('apply-button')).toBeInTheDocument();
            expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
        });

        it('does not call onChange when Cancel button is clicked', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<FilterDateRange label={A_LABEL} onChange={onChange} async />);

            await openDropdown(user);
            await user.click(screen.getByTestId('cancel-button'));

            expect(onChange).not.toHaveBeenCalled();
        });

        it('closes dropdown when Cancel button is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterDateRange label={A_LABEL} async />);

            await openDropdown(user);
            await user.click(screen.getByTestId('cancel-button'));

            expect(screen.queryByTestId('date-range-panel')).not.toBeInTheDocument();
        });

        it('calls onChange when Apply button is clicked', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(<FilterDateRange label={A_LABEL} presets={presets} onChange={onChange} async />);

            await openDropdown(user);
            await user.click(screen.getByText('Last 7 days'));
            await user.click(screen.getByTestId('apply-button'));

            expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
                from: expect.any(Date),
                to: expect.any(Date),
            }));
        });

        it('closes dropdown when Apply button is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterDateRange label={A_LABEL} presets={presets} async />);

            await openDropdown(user);
            await user.click(screen.getByText('Last 7 days'));
            await user.click(screen.getByTestId('apply-button'));

            expect(screen.queryByTestId('date-range-panel')).not.toBeInTheDocument();
        });

        it('disables Apply button on open', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <FilterDateRange
                    label={A_LABEL}
                    value={{ from: new Date(2024, 0, 15), to: new Date(2024, 2, 20) }}
                    async
                />,
            );

            await openDropdown(user);

            expect(screen.getByTestId('apply-button')).toHaveAttribute('aria-disabled', 'true');
        });

        it('enables Apply button after selecting a new preset', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterDateRange label={A_LABEL} presets={presets} async />);

            await openDropdown(user);
            await user.click(screen.getByText('Last 7 days'));

            expect(screen.getByTestId('apply-button')).not.toHaveAttribute('aria-disabled', 'true');
        });

        it('disables Apply button again after applying and reopening with the same value', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            const { rerender } = renderWithProviders(
                <FilterDateRange label={A_LABEL} presets={presets} onChange={onChange} async />,
            );

            await openDropdown(user);
            await user.click(screen.getByText('Last 7 days'));
            await user.click(screen.getByTestId('apply-button'));

            const appliedValue = onChange.mock.calls[0][0] as FilterDateRangeValue;
            rerender(
                <FilterDateRange label={A_LABEL} presets={presets} onChange={onChange} value={appliedValue} async />,
            );

            await openDropdown(user);

            expect(screen.getByTestId('apply-button')).toHaveAttribute('aria-disabled', 'true');
        });
    });

    describe('presets', () => {
        it('renders presets in the dropdown', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterDateRange label={A_LABEL} presets={presets} />);

            await openDropdown(user);

            expect(screen.getByText('Last 7 days')).toBeInTheDocument();
            expect(screen.getByText('Last 30 days')).toBeInTheDocument();
        });

        it('renders "All" option to reset presets', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterDateRange label={A_LABEL} presets={presets} />);

            await openDropdown(user);

            expect(screen.getByText('All')).toBeInTheDocument();
        });

        it('calls onChange with null values when "All" is clicked', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            renderWithProviders(
                <FilterDateRange
                    label={A_LABEL}
                    presets={presets}
                    onChange={onChange}
                    value={{ from: new Date(2024, 0, 15), to: new Date(2024, 2, 20) }}
                />,
            );

            await openDropdown(user);
            await user.click(screen.getByText('All'));

            expect(onChange).toHaveBeenCalledWith({ from: null, to: null });
        });

        it('renders "Custom" option in the presets list', async () => {
            const user = userEvent.setup();
            renderWithProviders(<FilterDateRange label={A_LABEL} presets={presets} />);

            await openDropdown(user);

            expect(screen.getByText('Custom')).toBeInTheDocument();
        });

        it('shows preset label on button after selecting a preset with a value', async () => {
            const user = userEvent.setup();
            const last7DaysPreset = presets[0];
            const onChange = jest.fn();
            const emptyValue: FilterDateRangeValue = { from: null, to: null };
            const { rerender } = renderWithProviders(
                <FilterDateRange label={A_LABEL} presets={presets} onChange={onChange} value={emptyValue} />,
            );

            await openDropdown(user);
            await user.click(screen.getByText(last7DaysPreset.label));

            const calledValue = onChange.mock.calls[0][0] as FilterDateRangeValue;
            rerender(<FilterDateRange label={A_LABEL} presets={presets} onChange={onChange} value={calledValue} />);

            expect(getDropdownButton()).toHaveTextContent(/\d\d\d\d-\d\d-\d\d - \d\d\d\d-\d\d-\d\d/);
        });
    });
});
