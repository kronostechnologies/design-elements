import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { PromotionalBanner } from './promotional-banner';

describe('PromotionalBanner', () => {
    const someButton = { label: 'Learn more', onClick: jest.fn() };
    const onDismiss = jest.fn();

    it('renders children', () => {
        renderWithProviders(
            <PromotionalBanner button={someButton} logo="lifeguide" onDismiss={onDismiss}>
                <span>Banner content</span>
            </PromotionalBanner>,
        );

        expect(screen.getByText('Banner content')).toBeInTheDocument();
    });

    it('renders the button with the given label', () => {
        const button = { label: 'promo text', onClick: jest.fn() };

        renderWithProviders(
            <PromotionalBanner button={button} logo="lifeguide" onDismiss={onDismiss} />,
        );

        expect(screen.getByText('promo text')).toBeInTheDocument();
    });

    it('does not render the dismiss button when onDismiss is not provided', () => {
        renderWithProviders(
            <PromotionalBanner button={someButton} logo="lifeguide" />,
        );

        expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    it('calls onDismiss when the dismiss button is clicked', async () => {
        renderWithProviders(
            <PromotionalBanner button={someButton} logo="lifeguide" onDismiss={onDismiss} />,
        );

        const buttons = screen.getAllByRole('button');
        await userEvent.click(buttons[buttons.length - 1]);

        expect(onDismiss).toHaveBeenCalledTimes(1);
    });
});
