import React from 'react';
import renderer from 'react-test-renderer';
import { EnsoSpinner } from '../src/components/enso-spinner';

describe('Enso Spinner', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <EnsoSpinner />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
