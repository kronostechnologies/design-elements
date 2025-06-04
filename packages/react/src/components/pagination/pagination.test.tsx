import { renderWithProviders } from '../../test-utils/renderer';
import { Pagination } from './pagination';

describe('Pagination', () => {
    test('Matches the mobile snapshot', () => {
        const { container } = renderWithProviders(
            <Pagination resultsPerPage={12} />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches the desktop snapshot', () => {
        const { container } = renderWithProviders(
            <Pagination resultsPerPage={12} />,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches the mobile snapshot with multiples digits page numbers', () => {
        const { container } = renderWithProviders(
            <Pagination resultsPerPage={1000} />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches the desktop snapshot with multiples digits page numbers', () => {
        const { container } = renderWithProviders(
            <Pagination resultsPerPage={1000} />,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
