import React from 'react';
import { renderWithTheme } from '../../test-utils/renderer';
import { SkipLink } from './skip-link';

describe('SkipLink', () => {
    test('Matches Snapshot', () => {
        const tree = renderWithTheme(<SkipLink href="test">Test</SkipLink>);

        expect(tree).toMatchSnapshot();
    });
});
