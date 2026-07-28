import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { ToggleSwitch } from './toggle-switch';

describe('ToggleSwitch', () => {
    it('renders label to the right when labelPosition is "right" (by default)', () => {
        renderWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />,
        );

        const label = screen.getByTestId('switch-label');
        const button = screen.getByRole('switch');

        expect(button?.nextSibling).toBe(label);
    });

    it('renders label to the left when labelPosition is "left"', () => {
        renderWithProviders(
            <ToggleSwitch label="Switch" labelPosition="left" toggled onToggle={jest.fn()} />,
        );

        const label = screen.getByTestId('switch-label');
        const button = screen.getByRole('switch');

        expect(label?.nextSibling).toBe(button);
    });

    it('matches snapshot (desktop)', () => {
        const { container } = renderWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />,
            'desktop',
        );

        expect(container.children).toMatchSnapshot();
    });

    it('matches snapshot (mobile)', () => {
        const { container } = renderWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />,
            'mobile',
        );

        expect(container.children).toMatchSnapshot();
    });

    it('calls onToggle callback when clicked', async () => {
        const onToggle = jest.fn();
        renderWithProviders(<ToggleSwitch label="Switch" toggled onToggle={onToggle} />);

        const switchButton = screen.getByRole('switch');
        await userEvent.click(switchButton);

        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('does not call onToggle callback when disabled', async () => {
        const onToggle = jest.fn();
        renderWithProviders(<ToggleSwitch label="Switch" toggled disabled onToggle={onToggle} />);

        const switchButton = screen.getByRole('switch');
        await userEvent.click(switchButton);

        expect(onToggle).not.toHaveBeenCalled();
    });

    it('matches snapshot when disabled', () => {
        const { container } = renderWithProviders(
            <ToggleSwitch label="Switch" toggled disabled onToggle={jest.fn()} />,
        );

        expect(container.children).toMatchSnapshot();
    });
});
