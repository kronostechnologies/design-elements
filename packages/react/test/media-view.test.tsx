import React from 'react';
import renderer from 'react-test-renderer';
import { MediaView } from '../src/components/media-view';

describe('Media View', () => {
    test('Will render children', () => {
        const tree = renderer.create(
            <MediaView minWidth={700}>
                <p>Test Children</p>
            </MediaView>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Will return null', () => {
        const tree = renderer.create(
            <MediaView>
                <p>Test Children</p>
            </MediaView>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
