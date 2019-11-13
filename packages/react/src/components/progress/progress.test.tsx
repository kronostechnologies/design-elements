import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { Progress } from './progress';

describe('Progress', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<Progress max={2} value={1} />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
