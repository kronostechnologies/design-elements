import React from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { TagSmall } from './tag-small';

describe('Tag Small', () => {
    test('matches snapshot (desktop)', () => {
        const tree = renderWithProviders(<TagSmall label="Test" />, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (mobile)', () => {
        const tree = renderWithProviders(<TagSmall label="Test" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });
});
