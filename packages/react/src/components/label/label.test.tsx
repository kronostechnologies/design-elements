import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Label } from './label';

describe('Label', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Label forId="test-id">
                    Children
                </Label>,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
