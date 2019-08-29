import React from 'react';
import renderer from 'react-test-renderer';
import { Progress } from '../src/components/progress';

describe('Progress', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <Progress max={2} value={1} />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
