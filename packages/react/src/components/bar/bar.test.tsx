import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Bar } from './bar';

describe('Bar', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
        ThemeWrapped(
            <Bar
                color="#ccc"
                endLabel="20k"
                percent={55}
            />,
        ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
