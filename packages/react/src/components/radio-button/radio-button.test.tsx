import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { RadioButton } from './radio-button';

describe('RadioButton', () => {
    it('should have controllable data-testid', () => {
        renderWithProviders(<RadioButton checked id="test-id" onChange={jest.fn()} />);

        expect(screen.getByTestId('radiobutton-test-id')).toBeInTheDocument();
    });

    it('should be checked by default is defaultChecked prop is present', () => {
        renderWithProviders(<RadioButton defaultChecked />);

        const input = screen.getByRole('radio');

        expect(input).toBeChecked();
    });

    it('onChange callback should be called when radio button is checked', async () => {
        const callback = jest.fn();
        renderWithProviders(<RadioButton onChange={callback} />);

        const input = screen.getByRole('radio');
        await userEvent.click(input);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should be checked when checked prop is set to true', () => {
        renderWithProviders(<RadioButton checked onChange={jest.fn()} />);

        const input = screen.getByRole('radio');

        expect(input).toBeChecked();
    });

    it('should be disabled when disabled prop is set to true', () => {
        renderWithProviders(<RadioButton disabled />);

        const input = screen.getByRole('radio');

        expect(input).toBeDisabled();
    });

    it('matches snapshot', () => {
        const { container } = renderWithProviders(<RadioButton label="This is a label" />);

        expect(container).toMatchSnapshot();
    });
});
