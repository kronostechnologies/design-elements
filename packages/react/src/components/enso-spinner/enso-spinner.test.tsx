import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { EnsoSpinner } from './enso-spinner';

describe('Enso Spinner', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<EnsoSpinner />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
