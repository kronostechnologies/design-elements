import React from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { InlineMessage } from './inline-message';

describe('Inline Message', () => {
    test('Matches snapshot (desktop)', () => {
        const tree = renderWithProviders(
            <InlineMessage type="info">
                Test
            </InlineMessage>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <InlineMessage type="error">
                Test
            </InlineMessage>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
