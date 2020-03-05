import { renderWithProviders } from '@design-elements/test-utils/renderer';
import React from 'react';
import { Headband } from './equisoft-default';

describe('Headband', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithProviders(
            <Headband>
                Hello, World!
            </Headband>,
        );

        expect(tree).toMatchSnapshot();
    });
});
