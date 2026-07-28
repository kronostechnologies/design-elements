import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { ExternalLink } from './external-link';

describe('External Link', () => {
    it('matches snapshot', () => {
        const { container } = renderWithProviders(
            <ExternalLink href="https://www.google.ca/" label="External Link" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (label and icon)', () => {
        const { container } = renderWithProviders(
            <ExternalLink href="#" label="External Link" iconName="mail" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (only icon)', () => {
        const { container } = renderWithProviders(
            <ExternalLink href="#" iconName="mail" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (without href)', () => {
        const { container } = renderWithProviders(
            <ExternalLink label="External Link" iconName="mail" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (disabled)', () => {
        const { container } = renderWithProviders(
            <ExternalLink href="#" label="External Link" disabled />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('onClick callback is called when clicked', async () => {
        const callback = jest.fn();
        renderWithProviders(
            <ExternalLink onClick={callback} href="#" label="External Link" />,
        );

        await userEvent.click(screen.getByRole('link', { name: /External Link/i }));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('displays screen-reader-only text when link opens in a new tab (target="_blank")', () => {
        renderWithProviders(<ExternalLink href="#" label="External Link" target="_blank" />);

        expect(screen.getByTestId('screen-reader-text')).toBeInTheDocument();
    });
});
