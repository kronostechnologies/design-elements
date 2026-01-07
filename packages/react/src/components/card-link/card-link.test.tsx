import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/testing-library';
import { CardLink } from './card-link';

describe('CardLink', () => {
    it('matches snapshot', () => {
        const { asFragment } = renderWithProviders(<CardLink label="Link Label" href="/" />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with correct label and href', () => {
        renderWithProviders(<CardLink label="Link Label" href="/test-path" />);

        const link = screen.getByRole('link', { name: 'Link Label' });

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/test-path');
    });
});
