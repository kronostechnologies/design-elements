import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Card } from './card';

describe('Card', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<Card>Hello World</Card>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
