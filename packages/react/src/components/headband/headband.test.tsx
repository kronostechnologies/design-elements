import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Headband } from './equisoft-default';

describe('Headband', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Headband appName="Benchmark">
                    Hello, World!
                </Headband>,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
