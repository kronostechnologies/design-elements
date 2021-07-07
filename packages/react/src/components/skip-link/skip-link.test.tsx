import React from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { SkipLink } from './skip-link';

describe('SkipLink', () => {
    test('Matches Snapshot (Desktop)', () => {
        const tree = renderWithProviders(<SkipLink href="test" />, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (Mobile)', () => {
        const tree = renderWithProviders(<SkipLink href="test" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });
});
