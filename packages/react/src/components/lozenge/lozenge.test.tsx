import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Lozenge } from './lozenge';

describe('Lozenge', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<Lozenge>Hello World</Lozenge>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
