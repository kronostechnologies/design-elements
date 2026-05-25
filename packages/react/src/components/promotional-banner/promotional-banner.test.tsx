import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { PromotionalBanner } from './promotional-banner';

describe('PromotionalBanner', () => {
    const someLink = { label: 'Learn more', onClick: jest.fn() };
    const onDismiss = jest.fn();

    it('renders children', () => {
        renderWithProviders(
            <PromotionalBanner link={someLink} onDismiss={onDismiss}>
                <span>Banner content</span>
            </PromotionalBanner>,
        );

        expect(screen.getByText('Banner content')).toBeInTheDocument();
    });

    it('renders the link with the given label', () => {
        const link = { label: 'promo text', onClick: jest.fn() };

        renderWithProviders(
            <PromotionalBanner link={link} onDismiss={onDismiss} />,
        );

        expect(screen.getByText('promo text')).toBeInTheDocument();
    });

    it('does not render the dismiss button when onDismiss is not provided', () => {
        renderWithProviders(
            <PromotionalBanner link={someLink} />,
        );

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('calls onDismiss when the dismiss button is clicked', async () => {
        renderWithProviders(
            <PromotionalBanner link={someLink} onDismiss={onDismiss} />,
        );

        await userEvent.click(screen.getByRole('button'));

        expect(onDismiss).toHaveBeenCalledTimes(1);
    });
});
