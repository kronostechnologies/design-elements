import React from 'react';
import renderer from 'react-test-renderer';
import { Label } from '../src/components/forms/label';

describe('Label', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <Label forId="test-id">
                Children
            </Label>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
