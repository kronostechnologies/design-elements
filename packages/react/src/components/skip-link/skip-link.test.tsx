import { renderWithProviders } from '../../test-utils/renderer';
import { SkipLink } from './skip-link';

describe('SkipLink', () => {
    test('Matches Snapshot (Desktop)', () => {
        const { container } = renderWithProviders(<SkipLink href="test" />, 'desktop');

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches Snapshot (Mobile)', () => {
        const { container } = renderWithProviders(<SkipLink href="test" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });
});
