import React from 'react';
import renderer from 'react-test-renderer';
import { Circle } from './circle';

describe('Circle', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <Circle
                radius={73}
                stroke={8}
                percent={55}
                color="#ccc"
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
