import { renderWithProviders } from '@design-elements/test-utils/renderer';
import React from 'react';
import { Headband } from './equisoft-default';

describe('Headband', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithProviders(
            <Headband appName="Benchmark">
                Hello, World!
            </Headband>,
        );

        expect(tree).toMatchSnapshot();
    });
});
