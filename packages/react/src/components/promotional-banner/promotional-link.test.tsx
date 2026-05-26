import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { PromotionalLink } from './promotional-link';

describe('PromotionalLink', () => {
    it('renders the label', () => {
        renderWithProviders(<PromotionalLink label="Learn more" />);

        expect(screen.getByText('Learn more')).toBeInTheDocument();
    });

    it('renders as a link with the given href', () => {
        renderWithProviders(<PromotionalLink label="Visit" href="https://example.com" />);

        expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
    });

    it('calls onClick when clicked', async () => {
        const onClick = jest.fn();

        renderWithProviders(<PromotionalLink label="Click me" onClick={onClick} />);

        await userEvent.click(screen.getByRole('link'));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when loading', () => {
        renderWithProviders(<PromotionalLink label="Loading" loading />);

        expect(screen.getByTestId('link')).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders a spinner when loading', () => {
        renderWithProviders(<PromotionalLink label="Loading" loading />);

        expect(screen.getByTestId('link-loading')).toBeInTheDocument();
    });

    it('does not render a spinner when not loading', () => {
        renderWithProviders(<PromotionalLink label="Ready" />);

        expect(screen.queryByTestId('link-loading')).not.toBeInTheDocument();
    });

    it('renders the equisoft icon when not loading', () => {
        const { container } = renderWithProviders(<PromotionalLink label="Ready" />);

        expect(container).toMatchSnapshot();
    });

    it('does not render the equisoft icon when loading', () => {
        const { container } = renderWithProviders(<PromotionalLink label="Loading" loading />);

        expect(container).toMatchSnapshot();
    });
});
