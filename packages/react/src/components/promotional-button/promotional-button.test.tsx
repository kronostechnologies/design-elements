import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { PromotionalButton } from './promotional-button';

describe('PromotionalButton', () => {
    it('renders the label', () => {
        renderWithProviders(<PromotionalButton label="Learn more" />);

        expect(screen.getByText('Learn more')).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
        const onClick = jest.fn();

        renderWithProviders(<PromotionalButton label="Some promo" onClick={onClick} />);

        await userEvent.click(screen.getByRole('button', { name: 'Some promo' }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when loading', () => {
        renderWithProviders(<PromotionalButton label="Loading" loading />);

        expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders a spinner when loading', () => {
        renderWithProviders(<PromotionalButton label="Loading" loading />);

        expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    });

    it('does not render a spinner when not loading', () => {
        renderWithProviders(<PromotionalButton label="Some promo" />);

        expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    it('renders when not loading', () => {
        const { container } = renderWithProviders(<PromotionalButton label="Some promo" />);

        expect(container).toMatchSnapshot();
    });

    it('does not render the left icon when loading', () => {
        const { container } = renderWithProviders(<PromotionalButton label="Loading" loading />);

        expect(container).toMatchSnapshot();
    });
});
