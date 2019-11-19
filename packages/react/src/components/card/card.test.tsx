import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { Card } from './card';

describe('Card', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<Card>Hello World</Card>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
