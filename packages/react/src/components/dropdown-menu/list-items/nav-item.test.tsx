import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test-utils/testing-library';
import { NavItem } from './nav-item';

describe('NavItem', () => {
    it('displays screen-reader-only text when router link opens in a new tab (target="_blank")', () => {
        renderWithProviders(<NavItem value="test" href="test" target="_blank" />);

        expect(screen.getByTestId('screen-reader-text')).toBeInTheDocument();
    });

    it('displays screen-reader-only text when html link opens in a new tab (target="_blank")', () => {
        renderWithProviders(<NavItem value="test" isHtmlLink href="test" target="_blank" />);

        expect(screen.getByTestId('screen-reader-text')).toBeInTheDocument();
    });
});
