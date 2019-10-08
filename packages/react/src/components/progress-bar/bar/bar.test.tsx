import React from 'react';
import renderer from 'react-test-renderer';
import { Bar } from './bar';

describe('Bar', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <Bar
                color="#ccc"
                endLabel="20k"
                percent={55}
                secondary={true}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
