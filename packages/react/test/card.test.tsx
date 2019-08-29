import React from 'react';
import renderer from 'react-test-renderer';
import { Card } from '../src/components/card';

describe('Card', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <Card>Hello World</Card>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
