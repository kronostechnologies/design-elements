import { renderWithTheme } from '@design-elements/test-utils/renderer';
import React from 'react';
import { Bar } from './bar';

describe('Bar', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <Bar
                color="#ccc"
                endLabel="20k"
                percent={55}
            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
