import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithTheme } from '../../test-utils/renderer';
import { CardLink } from './card-link';

describe('CardLink', () => {
    test('Matches Snapshot', () => {
        const tree = renderWithTheme(
            <Router>
                <CardLink label="Link Label" href="/" />
            </Router>,
        );

        expect(tree).toMatchSnapshot();
    });
});
