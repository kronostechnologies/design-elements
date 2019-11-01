import React from 'react';
import renderer from 'react-test-renderer';
import { Icon } from './icon';

describe('Icon', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <Icon name="home" />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
