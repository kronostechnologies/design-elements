import { renderWithProviders } from '../../test-utils/renderer';
import { ToggleSwitch } from './toggle-switch';

describe('ToggleSwitch', () => {
    test('renders label to the right when labelPosition is "right" (by default)', () => {
        const { getByTestId: byTestId, getByRole } = renderWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />,
        );

        const label = byTestId('switch-label');
        const button = getByRole('switch');

        expect(button?.nextSibling).toBe(label);
    });

    test('renders label to the left when labelPosition is "left"', () => {
        const { getByTestId: byTestId, getByRole } = renderWithProviders(
            <ToggleSwitch label="Switch" labelPosition="left" toggled onToggle={jest.fn()} />,
        );

        const label = byTestId('switch-label');
        const button = getByRole('switch');

        expect(label?.nextSibling).toBe(button);
    });

    test('Matches snapshot (desktop)', () => {
        const { container } = renderWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />,
            'desktop',
        );

        expect(container.children).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const { container } = renderWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />,
            'mobile',
        );

        expect(container.children).toMatchSnapshot();
    });
});
