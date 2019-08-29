import React from 'react';
import renderer from 'react-test-renderer';
import { VisuallyHidden } from '../src/components/a11y/visuallyhidden';

describe('Visually hidden', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <VisuallyHidden>
                Hidden
            </VisuallyHidden>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
