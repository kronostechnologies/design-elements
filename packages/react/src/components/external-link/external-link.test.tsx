import { renderWithProviders } from '../../test-utils/renderer';
import { ExternalLink } from './external-link';

describe('External Link', () => {
    test('matches snapshot', () => {
        const { container } = renderWithProviders(
            <ExternalLink href="https://www.google.ca/" label="External Link" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (label and icon)', () => {
        const { container } = renderWithProviders(
            <ExternalLink href="#" label="External Link" iconName="mail" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (only icon)', () => {
        const { container } = renderWithProviders(
            <ExternalLink href="#" iconName="mail" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (without href)', () => {
        const { container } = renderWithProviders(
            <ExternalLink label="External Link" iconName="mail" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (disabled)', () => {
        const { container } = renderWithProviders(
            <ExternalLink href="#" label="External Link" disabled />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
