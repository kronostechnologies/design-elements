import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { Checkbox, type CheckboxProps } from './checkbox';

const defaultProps: CheckboxProps = {
    label: 'Boat',
    name: 'vehicule',
    value: 'boat',
};

function targetChecked(checked: boolean): object {
    return expect.objectContaining({ target: expect.objectContaining({ checked }) });
}

describe('Checkbox', () => {
    it('has controllable data-testid', () => {
        renderWithProviders(<Checkbox data-testid="some-data-testid" {...defaultProps} />);

        expect(screen.getByTestId('some-data-testid')).toBeInTheDocument();
    });

    it('calls onChange callback when checkbox is checked / unchecked', async () => {
        const callback = jest.fn();
        renderWithProviders(<Checkbox {...defaultProps} onChange={callback} />);

        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);

        expect(callback).toHaveBeenCalledWith(targetChecked(true));

        await userEvent.click(checkbox);
        expect(callback).toHaveBeenCalledWith(targetChecked(false));
    });

    it('is checked when defaultChecked prop is set to true', () => {
        renderWithProviders(<Checkbox {...defaultProps} defaultChecked />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('is checked when checked prop is set to true', () => {
        renderWithProviders(<Checkbox {...defaultProps} checked onChange={jest.fn()} />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('is disabled when disabled prop is set to true', () => {
        renderWithProviders(<Checkbox {...defaultProps} disabled />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeDisabled();
    });

    it('matches snapshot', () => {
        const { container } = renderWithProviders(<Checkbox {...defaultProps} />);

        expect(container).toMatchSnapshot();
    });
});
